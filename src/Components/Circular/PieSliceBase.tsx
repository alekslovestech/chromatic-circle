import React from "react";
import { ChromaticIndex, chromaticToActual, ixOctaveOffset } from "../../types/IndexTypes";
import { CommonMath } from "../../utils/CommonMath";
import { PolarMath } from "../../utils/PolarMath";
import { getBlackWhiteString } from "../../utils/ColorUtils";
import { getNoteTextFromIndex } from "../../utils/NoteUtils";
import { useNotes } from "../NotesContext";
import { TWELVE } from "../../types/NoteConstants";
import { IndexUtils } from "../../utils/IndexUtils";

export interface PieSliceBaseProps {
  chromaticIndex: ChromaticIndex;
  outerRadius: number;
  innerRadius: number;
  isSelected?: boolean;
  onClick?: () => void;
  showText?: boolean;
}

const getArcPath = (
  startAngle: number,
  endAngle: number,
  outerRadius: number,
  innerRadius: number,
): string => {
  // Convert angles to cartesian coordinates
  const outerStart = PolarMath.getCartesianFromPolar(outerRadius, startAngle, true);
  const outerEnd = PolarMath.getCartesianFromPolar(outerRadius, endAngle, true);
  const innerStart = PolarMath.getCartesianFromPolar(innerRadius, startAngle, true);
  const innerEnd = PolarMath.getCartesianFromPolar(innerRadius, endAngle, true);

  // Create SVG path: move to outer start, arc to outer end, line to inner end, arc to inner start, close path
  return [
    `M ${outerStart.x} ${outerStart.y}`, // Move to start
    `A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}`, // Outer arc
    `L ${innerEnd.x} ${innerEnd.y}`, // Line to inner
    `A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}`, // Inner arc
    "Z", // Close path
  ].join(" ");
};

const PieSliceBase: React.FC<PieSliceBaseProps> = ({
  chromaticIndex,
  outerRadius,
  innerRadius,
  isSelected,
  onClick,
  showText,
}) => {
  const actualIndex = chromaticToActual(chromaticIndex, ixOctaveOffset(0));
  const { selectedAccidental } = useNotes();
  const { startAngle, endAngle } = CommonMath.NoteIndexToAngles(actualIndex);
  const path = getArcPath(startAngle, endAngle, outerRadius, innerRadius);
  const { middleAngle } = CommonMath.NoteIndexToAngles(actualIndex);
  const textPoint = PolarMath.getCartesianFromPolar((innerRadius + outerRadius) * 0.5, middleAngle);

  const blackWhiteString = getBlackWhiteString(actualIndex);
  const classNames = ["pie-slice-key", blackWhiteString];
  if (isSelected) classNames.push("selected");

  const id = IndexUtils.StringWithPaddedIndex("circularKey", chromaticIndex);

  return (
    <g id={id} className={classNames.join(" ")} onClick={onClick}>
      <path d={path} />
      {showText && (
        <text x={textPoint.x} y={textPoint.y} textAnchor="middle" dominantBaseline="middle">
          {getNoteTextFromIndex(actualIndex, selectedAccidental)}
        </text>
      )}
    </g>
  );
};

export default PieSliceBase;
