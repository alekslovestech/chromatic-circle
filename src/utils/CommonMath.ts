import { ActualIndex } from "../types/IndexTypes";
import { TWELVE } from "../types/NoteConstants";

export const TWO_PI = 2 * Math.PI;
export const INIT_ANGLE = -Math.PI / 2; //vertical up

const FULL_KEY_ANGLE = TWO_PI / TWELVE;
const HALF_KEY_ANGLE = FULL_KEY_ANGLE / 2;

export class CommonMath {
  static NoteIndexToAngles(index: number) {
    const startAngle = INIT_ANGLE + index * FULL_KEY_ANGLE;
    const middleAngle = startAngle + HALF_KEY_ANGLE;
    const endAngle = startAngle + FULL_KEY_ANGLE;
    return { startAngle, middleAngle, endAngle };
  }

  static noteDistance = (note1: ActualIndex, note2: ActualIndex) => {
    return (note2 - note1 + TWELVE) % TWELVE;
  };
}
