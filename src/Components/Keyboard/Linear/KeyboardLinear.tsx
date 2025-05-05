import React, { useEffect, useRef, useState } from "react";

import { TWENTY4 } from "../../../types/NoteConstants";
import { ActualIndex } from "../../../types/IndexTypes";
import { LinearKeyboardUtils } from "../../../utils/Keyboard/Linear/LinearKeyboardUtils";

import { useKeyboardHandlers } from "../KeyboardBase";
import { PianoKeyLinear } from "./PianoKeyLinear";

import { useMusical } from "../../../contexts/MusicalContext";
import { GlobalMode, useGlobal } from "../../../contexts/GlobalContext";

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

    const { x1, x2 } = LinearKeyboardUtils.calculateScaleBoundaryPercentages(
      selectedMusicalKey.tonicIndex,
    );

    console.log(`Tonic index: ${selectedMusicalKey.tonicIndex}`);
    console.log(`Scale boundary positions: x1=${x1}, x2=${x2}`);
    console.log(`ViewBox: 0 -10 100 110`);
    console.log(`SVG dimensions: width=${containerWidth}, height=${containerWidth * H2W_RATIO}`);
    const startY = 90;
    const endY = 100;
    const circleCenterY = 105;
    // Create a vertical line at the tonic position - in both scales
    return [
      <line
        className="scale-boundary linear"
        key="scale-boundrary-left"
        x1={x1}
        y1={startY}
        x2={x1}
        y2={endY}
        vectorEffect="non-scaling-stroke"
      />,
      <line
        className="scale-boundary linear"
        key="scale-boundrary-right"
        x1={x2}
        y1={startY}
        x2={x2}
        y2={endY}
        vectorEffect="non-scaling-stroke"
      />,
      <circle
        key="scale-boundrary-left-circle"
        cx={x1}
        cy={circleCenterY}
        r={3}
        fill="none"
        stroke="black"
        vectorEffect="non-scaling-stroke"
      />,
      <circle
        key="scale-boundrary-right-circle"
        cx={x2}
        cy={circleCenterY}
        r={3}
        fill="none"
        stroke="black"
        vectorEffect="non-scaling-stroke"
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
      {/*<svg className="scale-boundary-svg" viewBox={`0 -10 100 110`} preserveAspectRatio="none">
        {renderScaleBoundary()}
      </svg>*/}
      {keys}
    </div>
  );
};
