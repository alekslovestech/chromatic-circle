import { ChromaticIndex } from "../../types/ChromaticIndex";
import { MusicalKey } from "../../types/Keys/MusicalKey";

export class VisualStateUtils {
  // Determine the visual state based on musical properties
  static getVisualState = (
    selectedMusicalKey: MusicalKey,
    chromaticIndex: ChromaticIndex,
  ): string => {
    return selectedMusicalKey.greekModeInfo.isDiatonicNote(
      chromaticIndex,
      selectedMusicalKey.tonicIndex,
    )
      ? "highlighted"
      : "muted";
  };
}
