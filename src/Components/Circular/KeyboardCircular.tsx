import React, { useEffect } from "react";
import { TWELVE } from "../../types/NoteConstants";
import { ActualIndex } from "../../types/IndexTypes";
import { useKeyboardHandlers } from "../useKeyboardHandlers";
import { useNotes } from "../NotesContext";
import { drawCircularVisualizationsSVG } from "./CircularVisualizationsSVG";
import { CircularTopBar } from "./CircularTopBar";
import { useCircularLayout } from "./useCircularLayout";
import PieSliceKey from "./PieSliceKey";

import "../../styles/KeyboardCircular.css";

const KeyboardCircular: React.FC = () => {
  const { handleKeyClick } = useKeyboardHandlers();
  const { selectedNoteIndices, circularVisMode } = useNotes();
  const { outerRadius, innerRadius } = useCircularLayout();

  const roundedOuterRadius = Math.round(outerRadius * 100) / 100; // round to 2 decimal places, for viewBox debugging in browser
  const outerDiameter = 2 * roundedOuterRadius;
  const getViewBox = (outerRadius: number) =>
    `-${outerRadius} -${outerRadius} ${outerRadius * 2} ${outerRadius * 2}`;

  useEffect(() => {
    drawCircularVisualizationsSVG(selectedNoteIndices, circularVisMode, innerRadius);
  }, [selectedNoteIndices, circularVisMode, innerRadius]);

  return (
    <div>
      <CircularTopBar showVisualizationMode={selectedNoteIndices.length > 1} />
      <svg
        width={outerDiameter}
        height={outerDiameter}
        viewBox={getViewBox(roundedOuterRadius)}
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
    </div>
  );
};

export default KeyboardCircular;
