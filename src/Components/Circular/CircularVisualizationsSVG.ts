import { ActualIndex } from "../../types/IndexTypes";
import { getComputedColor } from "../../utils/ColorUtils";
import { PolarMath } from "../../utils/PolarMath";
import { CircularVisMode } from "./CircularVisMode";
const SVG_URL = "http://www.w3.org/2000/svg";
const STROKE_WIDTH_LINES = 6;
const DOT_RADIUS = 6;

export function drawCircularVisualizationsSVG(
  selectedNoteIndices: ActualIndex[],
  circularVisMode: CircularVisMode,
  innerRadius: number,
) {
  // Remove existing lines
  const svgElement = document.querySelector(".svg-container");
  if (svgElement) {
    svgElement.querySelectorAll(".selected-note-line").forEach((el) => el.remove());
  }

  // Only draw visualizations if there's more than one selected note
  if (selectedNoteIndices.length > 1) {
    if (circularVisMode === CircularVisMode.Radial)
      drawSelectedNotesArrows(selectedNoteIndices, innerRadius);
    else if (circularVisMode === CircularVisMode.Polygon)
      drawSelectedNotesPolygon(selectedNoteIndices, innerRadius);
  }
}

function drawSelectedNotesArrows(selectedNoteIndices: ActualIndex[], innerRadius: number) {
  const numNotes = selectedNoteIndices.length;
  if (numNotes < 2) return;
  const svgElement = document.querySelector(".svg-container");
  if (!svgElement) return;

  // Remove existing lines
  svgElement.querySelectorAll(".selected-note-line").forEach((el) => el.remove());

  selectedNoteIndices.forEach((index) => {
    const middleAngle = PolarMath.NoteIndexToMiddleAngle(index);
    const innerPoint = PolarMath.getCartesianFromPolar(innerRadius, middleAngle, true);

    const path = document.createElementNS(SVG_URL, "path");
    path.setAttribute("d", `M0,0 L${innerPoint.x},${innerPoint.y}`);
    path.setAttribute("stroke", getComputedColor("--serenity-polygon-stroke"));
    path.setAttribute("stroke-width", STROKE_WIDTH_LINES.toString());
    path.setAttribute("stroke-linecap", "round"); // Add rounded corners
    path.classList.add("selected-note-line");

    svgElement.appendChild(path);
  });

  // Emphasize the base note
  if (selectedNoteIndices.length === 0) return;

  const baseIndex = selectedNoteIndices[0];
  const middleAngle = PolarMath.NoteIndexToMiddleAngle(baseIndex);
  const innerPoint = PolarMath.getCartesianFromPolar(innerRadius, middleAngle, true);

  const circle = document.createElementNS(SVG_URL, "circle");
  circle.setAttribute("cx", innerPoint.x.toString());
  circle.setAttribute("cy", innerPoint.y.toString());
  circle.setAttribute("r", DOT_RADIUS.toString());
  circle.setAttribute("fill", getComputedColor("--root-note-highlight"));
  circle.setAttribute("stroke", getComputedColor("--serenity-polygon-stroke"));
  circle.setAttribute("stroke-width", "1");
  circle.classList.add("selected-note-line");

  svgElement.appendChild(circle);
}

function drawSelectedNotesPolygon(selectedNoteIndices: ActualIndex[], innerRadius: number) {
  const numNotes = selectedNoteIndices.length;
  const svgElement = document.querySelector(".svg-container");
  if (!svgElement || numNotes < 2) return;

  // Remove existing lines
  svgElement.querySelectorAll(".selected-note-line").forEach((el) => el.remove());

  const theEnd = numNotes === 2 ? 1 : numNotes; // intervals don't wrap around, but chords do

  for (let i = 0; i < theEnd; i++) {
    const currentIndex = selectedNoteIndices[i];
    const nextIndex = selectedNoteIndices[(i + 1) % numNotes];

    const middleAngleCur = PolarMath.NoteIndexToMiddleAngle(currentIndex);

    const middleAngleNext = PolarMath.NoteIndexToMiddleAngle(nextIndex);

    const startPoint = PolarMath.getCartesianFromPolar(innerRadius, middleAngleCur, true);
    const endPoint = PolarMath.getCartesianFromPolar(innerRadius, middleAngleNext, true);

    const path = document.createElementNS(SVG_URL, "path");
    path.setAttribute("d", `M${startPoint.x},${startPoint.y} L${endPoint.x},${endPoint.y}`);

    path.setAttribute("stroke", getComputedColor("--serenity-polygon-stroke")); // Use grey color at all times
    path.setAttribute("stroke-width", STROKE_WIDTH_LINES.toString());
    path.setAttribute("stroke-linecap", "round"); // Add rounded corners
    path.classList.add("selected-note-line");

    svgElement.appendChild(path);
  }

  // Emphasize the base note
  if (selectedNoteIndices.length > 0) {
    const baseIndex = selectedNoteIndices[0];
    const middleAngle = PolarMath.NoteIndexToMiddleAngle(baseIndex);
    const innerPoint = PolarMath.getCartesianFromPolar(innerRadius, middleAngle, true);

    const circle = document.createElementNS(SVG_URL, "circle");
    circle.setAttribute("cx", innerPoint.x.toString());
    circle.setAttribute("cy", innerPoint.y.toString());
    circle.setAttribute("r", DOT_RADIUS.toString());
    circle.setAttribute("fill", getComputedColor("--root-note-highlight"));
    circle.setAttribute("stroke", getComputedColor("--key-border"));
    circle.setAttribute("stroke-width", "1");
    circle.classList.add("selected-note-line");

    svgElement.appendChild(circle);
  }
}
