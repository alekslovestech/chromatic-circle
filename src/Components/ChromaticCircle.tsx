import React, { useRef, useEffect } from "react";
import "../styles/ChromaticCircle.css";

import { useNotes } from "./NotesContext";
import { calculateChordNotesFromIndex, getNoteTextFromIndex } from "../ChromaticUtils";
import { Constants, CircleMath } from "../CircleMath";
import {
  getKeyColorResolved,
  getComputedColor,
} from "../utils/getComputedColor";

const ChromaticCircle: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    inputMode,
    selectedNoteIndices,
    setSelectedNoteIndices,
    selectedChordType,
    selectedAccidental
  } = useNotes();

  useEffect(() => {
    const HandleCanvasClick = (event: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const [pureX, pureY] = CircleMath.ViewportToCartesian(
        event.clientX,
        event.clientY,
        rect
      );
      const [radius, angle] = CircleMath.CartesianToCircular(pureX, pureY);

      if (!CircleMath.IsRadiusInRange(radius)) return;

      const noteIndex = CircleMath.AngleToNoteIndex(angle);
      console.log(`selected ${noteIndex} in mode=${inputMode}`);

      let updatedIndices: number[] = [];
      if (inputMode === "CIRCLE_INPUT") {
        updatedIndices = selectedNoteIndices.includes(noteIndex)
          ? selectedNoteIndices.filter((i) => i !== noteIndex)
          : [...selectedNoteIndices, noteIndex];
      } else if (inputMode === "CHORD_PRESETS") {
        updatedIndices = calculateChordNotesFromIndex(
          noteIndex,
          selectedChordType
        );
      }
      setSelectedNoteIndices(updatedIndices);
    };

    const drawCircle = () => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      for (let chromaticIndex = 0; chromaticIndex < 12; chromaticIndex++) {
        drawWedge(ctx, chromaticIndex);
        drawText(ctx, chromaticIndex);
      };
    };

    const drawWedge = (ctx: CanvasRenderingContext2D, index: number) => {
      const startAngle = CircleMath.NoteIndexToLeftAngle(index);
      const endAngle = startAngle + Constants.FULL_KEY_ANGLE;
      const innerRadius = CircleMath.getInnerRadius(index);
      const outerRadius = CircleMath.getOuterRadius(index);

      ctx.beginPath();
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

      ctx.fillStyle = getKeyColorResolved(index, selectedNoteIndices);
      ctx.fill();

      ctx.strokeStyle = getComputedColor("--key-border");
      ctx.stroke();
    };

    const drawText = (
      ctx: CanvasRenderingContext2D,
      chromaticIndex: number
    ) => {
      const innerRadius = CircleMath.getInnerRadius(chromaticIndex);
      const outerRadius = CircleMath.getOuterRadius(chromaticIndex);
      const radius = (outerRadius + innerRadius) / 2;

      ctx.save();
      ctx.translate(Constants.centerX, Constants.centerY);
      ctx.rotate(
        chromaticIndex * Constants.FULL_KEY_ANGLE + Constants.FULL_KEY_ANGLE / 2
      );
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = getComputedColor("--note-text");
      ctx.font = "bold 20px Arial";
      const noteText = getNoteTextFromIndex(chromaticIndex, selectedAccidental); 
      ctx.fillText(noteText, 0, -radius);
      ctx.restore();
    };

    drawCircle();

    canvasRef.current?.addEventListener("click", HandleCanvasClick);
    return () => {
      canvasRef.current?.removeEventListener("click", HandleCanvasClick);
    };
  }, [
    inputMode,
    selectedNoteIndices,
    setSelectedNoteIndices,
    selectedChordType,
    selectedAccidental
  ]);

  return (
    <div className="chromatic-circle-container">
      <canvas
        ref={canvasRef}
        className="chromatic-circle"
        width={2 * Constants.CANVAS_RADIUS}
        height={2 * Constants.CANVAS_RADIUS}
      />
    </div>
  );
};

export default ChromaticCircle;
