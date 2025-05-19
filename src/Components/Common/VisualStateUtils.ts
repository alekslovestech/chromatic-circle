import { ChromaticIndex } from "../../types/ChromaticIndex";

import { MusicalKey } from "../../types/Keys/MusicalKey";

export class VisualStateUtils {
  static getKeyVisualClasses(
    chromaticIndex: ChromaticIndex,
    isAdvanced: boolean,
    musicalKey: MusicalKey,
    monochromeMode: boolean,
    isBlack: boolean,
    isSelected: boolean,
    isSvg: boolean,
  ): string[] {
    // Base colors for black/white keys
    const getFillClass = (isSvg: boolean, baseClass: string): string => {
      return isSvg ? `fill-${baseClass}` : `bg-${baseClass}`;
    };

    const isDiatonic = musicalKey.greekModeInfo.isDiatonicNote(
      chromaticIndex,
      musicalKey.tonicIndex,
    );

    // State-based colors
    const stateColor = isAdvanced
      ? isDiatonic
        ? "highlighted"
        : "muted"
      : isBlack
      ? "black"
      : "white";

    const stateFill = getFillClass(isSvg, `darksky-${stateColor}`);
    const stateText = `text-darksky-text_on_${stateColor}`;

    // Selection state
    const selectedFill = isSelected ? getFillClass(isSvg, "selected") : "";
    const selectedText = isSelected ? "text-selected" : "";

    if (chromaticIndex === 1) {
      console.log({
        chromaticIndex,
        isAdvanced,
        isDiatonic,
        monochromeMode,
        isBlack,
        isSelected,
        isSvg,
      });
      console.log({
        stateFill,
        stateText,
        selectedFill,
        selectedText,
      });
    }
    const commonClasses = [stateFill, selectedFill, stateText, selectedText];
    const borderClasses = isSvg ? ["stroke-gray-400", "stroke-1"] : ["border", "border-gray-400"];
    return [...commonClasses, ...borderClasses];
  }
}
