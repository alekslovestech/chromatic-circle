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
import {
  CircularVisMode,
  drawSelectedNotesArrows,
  drawSelectedNotesPolygon,
} from "./CircularVisualizations";

const KeyboardCircular: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawingMode, setDrawingMode] = useState<CircularVisMode>(CircularVisMode.Arrows);

  const { selectedNoteIndices, selectedAccidental } = useNotes();
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

  const handleDrawingModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDrawingMode(event.target.value as CircularVisMode);
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

      if (drawingMode === CircularVisMode.Arrows) {
        drawSelectedNotesArrows(ctx, selectedNoteIndices);
      } else if (drawingMode === CircularVisMode.Polygon) {
        drawSelectedNotesPolygon(ctx, selectedNoteIndices);
      }
    }

    function drawWedge(ctx: CanvasRenderingContext2D, index: ChromaticIndex) {
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
    }

    function drawText(ctx: CanvasRenderingContext2D, chromaticIndex: ChromaticIndex) {
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
    }

    drawCircle();

    canvasRef.current?.addEventListener("click", HandleCanvasClick);
    return () => {
      canvasRef.current?.removeEventListener("click", HandleCanvasClick);
    };
  }, [selectedNoteIndices, selectedAccidental, handleKeyClick, checkIsRootNote, drawingMode]);

  return (
    <div className="keyboardcircular-container">
      <canvas
        ref={canvasRef}
        className="keyboardcircular"
        width={2 * Constants.CANVAS_RADIUS}
        height={2 * Constants.CANVAS_RADIUS}
      />
      {selectedNoteIndices.length > 1 && (
        <select
          className="drawing-mode-select"
          value={drawingMode}
          onChange={handleDrawingModeChange}
        >
          <option value={CircularVisMode.None}>None</option>
          <option value={CircularVisMode.Arrows}>Arrows</option>
          <option value={CircularVisMode.Polygon}>Polygon</option>
        </select>
      )}
    </div>
  );
};

export default KeyboardCircular;
