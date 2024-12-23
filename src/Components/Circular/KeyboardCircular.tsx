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

  const svgWidthHeight = outerRadius * 2;
  const svgViewBox = `-${outerRadius} -${outerRadius} ${svgWidthHeight} ${svgWidthHeight}`;

  useEffect(() => {
    drawCircularVisualizationsSVG(selectedNoteIndices, circularVisMode, innerRadius);
  }, [selectedNoteIndices, circularVisMode, innerRadius]);

  return (
    <div>
      <CircularTopBar showVisualizationMode={selectedNoteIndices.length > 1} />
      <div id="svg-container" className="svg-container">
        <svg
          width={svgWidthHeight}
          height={svgWidthHeight}
          viewBox={svgViewBox}
          className="keyboardcircular-internal"
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
    </div>
  );
};

export default KeyboardCircular;
