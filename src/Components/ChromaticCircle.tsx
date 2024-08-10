import React, { useRef, useEffect } from "react";
import { useNotes } from "./NotesContext";
import { calculateChordNotesFromIndex } from "../ChromaticUtils";
import { NOTE_NAMES } from "../NoteConstants";
import { Constants, CircleMath } from "../CircleMath";
import "../styles/ChromaticCircle.css";
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

      let updatedIndices = [];
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

      NOTE_NAMES.forEach((note, index) => {
        drawWedge(ctx, index);
        drawText(ctx, note, index);
      });
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
      noteText: string,
      index: number
    ) => {
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
      ctx.fillStyle = getComputedColor("--note-text");
      ctx.font = "bold 20px Arial";
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
