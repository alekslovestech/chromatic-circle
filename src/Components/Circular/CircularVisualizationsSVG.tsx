import React from "react";
import { ActualIndex } from "../../types/IndexTypes";
import { getComputedColor } from "../../utils/ColorUtils";
import { PolarMath } from "../../utils/PolarMath";
import { CircularVisMode } from "./CircularVisMode";
const STROKE_WIDTH_LINES = 6;
const DOT_RADIUS = 6;

export function drawCircularVisualizations(
  selectedNoteIndices: ActualIndex[],
  circularVisMode: CircularVisMode,
  innerRadius: number,
): JSX.Element[] {
  if (selectedNoteIndices.length <= 1) return [];

  if (circularVisMode === CircularVisMode.None) return [];
  const baseNoteDot = drawBaseNoteDot(selectedNoteIndices, innerRadius);
  const visualizations =
    circularVisMode === CircularVisMode.Radial
      ? drawSelectedNotesArrows(selectedNoteIndices, innerRadius)
      : drawSelectedNotesPolygon(selectedNoteIndices, innerRadius);

  return [...visualizations, baseNoteDot];
}

function drawBaseNoteDot(selectedNoteIndices: ActualIndex[], innerRadius: number): JSX.Element {
  const baseIndex = selectedNoteIndices[0];
  const middleAngle = PolarMath.NoteIndexToMiddleAngle(baseIndex);
  const innerPoint = PolarMath.getCartesianFromPolar(innerRadius, middleAngle, true);
  return (
    <circle
      key="base-note"
      cx={innerPoint.x}
      cy={innerPoint.y}
      r={DOT_RADIUS}
      fill={getComputedColor("--root-note-highlight")}
      stroke={getComputedColor("--serenity-polygon-stroke")}
      strokeWidth={1}
      className="selected-note-line"
    />
  );
}

function drawSelectedNotesArrows(
  selectedNoteIndices: ActualIndex[],
  innerRadius: number,
): JSX.Element[] {
  return selectedNoteIndices.map((index, i) => {
    const middleAngle = PolarMath.NoteIndexToMiddleAngle(index);
    const innerPoint = PolarMath.getCartesianFromPolar(innerRadius, middleAngle, true);
    return (
      <path
        key={i}
        d={`M0,0 L${innerPoint.x},${innerPoint.y}`}
        stroke={getComputedColor("--serenity-polygon-stroke")}
        strokeWidth={STROKE_WIDTH_LINES}
        strokeLinecap="round"
        className="selected-note-line"
      />
    );
  });
}

function drawSelectedNotesPolygon(
  selectedNoteIndices: ActualIndex[],
  innerRadius: number,
): JSX.Element[] {
  const points = selectedNoteIndices
    .map((index) => {
      const middleAngle = PolarMath.NoteIndexToMiddleAngle(index);
      const point = PolarMath.getCartesianFromPolar(innerRadius, middleAngle, true);
      return `${point.x},${point.y}`;
    })
    .join(" ");

  return [
    <polygon
      key="polygon"
      points={points}
      fill="none"
      stroke={getComputedColor("--serenity-polygon-stroke")}
      strokeWidth={STROKE_WIDTH_LINES}
      strokeLinecap="round"
      className="selected-note-polygon"
    />,
  ];
}
