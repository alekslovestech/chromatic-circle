import React, { useEffect, useMemo } from "react";
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
import { CommonMath, OUTER_RADIUS } from "../utils/CommonMath";
import { drawCircularVisualizationsSVG } from "./CircularVisualizationsSVG";

interface PieSliceProps {
  index: number;
  onClick: () => void;
  outerRadius: number;
  innerRadius: number;
}

const PieSliceKey: React.FC<PieSliceProps> = ({ index, onClick, outerRadius, innerRadius }) => {
  const { selectedNoteIndices, selectedAccidental } = useNotes();
  const { startAngle, middleAngle, endAngle } = CommonMath.NoteIndexToAngles(index);

  const outerStart = PolarMath.getCartesianFromPolar(outerRadius, startAngle);
  const outerEnd = PolarMath.getCartesianFromPolar(outerRadius, endAngle);
  const innerStart = PolarMath.getCartesianFromPolar(innerRadius, startAngle);
  const innerEnd = PolarMath.getCartesianFromPolar(innerRadius, endAngle);

  const blackWhiteClass = getBlackWhiteString(index as ActualIndex);
  const isSelected = selectedNoteIndices.includes(index as ActualIndex);
  const selectedClass = isSelected ? "selected" : "";
  const middleRadius = (innerRadius + outerRadius) / 2;
  const textPosition = PolarMath.getCartesianFromPolar(middleRadius, middleAngle);

  const pathData = [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}`,
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

  const [outerRadius, setOuterRadius] = React.useState(OUTER_RADIUS);

  useEffect(() => {
    drawCircularVisualizationsSVG(selectedNoteIndices, circularVisMode, innerRadius);
  }, [selectedNoteIndices, handleKeyClick, circularVisMode, outerRadius]);

  useEffect(() => {
    const updateDimensions = () => {
      const containerWidth =
        document.querySelector(".keyboardpieslice-container")?.clientWidth || 2 * OUTER_RADIUS;
      console.log(`containerWidth: ${containerWidth}`);
      const newOuterRadius = containerWidth / 4;
      setOuterRadius(newOuterRadius);
    };

    updateDimensions(); // Initial calculation
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const innerRadius = 0.5 * outerRadius;

  return (
    <div className="container" id="keyboardpieslice-container">
      <div className="d-flex justify-content-between w-100" id="keyboardpieslice-topbar">
        <div className="me-auto">
          <AccidentalToggle />
        </div>
        <div className={`ms-auto ${selectedNoteIndices.length > 1 ? "" : "invisible"}`}>
          <CircularVisModeSelect />
        </div>
      </div>
      <div className="container" id="svg-container">
        <svg
          width="100%"
          height="100%"
          viewBox={`-${outerRadius} -${outerRadius} ${outerRadius * 2} ${outerRadius * 2}`}
          preserveAspectRatio="xMidYMid meet"
          className="keyboard-pieslice"
        >
          {Array.from({ length: TWELVE }).map((_, index) => (
            <PieSliceKey
              key={index}
              index={index}
              onClick={() => handleClick(index)}
              outerRadius={outerRadius}
              innerRadius={innerRadius}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default KeyboardPieSlice;
