import { ActualIndex, ChromaticIndex } from "../types/IndexTypes";
import { TWELVE } from "../types/NoteConstants";

export const TWO_PI = 2 * Math.PI;
export const INIT_ANGLE = -Math.PI / 2; //vertical up

export const INNER_RADIUS = 60;
export const OUTER_RADIUS = 120;
export const MIDDLE_RADIUS = (INNER_RADIUS + OUTER_RADIUS) / 2;
const FULL_KEY_ANGLE = TWO_PI / TWELVE;
const HALF_KEY_ANGLE = FULL_KEY_ANGLE / 2;

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

export class PolarMath {
  static getCartesianFromPolar(radius: number, angle: number) {
    return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
  }
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

  static NoteIndexToAngles(index: number) {
    const startAngle = INIT_ANGLE + index * FULL_KEY_ANGLE;
    const middleAngle = startAngle + HALF_KEY_ANGLE;
    const endAngle = startAngle + FULL_KEY_ANGLE;
    return { startAngle, middleAngle, endAngle };
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
    const { middleAngle } = CircleMath.NoteIndexToAngles(index);

    const x = Constants.centerX + INNER_RADIUS * Math.cos(middleAngle);
    const y = Constants.centerY + INNER_RADIUS * Math.sin(middleAngle);

    return { x, y };
  }

  static noteDistance = (note1: ActualIndex, note2: ActualIndex) => {
    return (note2 - note1 + TWELVE) % TWELVE;
  };
}
