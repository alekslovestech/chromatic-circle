import React from "react";
import { ChromaticIndex } from "../../types/ChromaticIndex";

import { KeyTextMode } from "../../types/SettingModes";

import { PolarMath } from "../../utils/Circular/PolarMath";
import { getBlackWhiteString } from "../../utils/ColorUtils";
import { IndexUtils } from "../../utils/IndexUtils";
import { isSelectedEitherOctave } from "../../utils/KeyboardUtils";
import { useDisplay } from "../../contexts/DisplayContext";
import { useMusical } from "../../contexts/MusicalContext";
import { getDisplayString } from "../../utils/NoteNameUtils";

const ROMAN_MODE = false; //TODO: make this a prop
const ROMAN_POINT_COEFFICIENT = 0.85;
const getArcPathFromIndex = (
  chromaticIndex: ChromaticIndex,
  outerRadius: number,
  innerRadius: number,
): JSX.Element => {
  const { startAngle, endAngle } = PolarMath.NoteIndexToAngleRange(chromaticIndex);
  // Convert angles to cartesian coordinates
  const outerStart = PolarMath.getCartesianFromPolar(outerRadius, startAngle, true);
  const outerEnd = PolarMath.getCartesianFromPolar(outerRadius, endAngle, true);
  const innerStart = PolarMath.getCartesianFromPolar(innerRadius, startAngle, true);
  const innerEnd = PolarMath.getCartesianFromPolar(innerRadius, endAngle, true);

  // Create SVG path: move to outer start, arc to outer end, line to inner end, arc to inner start, close path
  const arcPath = [
    `M ${outerStart.x} ${outerStart.y}`, // Move to start
    `A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}`, // Outer arc
    `L ${innerEnd.x} ${innerEnd.y}`, // Line to inner
    `A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}`, // Inner arc
    "Z", // Close path
  ].join(" ");
  return <path d={arcPath} />;
};

export const PieSlice: React.FC<{
  chromaticIndex: ChromaticIndex;
  outerRadius: number;
  innerRadius: number;
  onClick: () => void;
  isLogo: boolean;
}> = ({ chromaticIndex, outerRadius, innerRadius, onClick, isLogo }) => {
  const { selectedMusicalKey, selectedNoteIndices } = useMusical();
  const { monochromeMode, keyTextMode } = useDisplay();
  const pathElement = getArcPathFromIndex(chromaticIndex, outerRadius, innerRadius);
  const middleAngle = PolarMath.NoteIndexToMiddleAngle(chromaticIndex);
  const textPoint = PolarMath.getCartesianFromPolar((innerRadius + outerRadius) * 0.5, middleAngle);
  const romanPoint = PolarMath.getCartesianFromPolar(
    innerRadius * ROMAN_POINT_COEFFICIENT,
    middleAngle,
  );
  const blackWhiteString = monochromeMode ? "white" : getBlackWhiteString(chromaticIndex);
  const classNames = ["pie-slice-key", blackWhiteString];
  const isSelected = isLogo ? false : isSelectedEitherOctave(chromaticIndex, selectedNoteIndices);
  const isDiatonic = isLogo ? false : selectedMusicalKey.isDiatonicNote(chromaticIndex);
  if (isSelected) classNames.push("selected");
  if (isDiatonic) classNames.push("diatonic");

  const id = IndexUtils.StringWithPaddedIndex("circularKey", chromaticIndex);
  const showText = !isLogo;

  return (
    <>
      <g id={id} className={classNames.join(" ")} onClick={onClick}>
        {pathElement}
        {showText && (
          <text x={textPoint.x} y={textPoint.y}>
            {getDisplayString(chromaticIndex, selectedMusicalKey, keyTextMode)}
          </text>
        )}
      </g>
      {ROMAN_MODE && (
        <text
          x={romanPoint.x}
          y={romanPoint.y}
          textAnchor="middle"
          dominantBaseline="middle"
          stroke="black"
          strokeWidth="1"
          fontSize="4px"
        >
          <tspan fontSize="8px">
            {getDisplayString(chromaticIndex, selectedMusicalKey, KeyTextMode.Roman)}
          </tspan>
        </text>
      )}
    </>
  );
};
