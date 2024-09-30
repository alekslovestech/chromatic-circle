import React from "react";
import "../styles/KeyboardPieSlice.css";
import { TWELVE } from "../types/NoteConstants";
import { ActualIndex } from "../types/IndexTypes";
import { Constants, INIT_ANGLE, INNER_RADIUS, OUTER_RADIUS, PolarMath } from "../utils/CircleMath";
import { getNoteTextFromIndex } from "../utils/NoteUtils";
import { AccidentalType } from "../types/AccidentalType";
import { getBlackWhiteString } from "../utils/ColorUtils";
import { useKeyboardHandlers } from "./useKeyboardHandlers";
import { useNotes } from "./NotesContext";

interface PieSliceProps {
  index: number;
  onClick: () => void;
}

const PieSliceKey: React.FC<PieSliceProps> = ({ index, onClick }) => {
  const { selectedNoteIndices } = useNotes();
  const sliceAngle = Constants.FULL_KEY_ANGLE;
  const startAngle = INIT_ANGLE + index * sliceAngle;
  const endAngle = startAngle + sliceAngle;

  const outerStart = PolarMath.getCartesianFromPolar(OUTER_RADIUS, startAngle);
  const outerEnd = PolarMath.getCartesianFromPolar(OUTER_RADIUS, endAngle);
  const innerStart = PolarMath.getCartesianFromPolar(INNER_RADIUS, startAngle);
  const innerEnd = PolarMath.getCartesianFromPolar(INNER_RADIUS, endAngle);

  const blackWhiteClass = getBlackWhiteString(index as ActualIndex);
  const isSelected = selectedNoteIndices.includes(index as ActualIndex);
  const selectedClass = isSelected ? "selected" : "";
  const middleAngle = (startAngle + endAngle) / 2;
  const textRadius = (INNER_RADIUS + OUTER_RADIUS) / 2;
  const textPosition = PolarMath.getCartesianFromPolar(textRadius, middleAngle);

  const pathData = [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 0 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${INNER_RADIUS} ${INNER_RADIUS} 0 0 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");

  return (
    <g className={`pie-slice-key ${blackWhiteClass} ${selectedClass}`}>
      <path d={pathData} onClick={onClick} />
      <text x={textPosition.x} y={textPosition.y} textAnchor="middle" dominantBaseline="middle">
        {getNoteTextFromIndex(index as ActualIndex, AccidentalType.Sharp)}
      </text>
    </g>
  );
};

const KeyboardPieSlice: React.FC = () => {
  const { handleKeyClick } = useKeyboardHandlers();
  const handleClick = (index: number) => {
    handleKeyClick(index as ActualIndex);
  };

  return (
    <svg width="300" height="300" viewBox="-150 -150 300 300" className="pie-slice-keyboard">
      {Array.from({ length: TWELVE }).map((_, index) => (
        <PieSliceKey key-index={index} index={index} onClick={() => handleClick(index)} />
      ))}
    </svg>
  );
};

/* working SVG Pie Slice 
<svg width="300" height="300" viewBox="-150 -150 300 300" xmlns="http://www.w3.org/2000/svg">
  <!-- Circle centered at (0, 0) with radius 10 -->
  <circle cx="0" cy="0" r="5" stroke="black" fill="none" stroke-width="2"/>
  <defs>
    <path id="pie-slice" d="
      M 100 0 
      A 100 100 0 0 1 86.60254 50 
      L 43.30127 25 
      A 50 50 0 0 0 50 0 
      Z
    " />
  </defs>
  <use href="#pie-slice" stroke="black" fill="lightblue" stroke-width="2" />
  <use href="#pie-slice" stroke="black" fill="lightgreen" stroke-width="2" transform="rotate(30)" />
  Sorry, your browser does not support inline SVG.
</svg>
*/

export default KeyboardPieSlice;
