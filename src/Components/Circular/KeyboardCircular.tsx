import React, { useEffect } from "react";
import { TWELVE } from "../../types/NoteConstants";
import { ActualIndex } from "../../types/IndexTypes";
import { useKeyboardHandlers } from "../useKeyboardHandlers";
import { useNotes } from "../NotesContext";
import { drawCircularVisualizationsSVG } from "./CircularVisualizationsSVG";
import PieSliceKey from "./PieSliceKey";

import "../../styles/KeyboardCircular.css";

const KeyboardCircular: React.FC = () => {
  const { handleKeyClick } = useKeyboardHandlers();
  const { selectedNoteIndices, circularVisMode } = useNotes();
  const outerRadius = 100; // Fixed outer radius for 200x200 viewBox
  const innerRadius = 0.5 * outerRadius; // Fixed inner radius at half of outer

  useEffect(() => {
    drawCircularVisualizationsSVG(selectedNoteIndices, circularVisMode, innerRadius);
  }, [selectedNoteIndices, circularVisMode, innerRadius]);

  return (
    <svg
      viewBox="-100 -100 200 200" // Fixed coordinate system
      className="svg-container"
    >
      {Array.from({ length: TWELVE }).map((_, index) => (
        <PieSliceKey
          key={index}
          actualIndex={index as ActualIndex}
          onClick={() => handleKeyClick(index as ActualIndex)}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          showText={true}
        />
      ))}
    </svg>
  );
};

export default KeyboardCircular;
