import { ChromaticIndex } from "../types/IndexTypes";
import { TWELVE } from "../types/NoteConstants";
import { INIT_ANGLE, TWO_PI } from "./CommonMath";

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

  static CartesianToCircular(pureX: number, pureY: number) {
    const angle = Math.atan2(pureY, pureX);
    const radius = Math.sqrt(pureX * pureX + pureY * pureY);
    return [radius, angle];
  }
}
