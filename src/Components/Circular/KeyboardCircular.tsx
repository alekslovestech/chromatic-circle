import React, { useEffect } from "react";
import { TWELVE } from "../../types/NoteConstants";
import { ActualIndex } from "../../types/IndexTypes";
import { useKeyboardHandlers } from "../useKeyboardHandlers";
import { useNotes } from "../NotesContext";
import { drawCircularVisualizationsSVG } from "./CircularVisualizationsSVG";
import PieSlice from "./PieSlice";
import { ixChromatic } from "../../types/ChromaticIndex";
import "../../styles/KeyboardCircular.css";

const MAX_RADIUS = 100;
const OUTER_RADIUS = 0.9 * MAX_RADIUS;
const INNER_RADIUS = 0.5 * MAX_RADIUS;

const KeyboardCircular = ({ isLogo = false }: { isLogo?: boolean }) => {
  const { handleKeyClick } = useKeyboardHandlers();
  const { selectedNoteIndices, circularVisMode } = useNotes();

  useEffect(() => {
    drawCircularVisualizationsSVG(selectedNoteIndices, circularVisMode, INNER_RADIUS);
  }, [selectedNoteIndices, circularVisMode, INNER_RADIUS]);

  return (
    <svg
      viewBox={`-${MAX_RADIUS} -${MAX_RADIUS} ${MAX_RADIUS * 2} ${MAX_RADIUS * 2}`}
      className="svg-container"
    >
      {Array.from({ length: TWELVE }).map((_, index) => (
        <PieSlice
          key={index}
          chromaticIndex={ixChromatic(index)}
          onClick={() => (isLogo ? () => {} : handleKeyClick(index as ActualIndex))}
          outerRadius={OUTER_RADIUS}
          innerRadius={INNER_RADIUS}
          isLogo={isLogo}
        />
      ))}
    </svg>
  );
};

export default KeyboardCircular;
