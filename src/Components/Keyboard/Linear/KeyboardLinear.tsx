import React, { useEffect, useRef, useState } from "react";

import { TWENTY4 } from "../../../types/NoteConstants";
import { ActualIndex } from "../../../types/IndexTypes";

import { useMusical } from "../../../contexts/MusicalContext";
import { GlobalMode, useGlobal } from "../../../contexts/GlobalContext";

import { useKeyboardHandlers } from "../KeyboardBase";
import { PianoKeyLinear } from "./PianoKeyLinear";

import "../../../styles/KeyboardBase.css";
import "../../../styles/KeyboardLinear.css";
import { LinearKeyboardUtils } from "../../../utils/Keyboard/Linear/LinearKeyboardUtils";

const CIRCLE_RADIUS = 5;
export const KeyboardLinear = () => {
  const { globalMode } = useGlobal();
  const { selectedMusicalKey } = useMusical();
  const { handleKeyClick, checkIsRootNote } = useKeyboardHandlers();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const isAdvanced = globalMode === GlobalMode.Advanced;

  const renderScaleBoundary = () => {
    if (!isAdvanced) return null;

    const { x1, x2 } = LinearKeyboardUtils.calculateScaleBoundaryPercentages(
      selectedMusicalKey.tonicIndex,
    );

    const startY = "85%";
    const endY = "100%";
    const circleCenterY = "110%";
    // Apply the heights to both boundary lines
    const line1_start = { x: `${x1}%`, y: startY };
    const line1_end = { x: `${x1}%`, y: endY };
    const line2_start = { x: `${x2}%`, y: startY };
    const line2_end = { x: `${x2}%`, y: endY };
    // Create a vertical line at the tonic position - in both scales

    return [
      <line
        className="scale-boundary linear"
        key="scale-boundrary-left"
        x1={line1_start.x}
        y1={line1_start.y}
        x2={line1_end.x}
        y2={line1_end.y}
      />,
      <circle
        key="scale-boundrary-left-circle"
        cx={line1_start.x}
        cy={circleCenterY}
        r={CIRCLE_RADIUS}
        fill="none"
        stroke="currentColor"
      />,
      <line
        className="scale-boundary linear"
        key="scale-boundrary-right"
        x1={line2_start.x}
        y1={line2_start.y}
        x2={line2_end.x}
        y2={line2_end.y}
      />,
    ];
  };

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        // Use getBoundingClientRect() for more accurate width measurement
        // This includes padding but excludes borders and margins
        const rect = containerRef.current.getBoundingClientRect();
        setContainerWidth(rect.width);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [containerRef]);

  const keys = [];
  for (let actualIndex = 0 as ActualIndex; actualIndex < TWENTY4; actualIndex++) {
    const isRootNote = checkIsRootNote(actualIndex);

    keys.push(
      <PianoKeyLinear
        key={actualIndex}
        actualIndex={actualIndex}
        isRootNote={isRootNote}
        containerWidth={containerWidth}
        onClick={handleKeyClick}
      />,
    );
  }

  return (
    <div ref={containerRef} className="keyboardlinear">
      <svg className="scale-boundary-svg" viewBox="0 -10 100 110" preserveAspectRatio="none">
        {renderScaleBoundary()}
      </svg>
      {keys}
    </div>
  );
};
