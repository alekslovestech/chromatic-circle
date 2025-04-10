import React from "react";
import { useMusical } from "../../contexts/MusicalContext";
import { useDisplay } from "../../contexts/DisplayContext";
import { GlobalMode } from "../../types/SettingModes";
import { ArcPathVisualizer } from "../../utils/Circular/ArcPathVisualizer";
import { IndexUtils } from "../../utils/IndexUtils";
import { isSelectedEitherOctave } from "../../utils/KeyboardUtils";
import { getBlackWhiteString } from "../../utils/ColorUtils";
import { ChromaticIndex } from "../../types/ChromaticIndex";

export const PieSlice: React.FC<{
  chromaticIndex: ChromaticIndex;
  outerRadius: number;
  innerRadius: number;
  onClick: () => void;
}> = ({ chromaticIndex, outerRadius, innerRadius, onClick }) => {
  const { selectedMusicalKey, selectedNoteIndices } = useMusical();
  const { monochromeMode, keyTextMode, globalMode } = useDisplay();
  const pathElement = ArcPathVisualizer.getArcPathFromIndex(
    chromaticIndex,
    outerRadius,
    innerRadius,
  );
  const textPoint = ArcPathVisualizer.getTextPoint(chromaticIndex, outerRadius, innerRadius);
  const blackWhiteString = monochromeMode ? "white" : getBlackWhiteString(chromaticIndex);
  const classNames = ["pie-slice-key", blackWhiteString];

  const isSelected =
    globalMode !== GlobalMode.Logo && isSelectedEitherOctave(chromaticIndex, selectedNoteIndices);
  if (isSelected) classNames.push("selected");

  // Determine the visual state based on musical properties
  const getVisualState = (): string => {
    if (globalMode !== GlobalMode.Advanced) return "plain";
    return selectedMusicalKey.greekModeInfo.isDiatonicNote(
      chromaticIndex,
      selectedMusicalKey.tonicIndex,
    )
      ? "highlighted"
      : "muted";
  };

  const id = IndexUtils.StringWithPaddedIndex("circularKey", chromaticIndex);
  const showText = globalMode !== GlobalMode.Logo;

  return (
    <>
      <g id={id} className={classNames.join(" ")} data-state={getVisualState()} onClick={onClick}>
        {pathElement}
        {showText && (
          <text x={textPoint.x} y={textPoint.y}>
            {selectedMusicalKey.getDisplayString(chromaticIndex, keyTextMode)}
          </text>
        )}
      </g>
    </>
  );
};
