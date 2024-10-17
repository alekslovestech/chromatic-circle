import { ActualIndex } from "../types/IndexTypes";
import { TWELVE } from "../types/NoteConstants";
import { getComputedColor } from "../utils/ColorUtils";
import { CommonMath } from "../utils/CommonMath";
import { PolarMath } from "../utils/PolarMath";
import { CircularVisMode } from "./CircularVisualizations";

const SVG_URL = "http://www.w3.org/2000/svg";

export function drawCircularVisualizationsSVG(
  selectedNoteIndices: ActualIndex[],
  circularVisMode: CircularVisMode,
  innerRadius: number,
) {
  // Remove existing lines
  const svgElement = document.querySelector(".keyboard-pieslice");
  if (svgElement) {
    svgElement.querySelectorAll(".selected-note-line").forEach((el) => el.remove());
  }

  // Only draw visualizations if there's more than one selected note
  if (selectedNoteIndices.length > 1) {
    if (circularVisMode === CircularVisMode.Arrows)
      drawSelectedNotesArrows(selectedNoteIndices, innerRadius);
    else if (circularVisMode === CircularVisMode.Polygon)
      drawSelectedNotesPolygon(selectedNoteIndices, innerRadius);
  }
}

function drawSelectedNotesArrows(selectedNoteIndices: ActualIndex[], innerRadius: number) {
  const numNotes = selectedNoteIndices.length;
  if (numNotes < 2) return;
  const svgElement = document.querySelector(".keyboard-pieslice");
  if (!svgElement) return;

  // Remove existing lines
  svgElement.querySelectorAll(".selected-note-line").forEach((el) => el.remove());

  selectedNoteIndices.forEach((index) => {
    const { middleAngle } = CommonMath.NoteIndexToAngles(index);
    const innerPoint = PolarMath.getCartesianFromPolar(innerRadius, middleAngle);

    const path = document.createElementNS(SVG_URL, "path");
    path.setAttribute("d", `M0,0 L${innerPoint.x},${innerPoint.y}`);
    path.setAttribute("stroke", getComputedColor("--key-border"));
    path.setAttribute("stroke-width", "2");
    path.classList.add("selected-note-line");

    svgElement.appendChild(path);
  });

  // Emphasize the base note
  if (selectedNoteIndices.length === 0) return;

  const baseIndex = selectedNoteIndices[0];
  const { middleAngle } = CommonMath.NoteIndexToAngles(baseIndex);
  const innerPoint = PolarMath.getCartesianFromPolar(innerRadius, middleAngle);

  const circle = document.createElementNS(SVG_URL, "circle");
  circle.setAttribute("cx", innerPoint.x.toString());
  circle.setAttribute("cy", innerPoint.y.toString());
  circle.setAttribute("r", "5");
  circle.setAttribute("fill", getComputedColor("--root-note-highlight"));
  circle.setAttribute("stroke", getComputedColor("--key-border"));
  circle.setAttribute("stroke-width", "1");
  circle.classList.add("selected-note-line");

  svgElement.appendChild(circle);
}

function drawSelectedNotesPolygon(selectedNoteIndices: ActualIndex[], innerRadius: number) {
  const numNotes = selectedNoteIndices.length;
  const svgElement = document.querySelector(".keyboard-pieslice");
  if (!svgElement || numNotes < 2) return;

  // Remove existing lines
  svgElement.querySelectorAll(".selected-note-line").forEach((el) => el.remove());

  const theEnd = numNotes === 2 ? 1 : numNotes; // intervals don't wrap around, but chords do

  for (let i = 0; i < theEnd; i++) {
    const currentIndex = selectedNoteIndices[i];
    const nextIndex = selectedNoteIndices[(i + 1) % numNotes];

    const { middleAngle: middleAngleCur } = CommonMath.NoteIndexToAngles(currentIndex);

    const { middleAngle: middleAngleNext } = CommonMath.NoteIndexToAngles(nextIndex);

    const startPoint = PolarMath.getCartesianFromPolar(innerRadius, middleAngleCur);
    const endPoint = PolarMath.getCartesianFromPolar(innerRadius, middleAngleNext);

    const path = document.createElementNS(SVG_URL, "path");
    path.setAttribute("d", `M${startPoint.x},${startPoint.y} L${endPoint.x},${endPoint.y}`);

    const noteDistance = CommonMath.noteDistance(currentIndex, nextIndex);
    const hue = (noteDistance / TWELVE) * 240; // Map note distance from red (0) to blue (240)
    path.setAttribute("stroke", `hsl(${hue}, 100%, 50%)`);

    path.setAttribute("stroke-width", "2");
    path.classList.add("selected-note-line");

    svgElement.appendChild(path);
  }

  // Emphasize the base note
  if (selectedNoteIndices.length > 0) {
    const baseIndex = selectedNoteIndices[0];
    const { middleAngle } = CommonMath.NoteIndexToAngles(baseIndex);
    const innerPoint = PolarMath.getCartesianFromPolar(innerRadius, middleAngle);

    const circle = document.createElementNS(SVG_URL, "circle");
    circle.setAttribute("cx", innerPoint.x.toString());
    circle.setAttribute("cy", innerPoint.y.toString());
    circle.setAttribute("r", "5");
    circle.setAttribute("fill", getComputedColor("--root-note-highlight"));
    circle.setAttribute("stroke", getComputedColor("--key-border"));
    circle.setAttribute("stroke-width", "1");
    circle.classList.add("selected-note-line");

    svgElement.appendChild(circle);
  }
}
