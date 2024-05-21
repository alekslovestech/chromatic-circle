import React, { useRef, useEffect } from "react";
import { useNotes } from "./NotesContext";
import {
  NOTE_NAMES,
  isBlackKey,
  calculateChordNotesFromIndex,
} from "./ChromaticUtils";
import { Constants, CircleMath } from "./CircleMath";

const ChromaticCircle: React.FC = () => {
 
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    inputMode,
    selectedNoteIndices,
    setSelectedNoteIndices,
    selectedChordType,
  } = useNotes();

  useEffect(() => {
    const HandleCanvasClick = (event: any) => {
      const rect = canvasRef.current
        ? canvasRef.current.getBoundingClientRect()
        : null;
      if (!rect) {
        console.log("Canvas reference is null");
        return;
      }
      const [pureX, pureY] = CircleMath.ViewportToCartesian(
        event.clientX,
        event.clientY,
        rect
      );

      const [radius, angle] = CircleMath.CartesianToCircular(pureX, pureY);
      if (!CircleMath.IsRadiusInRange(radius)) {
        console.log("Click outside the radius range");
        return; // Don't do anything if the click is outside the circle
      }
      const noteIndex = CircleMath.AngleToNoteIndex(angle);
      console.log(`selected ${noteIndex} in mode=${inputMode} `);

      let updatedIndices = [];
      if (inputMode === "CIRCLE_INPUT") {
        updatedIndices = selectedNoteIndices.includes(noteIndex)
          ? selectedNoteIndices.filter((i) => i !== noteIndex) // Remove index if already selected
          : [...selectedNoteIndices, noteIndex]; // Add index if not already selected
      } else if (inputMode === "CHORD_PRESETS") {
        updatedIndices = calculateChordNotesFromIndex(
          noteIndex,
          selectedChordType
        );
      }
      updatedIndices.sort((a: number, b: number) => a - b);

      const changeDetected =
        updatedIndices.length !== selectedNoteIndices.length ||
        updatedIndices.some(
          (index: number, i: number) => index !== selectedNoteIndices[i]
        );
      if (!changeDetected) {
        console.log("No change in selected notes");
        return;
      }

      setSelectedNoteIndices(updatedIndices);
      console.log(updatedIndices);

      return () => {
        //canvasRef.removeEventListener("click", HandleCanvasClick);
      };
    };

    if (!canvasRef) return;
    const canvasElement: HTMLCanvasElement | null = canvasRef.current
      ? canvasRef.current
      : null;
    if (!canvasElement) return;

    canvasElement.addEventListener("click", HandleCanvasClick);
    const ctx: CanvasRenderingContext2D |null = canvasElement
      ? canvasElement.getContext("2d")
      : null;
    if (!ctx) return;
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);

    const drawText = (noteText: string, index: number) => {
      ctx.font = "bold 20px Arial";
      ctx.fillStyle = "blue";

      const innerRadius = CircleMath.getInnerRadius(index);
      const outerRadius = CircleMath.getOuterRadius(index);

      const radius = (outerRadius + innerRadius) / 2;

      ctx.save();
      ctx.translate(Constants.centerX, Constants.centerY);
      ctx.rotate(
        index * Constants.FULL_KEY_ANGLE + Constants.FULL_KEY_ANGLE / 2
      );
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(noteText, 0, -radius);
      ctx.restore();
    };

    const DrawWedge = (index: number) => {
      ctx.beginPath();
      const isBlack = isBlackKey(index);
      const isSelected = selectedNoteIndices.includes(index);

      let keyColor = CircleMath.GetKeyColor(isBlack, isSelected);

      const startAngle = CircleMath.NoteIndexToLeftAngle(index);
      const endAngle = startAngle + Constants.FULL_KEY_ANGLE;

      const innerRadius = CircleMath.getInnerRadius(index);
      const outerRadius = CircleMath.getOuterRadius(index);
      ctx.arc(
        Constants.centerX,
        Constants.centerY,
        outerRadius,
        startAngle,
        endAngle
      );
      ctx.arc(
        Constants.centerX,
        Constants.centerY,
        innerRadius,
        endAngle,
        startAngle,
        true
      );
      ctx.closePath();
      ctx.fillStyle = keyColor;
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    NOTE_NAMES.forEach((note, index) => {
      DrawWedge(index);
      drawText(note, index);
    });
  }, [inputMode, selectedNoteIndices, selectedChordType]);

  return (
    <canvas
      ref={canvasRef}
      width={2 * Constants.CANVAS_RADIUS}
      height={2 * Constants.CANVAS_RADIUS}
    />
  );
};

export default ChromaticCircle;
