import { ChromaticIndex } from "../../types/ChromaticIndex";
import { useMusical } from "../../contexts/MusicalContext";
import { isBlackKey } from "../../utils/KeyboardUtils";
import { useDisplay } from "../../contexts/DisplayContext";
import { GlobalMode } from "../../types/SettingModes";

export class VisualStateUtils {
  // Determine the visual state based on musical properties
  static getVisualState(chromaticIndex: ChromaticIndex): string {
    const { selectedMusicalKey, selectedNoteIndices } = useMusical();
    const { monochromeMode, keyTextMode, globalMode } = useDisplay();

    const isAdvanced = globalMode === GlobalMode.Advanced;
    let keyAppearanceString = "";
    if (isAdvanced) {
      const isDiatonic = selectedMusicalKey.greekModeInfo.isDiatonicNote(
        chromaticIndex,
        selectedMusicalKey.tonicIndex,
      );

      keyAppearanceString = isDiatonic ? "highlighted" : "muted";
    } else {
      const isBlack = isBlackKey(chromaticIndex);
      keyAppearanceString = isBlack ? "black" : "white";
    }

    return keyAppearanceString;
  }
}
