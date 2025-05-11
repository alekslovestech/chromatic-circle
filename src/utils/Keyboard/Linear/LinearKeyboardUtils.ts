import { ChromaticIndex } from "../../../types/ChromaticIndex";
import { ActualIndex, actualIndexToChromaticAndOctave } from "../../../types/IndexTypes";
import { WHITE_KEYS_PER_OCTAVE, WHITE_KEYS_PER_2OCTAVES } from "../../../types/NoteConstants";
import { isBlackKey } from "../KeyboardUtils";

//utils for calculating the linear keyboard geometry
export class LinearKeyboardUtils {
  static getKeyPosition(actualIndex: ActualIndex) {
    const { chromaticIndex, octaveOffset } = actualIndexToChromaticAndOctave(actualIndex);
    const basePosition = LinearKeyboardUtils.whiteKeyPositions[chromaticIndex];
    const octaveOffsetPosition = octaveOffset * 7; // 7 white keys per octave
    return `${((basePosition + octaveOffsetPosition) / 14) * 100}%`;
  }

  static calculateScaleBoundaryPercentages(tonicIndex: ChromaticIndex): { x1: number; x2: number } {
    const position = this.whiteKeyPositions[tonicIndex];
    const x1 = (position / WHITE_KEYS_PER_2OCTAVES) * 100;
    const x2 = ((position + WHITE_KEYS_PER_OCTAVE) / WHITE_KEYS_PER_2OCTAVES) * 100;
    //black keys are 70% of the width of a white key
    const shortKeyWidthPercent = 70 / WHITE_KEYS_PER_2OCTAVES / 2;
    const offset = isBlackKey(tonicIndex) ? -shortKeyWidthPercent : 0;
    return { x1: x1 + offset, x2: x2 + offset };
  }

  static calculateScaleBoundaryPositions(
    tonicIndex: ChromaticIndex,
    containerWidth: number,
  ): { x1: number; x2: number } {
    const position = this.whiteKeyPositions[tonicIndex];
    const whiteKeyWidth = containerWidth / WHITE_KEYS_PER_2OCTAVES;
    const x1 = position * whiteKeyWidth;
    const x2 = (position + WHITE_KEYS_PER_OCTAVE) * whiteKeyWidth;
    //black keys are 70% of the width of a white key
    const shortKeyWidth = (whiteKeyWidth * 0.7) / 2;
    const offset = isBlackKey(tonicIndex) ? -shortKeyWidth : 0;
    return { x1: x1 + offset, x2: x2 + offset };
  }

  static readonly whiteKeyPositions: number[] = [0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6];
}
