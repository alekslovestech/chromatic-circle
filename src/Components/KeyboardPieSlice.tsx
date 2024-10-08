import React, { useEffect } from "react";
import "../styles/KeyboardPieSlice.css";
import { TWELVE } from "../types/NoteConstants";
import { ActualIndex } from "../types/IndexTypes";
import { getNoteTextFromIndex } from "../utils/NoteUtils";
import { getBlackWhiteString } from "../utils/ColorUtils";
import { useKeyboardHandlers } from "./useKeyboardHandlers";
import { useNotes } from "./NotesContext";
import AccidentalToggle from "./AccidentalToggle";
import CircularVisModeSelect from "./CircularVizModeSelect";
import { PolarMath } from "../utils/PolarMath";
import { CommonMath, INNER_RADIUS, MIDDLE_RADIUS, OUTER_RADIUS } from "../utils/CommonMath";
import { drawCircularVisualizationsSVG } from "./CircularVisualizationsSVG";

interface PieSliceProps {
  index: number;
  onClick: () => void;
}

const PieSliceKey: React.FC<PieSliceProps> = ({ index, onClick }) => {
  const { selectedNoteIndices, selectedAccidental } = useNotes();
  const { startAngle, middleAngle, endAngle } = CommonMath.NoteIndexToAngles(index);

  //get the inner and outer radius from the width of the container (extract from the CSS)
  const outerStart = PolarMath.getCartesianFromPolar(OUTER_RADIUS, startAngle);
  const outerEnd = PolarMath.getCartesianFromPolar(OUTER_RADIUS, endAngle);
  const innerStart = PolarMath.getCartesianFromPolar(INNER_RADIUS, startAngle);
  const innerEnd = PolarMath.getCartesianFromPolar(INNER_RADIUS, endAngle);

  const blackWhiteClass = getBlackWhiteString(index as ActualIndex);
  const isSelected = selectedNoteIndices.includes(index as ActualIndex);
  const selectedClass = isSelected ? "selected" : "";
  const textPosition = PolarMath.getCartesianFromPolar(MIDDLE_RADIUS, middleAngle);

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
        {getNoteTextFromIndex(index as ActualIndex, selectedAccidental)}
      </text>
    </g>
  );
};

const KeyboardPieSlice: React.FC = () => {
  const { handleKeyClick } = useKeyboardHandlers();
  const { selectedNoteIndices, circularVisMode } = useNotes();
  const handleClick = (index: number) => {
    handleKeyClick(index as ActualIndex);
  };

  useEffect(() => {
    drawCircularVisualizationsSVG(selectedNoteIndices, circularVisMode);
  }, [selectedNoteIndices, handleKeyClick, circularVisMode]);

  return (
    <div className="keyboardpieslice-container">
      <div className="keyboardpieslice-overlay">
        <div className="top-left">
          <AccidentalToggle />
        </div>
        {selectedNoteIndices.length > 1 && (
          <div className="top-right">
            <CircularVisModeSelect />
          </div>
        )}
      </div>
      <svg width="300" height="300" viewBox="-150 -150 300 300" className="pie-slice-keyboard">
        {Array.from({ length: TWELVE }).map((_, index) => (
          <PieSliceKey key={index} index={index} onClick={() => handleClick(index)} />
        ))}
      </svg>
    </div>
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
