import { ChromaticIndex } from "../../../types/ChromaticIndex";
import { ActualIndex } from "../../../types/IndexTypes";
import { TWELVE } from "../../../types/NoteConstants";

const TWO_PI = 2 * Math.PI;
const INIT_ANGLE = -Math.PI / 2; //vertical up

const FULL_KEY_ANGLE = TWO_PI / TWELVE;
const HALF_KEY_ANGLE = FULL_KEY_ANGLE / 2;
export interface CartesianPoint {
  x: number;
  y: number;
}

export class PolarMath {
  static getCartesianFromPolar(
    radius: number,
    angle: number,
    isRounded: boolean = false,
  ): CartesianPoint {
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    if (!isRounded) return { x, y };
    return { x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 };
  }

  static NoteIndexToMiddleAngle(index: ChromaticIndex | ActualIndex): number {
    return INIT_ANGLE + index * FULL_KEY_ANGLE + HALF_KEY_ANGLE;
  }

  static NoteIndexToAngleRange(index: ChromaticIndex | ActualIndex) {
    const startAngle = INIT_ANGLE + index * FULL_KEY_ANGLE;
    const endAngle = startAngle + FULL_KEY_ANGLE;
    return { startAngle, endAngle };
  }
}
