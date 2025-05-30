"use client";

import React from "react";
import { ChromaticIndex } from "../../../types/ChromaticIndex";
import { ActualIndex, chromaticToActual, ixOctaveOffset } from "../../../types/IndexTypes";
import { ArcPathVisualizer } from "../../../utils/Keyboard/Circular/ArcPathVisualizer";
import { IndexUtils } from "../../../utils/IndexUtils";
import { VisualStateUtils } from "../../../utils/VisualStateUtils";

import { useGlobal, GlobalMode } from "../../../contexts/GlobalContext";
import { useMusical } from "../../../contexts/MusicalContext";

import { useDisplay } from "../../../contexts/DisplayContext";

import "../../../styles/KeyboardBase.css";
import "../../../styles/KeyboardCircular.css";

interface CircularKeyProps {
  chromaticIndex: ChromaticIndex;
  outerRadius: number;
  innerRadius: number;
  onClick: (index: ActualIndex) => void;
}

export const PianoKeyCircular: React.FC<CircularKeyProps> = ({
  chromaticIndex,
  outerRadius,
  innerRadius,
  onClick,
}) => {
  const isSelectedEitherOctave = (
    chromaticIndex: ChromaticIndex,
    selectedNoteIndices: ActualIndex[],
  ): boolean => {
    const actualIndex0 = chromaticToActual(chromaticIndex, ixOctaveOffset(0));
    const actualIndex1 = chromaticToActual(chromaticIndex, ixOctaveOffset(1));
    return selectedNoteIndices.includes(actualIndex0) || selectedNoteIndices.includes(actualIndex1);
  };

  const { globalMode } = useGlobal();
  const { selectedMusicalKey, selectedNoteIndices } = useMusical();
  const { keyTextMode, monochromeMode } = useDisplay();
  const pathData = ArcPathVisualizer.getArcPathData(chromaticIndex, outerRadius, innerRadius);
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
  if (isAdvanced) classNames.push("disabled");

  const id = IndexUtils.StringWithPaddedIndex("circularKey", chromaticIndex);
  const showText = globalMode !== GlobalMode.Logo;
  const noteText = selectedMusicalKey.getDisplayString(chromaticIndex, keyTextMode);

  return (
    <g
      id={id}
      className={classNames.join(" ")}
      onClick={() => {
        console.log("Direct click on SVG element");
        onClick(chromaticToActual(chromaticIndex, ixOctaveOffset(0)));
      }}
    >
      <path d={pathData} />
      {showText && (
        <text x={textPoint.x} y={textPoint.y}>
          {noteText}
        </text>
      )}
    </g>
  );
};
