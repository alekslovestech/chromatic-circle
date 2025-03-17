import React from "react";
import { PolarMath } from "../../utils/Circular/PolarMath";
import { getBlackWhiteString } from "../../utils/ColorUtils";
import { formatNoteNameForDisplay } from "../../utils/NoteUtils";
import { useNotes } from "../NotesContext";
import { IndexUtils } from "../../utils/IndexUtils";
import { ChromaticIndex } from "../../types/ChromaticIndex";
import { isSelectedEitherOctave } from "../../utils/KeyboardUtils";
import { RomanResolver } from "../../types/RomanResolver";
import { RomanNumeralUtils } from "../../utils/RomanNumeralUtils";
import { NoteDisplayMode } from "../../types/SettingModes";
import { MusicalKey } from "../../types/MusicalKey";

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

const PieSlice: React.FC<{
  chromaticIndex: ChromaticIndex;
  outerRadius: number;
  innerRadius: number;
  onClick: () => void;
  isLogo: boolean;
}> = ({ chromaticIndex, outerRadius, innerRadius, onClick, isLogo }) => {
  const { selectedMusicalKey, selectedNoteIndices, monochromeMode, noteDisplayMode } = useNotes();
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

  if (isSelected) classNames.push("selected");

  const id = IndexUtils.StringWithPaddedIndex("circularKey", chromaticIndex);
  const showText = !isLogo;

  const getDisplayString = (
    chromaticIndex: ChromaticIndex,
    musicalKey: MusicalKey,
    displayMode: NoteDisplayMode,
  ) => {
    const scaleDegree = RomanResolver.getScaleDegreeFromIndexAndKey(chromaticIndex, musicalKey);
    switch (displayMode) {
      case NoteDisplayMode.Letters:
        return formatNoteNameForDisplay(chromaticIndex, selectedMusicalKey.getDefaultAccidental());
      case NoteDisplayMode.Arabic:
        return scaleDegree > 0 ? scaleDegree.toString() : "";
      case NoteDisplayMode.Roman:
        return scaleDegree > 0 ? RomanNumeralUtils.toRoman(scaleDegree).toLowerCase() : "";
    }
  };

  return (
    <>
      <g id={id} className={classNames.join(" ")} onClick={onClick}>
        {pathElement}
        {showText && (
          <text x={textPoint.x} y={textPoint.y}>
            {getDisplayString(chromaticIndex, selectedMusicalKey, noteDisplayMode)}
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
            {getDisplayString(chromaticIndex, selectedMusicalKey, NoteDisplayMode.Roman)}
          </tspan>
        </text>
      )}
    </>
  );
};

export default PieSlice;
