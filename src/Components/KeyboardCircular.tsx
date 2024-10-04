import React, { useRef, useEffect, useState } from "react";
import "../styles/KeyboardCircular.css";
import { useNotes } from "./NotesContext";
import { Constants, CircleMath } from "../utils/CircleMath";
import {
  getComputedColor,
  getComputedTextColor,
  getComputedKeyColorOverlayed,
} from "../utils/ColorUtils";
import { TWELVE } from "../types/NoteConstants";
import {
  ChromaticIndex,
  chromaticToActual,
  ixActual,
  ixOctaveOffset,
  OctaveOffset,
} from "../types/IndexTypes";
import { getNoteTextFromIndex } from "../utils/NoteUtils";
import { useKeyboardHandlers } from "./useKeyboardHandlers";
import { drawCircularVisualizations } from "./CircularVisualizations";
import AccidentalToggle from "./AccidentalToggle";
import CircularVisModeSelect from "./CircularVizModeSelect";
import {
  CommonMath,
  INIT_ANGLE,
  INNER_RADIUS,
  MIDDLE_RADIUS,
  OUTER_RADIUS,
} from "../utils/CommonMath";

const KeyboardCircular: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { selectedNoteIndices, selectedAccidental, circularVisMode } = useNotes();
  const { handleKeyClick, checkIsRootNote } = useKeyboardHandlers();

  const HandleCanvasClick = (event: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const [pureX, pureY] = CircleMath.ViewportToCartesian(event.clientX, event.clientY, rect);
    const [radius, angle] = CircleMath.CartesianToCircular(pureX, pureY);

    if (!CircleMath.IsRadiusInRange(radius)) return;

    const noteIndex = CircleMath.AngleToNoteIndex(angle);
    handleKeyClick(chromaticToActual(noteIndex, ixOctaveOffset(0)));
  };

  useEffect(() => {
    function drawCircle() {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      for (let chromaticIndex = 0 as ChromaticIndex; chromaticIndex < TWELVE; chromaticIndex++) {
        drawWedge(ctx, chromaticIndex);
        drawText(ctx, chromaticIndex);
      }

      drawCircularVisualizations(ctx, selectedNoteIndices, circularVisMode);
    }

    function drawWedge(ctx: CanvasRenderingContext2D, index: ChromaticIndex) {
      const { startAngle, endAngle } = CommonMath.NoteIndexToAngles(index);

      ctx.beginPath();
      ctx.arc(Constants.centerX, Constants.centerY, OUTER_RADIUS, startAngle, endAngle);
      ctx.arc(Constants.centerX, Constants.centerY, INNER_RADIUS, endAngle, startAngle, true);
      ctx.closePath();

      ctx.fillStyle = getComputedKeyColorOverlayed(index, selectedNoteIndices);
      ctx.fill();

      ctx.strokeStyle = getComputedColor("--key-border");
      ctx.stroke();

      if (checkIsRootNote(chromaticToActual(index, ixOctaveOffset(0)))) {
        ctx.strokeStyle = getComputedColor("--root-note-highlight");
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.lineWidth = 1;
      }
    }

    function drawText(ctx: CanvasRenderingContext2D, chromaticIndex: ChromaticIndex) {
      ctx.save();
      ctx.translate(Constants.centerX, Constants.centerY);
      const { middleAngle } = CommonMath.NoteIndexToAngles(chromaticIndex);
      ctx.rotate(middleAngle - INIT_ANGLE);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillStyle = getComputedTextColor(chromaticToActual(chromaticIndex, 0 as OctaveOffset));
      ctx.font = "bold 20px Arial";
      const noteText = getNoteTextFromIndex(ixActual(chromaticIndex), selectedAccidental);
      ctx.fillText(noteText, 0, -MIDDLE_RADIUS);
      ctx.restore();
    }

    drawCircle();

    canvasRef.current?.addEventListener("click", HandleCanvasClick);
    return () => {
      canvasRef.current?.removeEventListener("click", HandleCanvasClick);
    };
  }, [selectedNoteIndices, selectedAccidental, handleKeyClick, checkIsRootNote, circularVisMode]);

  return (
    <div className="keyboardcircular-container">
      <div className="keyboardcircular-overlay">
        <AccidentalToggle />
        {selectedNoteIndices.length > 1 && <CircularVisModeSelect />}
      </div>
      <canvas
        ref={canvasRef}
        className="keyboardcircular"
        width={2 * Constants.CANVAS_RADIUS}
        height={2 * Constants.CANVAS_RADIUS}
      />
    </div>
  );
};

export default KeyboardCircular;
