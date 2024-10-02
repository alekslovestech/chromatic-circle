import { ActualIndex, ChromaticIndex } from "../types/IndexTypes";
import { TWELVE } from "../types/NoteConstants";
import { CommonMath, INIT_ANGLE, INNER_RADIUS, OUTER_RADIUS, TWO_PI } from "./CommonMath";

interface RectCoordinates {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export class Constants {
  static CANVAS_RADIUS = 200;
  static centerX = Constants.CANVAS_RADIUS;
  static centerY = Constants.CANVAS_RADIUS;
}

// utilities related to the coordinate system transformations between
// canvas space (0 in top-left corner) <=>
//    ==> cartesian coors (0 in center of circle)
//        ==> circle coors (r,θ)
//              ==> index / notes
//        <== key coors(r, θ_left / θ_right)
// coor system is y-down and θ-clockwise
export class CircleMath {
  static ToDegrees(radians: number) {
    return Math.round((radians * 180) / Math.PI);
  }

  // pure circular coors 0 degrees at x-horizontal, θ-clockwise
  static AngleToNoteIndex(angle: number): ChromaticIndex {
    const index = Math.floor(((angle - INIT_ANGLE + TWO_PI) * TWELVE) / TWO_PI) % TWELVE;
    return index as ChromaticIndex;
  }

  static IsRadiusInRange(radius: number) {
    return radius >= INNER_RADIUS && radius <= OUTER_RADIUS;
  }

  static CartesianToCircular(pureX: number, pureY: number) {
    const angle = Math.atan2(pureY, pureX);
    const radius = Math.sqrt(pureX * pureX + pureY * pureY);
    return [radius, angle];
  }

  static ViewportToCartesian(clientX: number, clientY: number, rect: RectCoordinates) {
    const x = clientX - rect.left - Constants.centerX;
    const y = clientY - rect.top - Constants.centerY;
    return [x, y];
  }

  static getPolyCoors(index: number) {
    const { middleAngle } = CommonMath.NoteIndexToAngles(index);

    const x = Constants.centerX + INNER_RADIUS * Math.cos(middleAngle);
    const y = Constants.centerY + INNER_RADIUS * Math.sin(middleAngle);

    return { x, y };
  }

  static noteDistance = (note1: ActualIndex, note2: ActualIndex) => {
    return (note2 - note1 + TWELVE) % TWELVE;
  };
}
