"use client";

import React from "react";
import { ChromaticIndex } from "../../../types/ChromaticIndex";
import { ActualIndex, chromaticToActual, ixOctaveOffset } from "../../../types/IndexTypes";
import { ArcPathVisualizer } from "../../../utils/Keyboard/Circular/ArcPathVisualizer";
import { IndexUtils } from "../../../utils/IndexUtils";
import { VisualStateUtils } from "../../Common/VisualStateUtils";
import { isBlackKey } from "../../../utils/Keyboard/KeyboardUtils";

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

  const baseClasses = ["key-base", "pie-slice-key"];
  const isSelected = isSelectedEitherOctave(chromaticIndex, selectedNoteIndices);
  const isAdvanced = globalMode === GlobalMode.Advanced;
  const isBlack = isBlackKey(chromaticToActual(chromaticIndex, ixOctaveOffset(0)));

  // Add color classes based on visual state and selection
  const visualClasses = VisualStateUtils.getKeyVisualClasses(
    chromaticIndex,
    isAdvanced,
    selectedMusicalKey,
    monochromeMode,
    isBlack,
    isSelected,
    true,
  );

  if (isAdvanced) baseClasses.push("disabled");

  const id = IndexUtils.StringWithPaddedIndex("circularKey", chromaticIndex);
  const showText = globalMode !== GlobalMode.Logo;
  const noteText = selectedMusicalKey.getDisplayString(chromaticIndex, keyTextMode);

  return (
    <g
      id={id}
      className={[...baseClasses, ...visualClasses].join(" ")}
      onClick={() => {
        onClick(chromaticToActual(chromaticIndex, ixOctaveOffset(0)));
      }}
    >
      <path d={pathData} className={visualClasses.join(" ")} />
      {showText && (
        <text
          x={textPoint.x}
          y={textPoint.y}
          className={[...visualClasses, "text-center", "pointer-events-none"].join(" ")}
        >
          {noteText}
        </text>
      )}
    </g>
  );
};
