import React from "react";
import { ActualIndex } from "../../types/IndexTypes";
import { getComputedColor } from "../../utils/ColorUtils";
import { PolarMath } from "../../utils/PolarMath";
import { CircularVisMode } from "./CircularVisMode";
import { NoteIndexVisualizer } from "./NoteIndexVisualizer";

const STROKE_WIDTH = 6;
const DOT_RADIUS = 6;
export class CircularVisualizations {
  static draw(
    selectedNoteIndices: ActualIndex[],
    circularVisMode: CircularVisMode,
    innerRadius: number,
  ): JSX.Element[] {
    if (selectedNoteIndices.length <= 1) return [];

    if (circularVisMode === CircularVisMode.None) return [];

    const visualizer = new NoteIndexVisualizer(innerRadius);

    const baseNoteDot = this.drawBaseNoteDot(selectedNoteIndices, innerRadius);
    const polyPoints =
      circularVisMode === CircularVisMode.Radial
        ? visualizer.getRadialVisualization(selectedNoteIndices)
        : visualizer.getPolygonVisualization(selectedNoteIndices);

    return [
      <polygon
        key="circularVis"
        points={polyPoints.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke={getComputedColor("--serenity-polygon-stroke")}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        className="selected-notes-polygon"
      />,
      baseNoteDot,
    ];
  }

  private static drawBaseNoteDot(
    selectedNoteIndices: ActualIndex[],
    innerRadius: number,
  ): JSX.Element {
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
        className="base-note-dot"
      />
    );
  }
}
