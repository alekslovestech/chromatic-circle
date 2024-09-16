import React, { useRef, useEffect } from "react";
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

const KeyboardCircular: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { selectedNoteIndices, selectedAccidental } = useNotes();

  const { handleKeyClick, checkIsRootNote } = useKeyboardHandlers();

  useEffect(() => {
    const HandleCanvasClick = (event: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const [pureX, pureY] = CircleMath.ViewportToCartesian(event.clientX, event.clientY, rect);
      const [radius, angle] = CircleMath.CartesianToCircular(pureX, pureY);

      if (!CircleMath.IsRadiusInRange(radius)) return;

      const noteIndex = CircleMath.AngleToNoteIndex(angle);
      handleKeyClick(chromaticToActual(noteIndex, ixOctaveOffset(0)));
    };

    const drawCircle = () => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      for (let chromaticIndex = 0 as ChromaticIndex; chromaticIndex < TWELVE; chromaticIndex++) {
        drawWedge(ctx, chromaticIndex);
        drawText(ctx, chromaticIndex);
      }
      drawSelectedNotesPolygon(ctx);
    };

    const drawWedge = (ctx: CanvasRenderingContext2D, index: ChromaticIndex) => {
      const startAngle = CircleMath.NoteIndexToLeftAngle(index);
      const endAngle = startAngle + Constants.FULL_KEY_ANGLE;
      const innerRadius = CircleMath.getInnerRadius(index);
      const outerRadius = CircleMath.getOuterRadius(index);

      ctx.beginPath();
      ctx.arc(Constants.centerX, Constants.centerY, outerRadius, startAngle, endAngle);
      ctx.arc(Constants.centerX, Constants.centerY, innerRadius, endAngle, startAngle, true);
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
    };

    const drawText = (ctx: CanvasRenderingContext2D, chromaticIndex: ChromaticIndex) => {
      const innerRadius = CircleMath.getInnerRadius(chromaticIndex);
      const outerRadius = CircleMath.getOuterRadius(chromaticIndex);
      const radius = (outerRadius + innerRadius) / 2;

      ctx.save();
      ctx.translate(Constants.centerX, Constants.centerY);
      ctx.rotate(chromaticIndex * Constants.FULL_KEY_ANGLE + Constants.FULL_KEY_ANGLE / 2);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillStyle = getComputedTextColor(chromaticToActual(chromaticIndex, 0 as OctaveOffset));
      ctx.font = "bold 20px Arial";
      const noteText = getNoteTextFromIndex(ixActual(chromaticIndex), selectedAccidental);
      ctx.fillText(noteText, 0, -radius);
      ctx.restore();
    };

    const colorFromNoteDistance = (noteDistance: number) => {
      const hue = 240 - (noteDistance / TWELVE) * 240; // Map note distance from red (0) to dark blue (240)
      const saturation = 100;
      const lightness = 50 - (noteDistance / TWELVE) * 25; // Darken the blue end
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    const drawSelectedNotesPolygon = (ctx: CanvasRenderingContext2D) => {
      if (selectedNoteIndices.length < 2) return;

      const coordinates = selectedNoteIndices.map((index) => CircleMath.getPolyCoors(index));

      ctx.beginPath();
      ctx.moveTo(coordinates[0].x, coordinates[0].y);
      for (let i = 1; i < coordinates.length; i++) {
        ctx.beginPath();
        ctx.moveTo(coordinates[i - 1].x, coordinates[i - 1].y);
        ctx.lineTo(coordinates[i].x, coordinates[i].y);
        const noteDistance = (selectedNoteIndices[i] - selectedNoteIndices[i - 1]) % TWELVE;
        ctx.strokeStyle = colorFromNoteDistance(noteDistance);
        ctx.stroke();
      }
      // Connect last point to first point
      const lastNoteDistance =
        (selectedNoteIndices[0] - selectedNoteIndices[selectedNoteIndices.length - 1] + TWELVE) %
        TWELVE;
      ctx.strokeStyle = colorFromNoteDistance(lastNoteDistance);
      ctx.beginPath();
      ctx.moveTo(coordinates[coordinates.length - 1].x, coordinates[coordinates.length - 1].y);
      ctx.lineTo(coordinates[0].x, coordinates[0].y);
      ctx.stroke();

      ctx.lineWidth = 2;
      ctx.stroke();
    };

    drawCircle();

    canvasRef.current?.addEventListener("click", HandleCanvasClick);
    return () => {
      canvasRef.current?.removeEventListener("click", HandleCanvasClick);
    };
  }, [selectedNoteIndices, selectedAccidental, handleKeyClick, checkIsRootNote]);

  return (
    <div className="keyboardcircular-container">
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
