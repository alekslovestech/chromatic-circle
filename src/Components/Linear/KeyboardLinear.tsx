import React, { useEffect, useRef, useState } from "react";

import { TWENTY4 } from "../../types/NoteConstants";
import { ActualIndex } from "../../types/IndexTypes";
import { useKeyboardHandlers } from "../useKeyboardHandlers";
import { useMusical } from "../../contexts/MusicalContext";
import { PianoKeyLinear } from "./PianoKeyLinear";

import "../../styles/KeyboardBase.css";
import "../../styles/KeyboardLinear.css";

export const KeyboardLinear: React.FC = () => {
  const { selectedNoteIndices, selectedMusicalKey } = useMusical();
  const { handleKeyClick, checkIsRootNote } = useKeyboardHandlers();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

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
    const isSelected = selectedNoteIndices.includes(actualIndex);
    const isRootNote = checkIsRootNote(actualIndex);

    keys.push(
      <PianoKeyLinear
        key={actualIndex}
        actualIndex={actualIndex}
        isSelected={isSelected}
        isRootNote={isRootNote}
        selectedMusicalKey={selectedMusicalKey}
        containerWidth={containerWidth}
        onClick={handleKeyClick}
      />,
    );
  }

  return (
    <div ref={containerRef} className="keyboardlinear">
      {keys}
    </div>
  );
};
