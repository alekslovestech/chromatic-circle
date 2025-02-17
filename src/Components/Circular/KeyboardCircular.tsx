import React, { useEffect } from "react";
import { TWELVE } from "../../types/NoteConstants";
import { ActualIndex } from "../../types/IndexTypes";
import { useKeyboardHandlers } from "../useKeyboardHandlers";
import { useNotes } from "../NotesContext";
import { drawCircularVisualizationsSVG } from "./CircularVisualizationsSVG";
import PieSlice from "./PieSlice";
import CircularBase, { INNER_RADIUS, OUTER_RADIUS } from "./CircularBase";
import { ixChromatic } from "../../types/ChromaticIndex";
import "../../styles/KeyboardCircular.css";

const KeyboardCircular: React.FC = () => {
  const { handleKeyClick } = useKeyboardHandlers();
  const { selectedNoteIndices, circularVisMode } = useNotes();

  useEffect(() => {
    drawCircularVisualizationsSVG(selectedNoteIndices, circularVisMode, INNER_RADIUS);
  }, [selectedNoteIndices, circularVisMode, INNER_RADIUS]);

  return (
    <CircularBase>
      {Array.from({ length: TWELVE }).map((_, index) => (
        <PieSlice
          key={index}
          chromaticIndex={ixChromatic(index)}
          onClick={() => handleKeyClick(index as ActualIndex)}
          outerRadius={OUTER_RADIUS}
          innerRadius={INNER_RADIUS}
          isLogo={false}
        />
      ))}
    </CircularBase>
  );
};

export default KeyboardCircular;
