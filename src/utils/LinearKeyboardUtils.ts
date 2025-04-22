import { ChromaticIndex } from "../types/ChromaticIndex";
import { ActualIndex, actualIndexToChromaticAndOctave } from "../types/IndexTypes";
import { WHITE_KEYS_PER_OCTAVE, WHITE_KEYS_PER_2OCTAVES } from "../types/NoteConstants";

//utils for calculating the linear keyboard geometry
export class LinearKeyboardUtils {
  static calculateKeyLeftPosition(actualIndex: ActualIndex, containerWidth: number): number {
    const { chromaticIndex, octaveOffset } = actualIndexToChromaticAndOctave(actualIndex);
    const longKeyWidth = containerWidth / WHITE_KEYS_PER_2OCTAVES;
    const position = this.whiteKeyPositions[chromaticIndex] + octaveOffset * WHITE_KEYS_PER_OCTAVE;
    return position * longKeyWidth;
  }

  static calculateScaleBoundaryPositions(tonicIndex: ChromaticIndex): { x1: number; x2: number } {
    const position = this.whiteKeyPositions[tonicIndex];
    const x1 = (position / WHITE_KEYS_PER_2OCTAVES) * 100;
    const x2 = ((position + WHITE_KEYS_PER_OCTAVE) / WHITE_KEYS_PER_2OCTAVES) * 100;
    return { x1, x2 };
  }

  private static readonly whiteKeyPositions: number[] = [0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6];
}
