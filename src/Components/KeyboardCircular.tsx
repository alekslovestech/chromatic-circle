import React, { useEffect } from "react";
import "../styles/KeyboardCircular.css";
import { TWELVE } from "../types/NoteConstants";
import { ActualIndex } from "../types/IndexTypes";
import { useKeyboardHandlers } from "./useKeyboardHandlers";
import { useNotes } from "./NotesContext";
import AccidentalToggle from "./AccidentalToggle";
import CircularVisModeSelect from "./CircularVizModeSelect";
import { OUTER_RADIUS } from "../utils/CommonMath";
import { drawCircularVisualizationsSVG } from "./CircularVisualizationsSVG";
import PieSliceKey from "./PieSlice";

const KeyboardCircular: React.FC = () => {
  const { handleKeyClick } = useKeyboardHandlers();
  const { selectedNoteIndices, circularVisMode } = useNotes();

  const [outerRadius, setOuterRadius] = React.useState(OUTER_RADIUS);

  useEffect(() => {
    drawCircularVisualizationsSVG(selectedNoteIndices, circularVisMode, innerRadius);
  }, [selectedNoteIndices, handleKeyClick, circularVisMode, outerRadius]);

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.querySelector(".keyboardcircular-container");
      const containerWidth = container?.clientWidth || 2 * OUTER_RADIUS;
      const containerHeight = container?.clientHeight || 2 * OUTER_RADIUS;
      const newOuterRadius = (0.65 * Math.min(containerWidth, containerHeight)) / 2;
      console.log(`containerWidth: ${containerWidth}, containerHeight: ${containerHeight}`);
      console.log(`newOuterRadius: ${newOuterRadius}`);
      setOuterRadius(newOuterRadius);
    };

    updateDimensions(); // Initial calculation
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const innerRadius = 0.5 * outerRadius;

  //CONSIDER MOVING THE TOPBAR OUTSIDE THIS COMPONENT
  return (
    <div>
      <div className="d-flex justify-content-between w-100" id="keyboardpieslice-topbar">
        <div className="me-auto">
          <AccidentalToggle />
        </div>
        <div className={`ms-auto ${selectedNoteIndices.length > 1 ? "" : "invisible"}`}>
          <CircularVisModeSelect />
        </div>
      </div>
      <div
        id="svg-container"
        style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
      >
        <svg
          width={outerRadius * 2}
          height={outerRadius * 2}
          viewBox={`-${outerRadius} -${outerRadius} ${outerRadius * 2} ${outerRadius * 2}`}
          className="keyboardcircular-internal"
        >
          {Array.from({ length: TWELVE }).map((_, index) => (
            <PieSliceKey
              key={index}
              index={index as ActualIndex}
              onClick={() => handleKeyClick(index as ActualIndex)}
              outerRadius={outerRadius}
              innerRadius={innerRadius}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default KeyboardCircular;
