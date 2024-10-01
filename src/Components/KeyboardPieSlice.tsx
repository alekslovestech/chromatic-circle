import React, { useEffect } from "react";
import "../styles/KeyboardPieSlice.css";
import { TWELVE } from "../types/NoteConstants";
import { ActualIndex } from "../types/IndexTypes";
import { Constants, INIT_ANGLE, INNER_RADIUS, OUTER_RADIUS, PolarMath } from "../utils/CircleMath";
import { getNoteTextFromIndex } from "../utils/NoteUtils";
import { getBlackWhiteString, getComputedColor } from "../utils/ColorUtils";
import { useKeyboardHandlers } from "./useKeyboardHandlers";
import { useNotes } from "./NotesContext";
import AccidentalToggle from "./AccidentalToggle";
import CircularVisModeSelect from "./CircularVizModeSelect";
import { CircularVisMode } from "./CircularVisualizations";

interface PieSliceProps {
  index: number;
  onClick: () => void;
}

const PieSliceKey: React.FC<PieSliceProps> = ({ index, onClick }) => {
  const { selectedNoteIndices, selectedAccidental } = useNotes();
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
    function drawSelectedNotesArrows(selectedNoteIndices: ActualIndex[]) {
      const svgElement = document.querySelector(".pie-slice-keyboard");
      if (!svgElement) return;

      // Remove existing lines
      svgElement.querySelectorAll(".selected-note-line").forEach((el) => el.remove());

      selectedNoteIndices.forEach((index) => {
        const sliceAngle = Constants.FULL_KEY_ANGLE;
        const startAngle = INIT_ANGLE + index * sliceAngle;
        const middleAngle = startAngle + sliceAngle / 2;
        const innerPoint = PolarMath.getCartesianFromPolar(INNER_RADIUS, middleAngle);

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", "0");
        line.setAttribute("y1", "0");
        line.setAttribute("x2", innerPoint.x.toString());
        line.setAttribute("y2", innerPoint.y.toString());
        line.setAttribute("stroke", getComputedColor("--key-border"));
        line.setAttribute("stroke-width", "2");
        line.classList.add("selected-note-line");

        svgElement.appendChild(line);
      });

      // Emphasize the base note
      if (selectedNoteIndices.length > 0) {
        const baseIndex = selectedNoteIndices[0];
        const sliceAngle = Constants.FULL_KEY_ANGLE;
        const startAngle = INIT_ANGLE + baseIndex * sliceAngle;
        const middleAngle = startAngle + sliceAngle / 2;
        const innerPoint = PolarMath.getCartesianFromPolar(INNER_RADIUS, middleAngle);

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", innerPoint.x.toString());
        circle.setAttribute("cy", innerPoint.y.toString());
        circle.setAttribute("r", "5");
        circle.setAttribute("fill", getComputedColor("--root-note-highlight"));
        circle.setAttribute("stroke", getComputedColor("--key-border"));
        circle.setAttribute("stroke-width", "1");
        circle.classList.add("selected-note-line");

        svgElement.appendChild(circle);
      }
    }

    function drawSelectedNotesPolygon(selectedNoteIndices: ActualIndex[]) {
      const svgElement = document.querySelector(".pie-slice-keyboard");
      if (!svgElement || selectedNoteIndices.length < 2) return;

      // Remove existing lines
      svgElement.querySelectorAll(".selected-note-line").forEach((el) => el.remove());

      const numNotes = selectedNoteIndices.length;
      const theEnd = numNotes === 2 ? 1 : numNotes; // intervals don't wrap around, but chords do

      for (let i = 0; i < theEnd; i++) {
        const currentIndex = selectedNoteIndices[i];
        const nextIndex = selectedNoteIndices[(i + 1) % numNotes];

        const startAngle = INIT_ANGLE + currentIndex * Constants.FULL_KEY_ANGLE;
        const endAngle = INIT_ANGLE + nextIndex * Constants.FULL_KEY_ANGLE;

        const startPoint = PolarMath.getCartesianFromPolar(
          INNER_RADIUS,
          startAngle + Constants.FULL_KEY_ANGLE / 2,
        );
        const endPoint = PolarMath.getCartesianFromPolar(
          INNER_RADIUS,
          endAngle + Constants.FULL_KEY_ANGLE / 2,
        );

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", startPoint.x.toString());
        line.setAttribute("y1", startPoint.y.toString());
        line.setAttribute("x2", endPoint.x.toString());
        line.setAttribute("y2", endPoint.y.toString());

        const noteDistance = (nextIndex - currentIndex + TWELVE) % TWELVE;
        const hue = (noteDistance / TWELVE) * 240; // Map note distance from red (0) to blue (240)
        line.setAttribute("stroke", `hsl(${hue}, 100%, 50%)`);

        line.setAttribute("stroke-width", "2");
        line.classList.add("selected-note-line");

        svgElement.appendChild(line);
      }

      // Emphasize the base note
      if (selectedNoteIndices.length > 0) {
        const baseIndex = selectedNoteIndices[0];
        const startAngle = INIT_ANGLE + baseIndex * Constants.FULL_KEY_ANGLE;
        const middleAngle = startAngle + Constants.FULL_KEY_ANGLE / 2;
        const innerPoint = PolarMath.getCartesianFromPolar(INNER_RADIUS, middleAngle);

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", innerPoint.x.toString());
        circle.setAttribute("cy", innerPoint.y.toString());
        circle.setAttribute("r", "5");
        circle.setAttribute("fill", getComputedColor("--root-note-highlight"));
        circle.setAttribute("stroke", getComputedColor("--key-border"));
        circle.setAttribute("stroke-width", "1");
        circle.classList.add("selected-note-line");

        svgElement.appendChild(circle);
      }
    }
    function drawCircularVisualizations() {
      if (circularVisMode === CircularVisMode.Arrows) {
        drawSelectedNotesArrows(selectedNoteIndices);
      } else if (circularVisMode === CircularVisMode.Polygon) {
        drawSelectedNotesPolygon(selectedNoteIndices);
      }
    }

    drawCircularVisualizations();
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
