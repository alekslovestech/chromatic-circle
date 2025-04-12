import { ChromaticIndex } from "../../types/ChromaticIndex";
import { useMusical } from "../../contexts/MusicalContext";
import { isBlackKey } from "../../utils/KeyboardUtils";
import { useDisplay } from "../../contexts/DisplayContext";
import { GlobalMode } from "../../types/SettingModes";

export class VisualStateUtils {
  // Determine the visual state based on musical properties
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
