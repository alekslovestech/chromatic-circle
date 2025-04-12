import React from "react";
import { GlobalMode } from "../../types/SettingModes";
import { ChromaticIndex } from "../../types/ChromaticIndex";

import { ArcPathVisualizer } from "../../utils/Circular/ArcPathVisualizer";
import { IndexUtils } from "../../utils/IndexUtils";
import { isSelectedEitherOctave } from "../../utils/KeyboardUtils";
import { VisualStateUtils } from "../../tests/utils/VisualStateUtils";

import { useMusical } from "../../contexts/MusicalContext";
import { useDisplay } from "../../contexts/DisplayContext";

import "../../styles/KeyboardBase.css";
import "../../styles/KeyboardCircular.css";

export const PianoKeyCircular: React.FC<{
  chromaticIndex: ChromaticIndex;
  outerRadius: number;
  innerRadius: number;
  onClick: () => void;
}> = ({ chromaticIndex, outerRadius, innerRadius, onClick }) => {
  const { selectedMusicalKey, selectedNoteIndices } = useMusical();
  const { keyTextMode, globalMode } = useDisplay();
  const pathElement = ArcPathVisualizer.getArcPathFromIndex(
    chromaticIndex,
    outerRadius,
    innerRadius,
  );
  const textPoint = ArcPathVisualizer.getTextPoint(chromaticIndex, outerRadius, innerRadius);

  const classNames = ["key-base", "pie-slice-key"]; //, blackWhiteString];

  const isSelected =
    globalMode !== GlobalMode.Logo && isSelectedEitherOctave(chromaticIndex, selectedNoteIndices);

  const visualState = VisualStateUtils.getVisualState(chromaticIndex);
  classNames.push(visualState);
  if (isSelected) classNames.push("selected");

  console.log(`PianoKeyCircular: ${chromaticIndex} visualState: ${visualState}`);
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
