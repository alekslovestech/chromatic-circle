import React from "react";
import { GlobalMode } from "../../types/SettingModes";
import { ChromaticIndex } from "../../types/ChromaticIndex";

import { ArcPathVisualizer } from "../../utils/Circular/ArcPathVisualizer";
import { IndexUtils } from "../../utils/IndexUtils";
import { isSelectedEitherOctave } from "../../utils/KeyboardUtils";
import { VisualStateUtils } from "../../utils/VisualStateUtils";

import { useMusical } from "../../contexts/MusicalContext";
import { useDisplay } from "../../contexts/DisplayContext";

import "../../styles/KeyboardBase.css";
import "../../styles/KeyboardCircular.css";

interface CircularKeyProps {
  chromaticIndex: ChromaticIndex;
  outerRadius: number;
  innerRadius: number;
  onClick: () => void;
}

export const PianoKeyCircular: React.FC<CircularKeyProps> = ({
  chromaticIndex,
  outerRadius,
  innerRadius,
  onClick,
}) => {
  const { selectedMusicalKey, selectedNoteIndices } = useMusical();
  const { keyTextMode, globalMode, monochromeMode } = useDisplay();
  const pathElement = ArcPathVisualizer.getArcPathFromIndex(
    chromaticIndex,
    outerRadius,
    innerRadius,
  );
  const textPoint = ArcPathVisualizer.getTextPoint(chromaticIndex, outerRadius, innerRadius);

  const classNames = ["key-base", "pie-slice-key"];
  const isSelected = isSelectedEitherOctave(chromaticIndex, selectedNoteIndices);

  const isAdvanced = globalMode === GlobalMode.Advanced;
  const visualState = VisualStateUtils.getVisualState(
    chromaticIndex,
    isAdvanced,
    selectedMusicalKey,
    monochromeMode,
  );
  classNames.push(visualState);

  if (isSelected) classNames.push("selected");

  const id = IndexUtils.StringWithPaddedIndex("circularKey", chromaticIndex);
  const showText = globalMode !== GlobalMode.Logo;
  const noteText = selectedMusicalKey.getDisplayString(chromaticIndex, keyTextMode);

  return (
    <g id={id} className={classNames.join(" ")} onClick={onClick}>
      {pathElement}
      {showText && (
        <text x={textPoint.x} y={textPoint.y}>
          {noteText}
        </text>
      )}
    </g>
  );
};
