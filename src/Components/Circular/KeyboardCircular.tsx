import React, { useEffect } from "react";
import { TWELVE } from "../../types/NoteConstants";
import { ActualIndex, ChromaticIndex } from "../../types/IndexTypes";
import { useKeyboardHandlers } from "../useKeyboardHandlers";
import { useNotes } from "../NotesContext";
import { drawCircularVisualizationsSVG } from "./CircularVisualizationsSVG";
import PieSliceKey from "./PieSliceKey";
import CircularBase, { INNER_RADIUS, OUTER_RADIUS } from "./CircularBase";

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
        <PieSliceKey
          key={index}
          chromaticIndex={index as ChromaticIndex}
          onClick={() => handleKeyClick(index as ActualIndex)}
          outerRadius={OUTER_RADIUS}
          innerRadius={INNER_RADIUS}
          showText={true}
        />
      ))}
    </CircularBase>
  );
};

export default KeyboardCircular;
