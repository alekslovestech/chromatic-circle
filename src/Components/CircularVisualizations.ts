import { CircleMath, Constants } from "../utils/CircleMath";
import { getComputedColor } from "../utils/ColorUtils";
import { ActualIndex } from "../types/IndexTypes";
import { TWELVE } from "../types/NoteConstants";
import { CommonMath } from "../utils/CommonMath";

export enum CircularVisMode {
  None = "None",
  Arrows = "Radial",
  Polygon = "Polygon",
}

export const colorFromNoteDistance = (noteDistance: number) => {
  const hue = (noteDistance / TWELVE) * 240; // Map note distance from red (0) to blue (240)
  return `hsl(${hue}, 100%, 50%)`;
};

export function drawCircularVisualizations(
  ctx: CanvasRenderingContext2D,
  selectedNoteIndices: ActualIndex[],
  drawingMode: CircularVisMode,
) {
  if (drawingMode === CircularVisMode.Arrows) {
    drawSelectedNotesArrows(ctx, selectedNoteIndices);
  } else if (drawingMode === CircularVisMode.Polygon) {
    drawSelectedNotesPolygon(ctx, selectedNoteIndices);
  }
}

function drawSelectedNotesArrows(
  ctx: CanvasRenderingContext2D,
  selectedNoteIndices: ActualIndex[],
) {
  const numNotes = selectedNoteIndices.length;
  if (numNotes < 2) return;

  const coordinates = selectedNoteIndices.map((index) => CircleMath.getPolyCoors(index));
  ctx.strokeStyle = getComputedColor("--key-border");
  ctx.lineWidth = 2;

  ctx.beginPath();
  for (let i = 0; i < numNotes; i++) {
    ctx.moveTo(Constants.centerX, Constants.centerY);
    ctx.lineTo(coordinates[i].x, coordinates[i].y);
    ctx.stroke();
  }

  emphasizeBaseNote(ctx, coordinates[0]);
}

function drawSelectedNotesPolygon(
  ctx: CanvasRenderingContext2D,
  selectedNoteIndices: ActualIndex[],
) {
  const numNotes = selectedNoteIndices.length;
  if (numNotes < 2) return;

  const theEnd = numNotes === 2 ? 1 : numNotes; //intervals don't wrap around, but chords do

  const coordinates = selectedNoteIndices.map((index) => CircleMath.getPolyCoors(index));
  ctx.beginPath();
  for (let i = 0; i < theEnd; i++) {
    const nextIndex = (i + 1) % numNotes;
    ctx.moveTo(coordinates[i].x, coordinates[i].y);
    ctx.lineTo(coordinates[nextIndex].x, coordinates[nextIndex].y);
    const nd = CommonMath.noteDistance(selectedNoteIndices[i], selectedNoteIndices[nextIndex]);
    ctx.strokeStyle = colorFromNoteDistance(nd);
    ctx.stroke();
  }
  ctx.closePath();

  emphasizeBaseNote(ctx, coordinates[0]);
}

function emphasizeBaseNote(
  ctx: CanvasRenderingContext2D,
  bassNoteCoords: { x: number; y: number },
) {
  const circleRadius = 5; // Adjust this value to change the size of the circle

  ctx.beginPath();
  ctx.arc(bassNoteCoords.x, bassNoteCoords.y, circleRadius, 0, 2 * Math.PI);
  ctx.fillStyle = getComputedColor("--root-note-highlight");
  ctx.fill();
  ctx.strokeStyle = getComputedColor("--key-border");
  ctx.stroke();
}
