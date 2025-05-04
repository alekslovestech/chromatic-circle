import React, { useEffect, useRef, useState } from "react";

import { TWENTY4 } from "../../../types/NoteConstants";
import { ActualIndex, chromaticToActual, ixOctaveOffset } from "../../../types/IndexTypes";
import { LinearKeyboardUtils } from "../../../utils/Keyboard/Linear/LinearKeyboardUtils";

import { useMusical } from "../../../contexts/MusicalContext";
import { GlobalMode, useGlobal } from "../../../contexts/GlobalContext";

import { CIRCLE_RADIUS, useKeyboardHandlers } from "../KeyboardBase";
import { PianoKeyLinear } from "./PianoKeyLinear";

import "../../../styles/KeyboardBase.css";
import "../../../styles/KeyboardLinear.css";

const H2W_RATIO = 0.25; //
export const KeyboardLinear = () => {
  const { globalMode } = useGlobal();
  const { selectedMusicalKey } = useMusical();
  const { handleKeyClick, checkIsRootNote } = useKeyboardHandlers();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const isAdvanced = globalMode === GlobalMode.Advanced;

  const renderScaleBoundary = () => {
    if (!isAdvanced) return null;

    const pos1 = chromaticToActual(selectedMusicalKey.tonicIndex, ixOctaveOffset(0));
    const pos2 = chromaticToActual(selectedMusicalKey.tonicIndex, ixOctaveOffset(1));
    const x1 = LinearKeyboardUtils.calculateKeyLeftPosition(pos1, containerWidth);
    const x2 = LinearKeyboardUtils.calculateKeyLeftPosition(pos2, containerWidth);

    const containerHeight = containerWidth * H2W_RATIO;
    console.log("containerHeight", containerHeight);
    const startY = Math.round(containerHeight * 0.8);
    const endY = Math.round(containerHeight * 0.87);
    const circleCenterY = Math.round(containerHeight * 0.9);
    // Create a vertical line at the tonic position - in both scales
    return [
      <line
        className="scale-boundary linear"
        key="scale-boundrary-left"
        x1={x1}
        y1={startY}
        x2={x1}
        y2={endY}
      />,
      <circle
        key="scale-boundrary-left-circle"
        cx={x1}
        cy={circleCenterY}
        r={CIRCLE_RADIUS}
        fill="none"
        stroke="black"
      />,
      <line
        className="scale-boundary linear"
        key="scale-boundrary-right"
        x1={x2}
        y1={startY}
        x2={x2}
        y2={endY}
      />,
      <circle
        key="scale-boundrary-right-circle"
        cx={x2}
        cy={circleCenterY}
        r={CIRCLE_RADIUS}
        fill="none"
        stroke="black"
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
      <svg
        className="scale-boundary-svg"
        viewBox={`0 -10 ${containerWidth} 110`}
        preserveAspectRatio="xMidYMid meet"
      >
        {renderScaleBoundary()}
      </svg>
      {keys}
    </div>
  );
};
