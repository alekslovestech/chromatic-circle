import { ChromaticIndex } from "../types/ChromaticIndex";
import { GlobalMode } from "../types/SettingModes";

import { useMusical } from "../contexts/MusicalContext";
import { useDisplay } from "../contexts/DisplayContext";

import { isBlackKey } from "./KeyboardUtils";

export class VisualStateUtils {
  static getVisualState(chromaticIndex: ChromaticIndex): string {
    const { selectedMusicalKey } = useMusical();
    const { globalMode, monochromeMode } = useDisplay();

    const isAdvanced = globalMode === GlobalMode.Advanced;
    if (isAdvanced) {
      const isDiatonic = selectedMusicalKey.greekModeInfo.isDiatonicNote(
        chromaticIndex,
        selectedMusicalKey.tonicIndex,
      );
      return isDiatonic ? "highlighted" : "muted";
    }

    return monochromeMode ? "white" : isBlackKey(chromaticIndex) ? "black" : "white";
  }
}
