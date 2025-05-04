import { ChromaticIndex } from "../types/ChromaticIndex";

import { isBlackKey } from "./Keyboard/KeyboardUtils";
import { MusicalKey } from "../types/Keys/MusicalKey";

export class VisualStateUtils {
  static getVisualState(
    chromaticIndex: ChromaticIndex,
    isAdvanced: boolean,
    musicalKey: MusicalKey,
    monochromeMode: boolean,
  ): string {
    if (isAdvanced) {
      const isDiatonic = musicalKey.greekModeInfo.isDiatonicNote(
        chromaticIndex,
        musicalKey.tonicIndex,
      );
      return isDiatonic ? "highlighted" : "muted";
    }

    return monochromeMode ? "white" : isBlackKey(chromaticIndex) ? "black" : "white";
  }
}
