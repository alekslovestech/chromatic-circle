import React from "react";
import { ActualIndex } from "../../../../src/types/IndexTypes";
import { CircularVisMode } from "../../../../src/types/SettingModes";
import { PolarMath } from "../../../../src/utils/Keyboard/Circular/PolarMath";
import { NoteIndexVisualizer } from "../../../../src/utils/Keyboard/Circular/NoteIndexVisualizer";

import "../../../styles/CircularVis.css";

const DOT_RADIUS = 6;
export class CircularVisualizations {
  static draw(
    selectedNoteIndices: ActualIndex[],
    circularVisMode: CircularVisMode,
    innerRadius: number,
    color: string,
  ): JSX.Element[] {
    if (selectedNoteIndices.length <= 1) return [];

    if (circularVisMode === CircularVisMode.None) return [];

    const realInnerRadius =
      circularVisMode === CircularVisMode.Polygon ? innerRadius * 0.95 : innerRadius;
    const visualizer = new NoteIndexVisualizer(realInnerRadius);

    const baseNoteDot = this.drawBaseNoteDot(selectedNoteIndices, innerRadius);
    const polyPoints = visualizer.getVisualization(selectedNoteIndices, circularVisMode);

    return [
      <polygon
        className="selected-notes-polygon"
        key="circularVis"
        stroke={color}
        points={polyPoints.map((p) => `${p.x},${p.y}`).join(" ")}
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
        className="base-note-dot"
        key="base-note"
        cx={innerPoint.x}
        cy={innerPoint.y}
        r={DOT_RADIUS}
      />
    );
  }
}
