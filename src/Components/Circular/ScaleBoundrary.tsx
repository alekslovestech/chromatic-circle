import React from "react";
import { ActualIndex } from "../../types/IndexTypes";
import { CartesianPoint, PolarMath } from "../../utils/Circular/PolarMath";
import { MusicalKey } from "../../types/MusicalKey";
import "../../styles/CircularVis.css";

export class ScaleBoundrary {
  static draw(
    selectedMusicalKey: MusicalKey,
    innerRadius: number,
    outerRadius: number,
  ): JSX.Element[] {
    const lineCartesianPoints = this.getLineCartesianPoints(
      selectedMusicalKey,
      innerRadius,
      outerRadius,
    );

    return [
      <line
        className="selected-notes-polygon"
        key="scale-boundrary"
        x1={lineCartesianPoints[0].x}
        y1={lineCartesianPoints[0].y}
        x2={lineCartesianPoints[1].x}
        y2={lineCartesianPoints[1].y}
        stroke="currentColor"
        strokeWidth="2"
      />,
    ];
  }

  private static getLineCartesianPoints(
    selectedMusicalKey: MusicalKey,
    innerRadius: number,
    outerRadius: number,
  ): CartesianPoint[] {
    const lineCartesianPoints = [];
    const tonicIndex = selectedMusicalKey.tonicIndex;

    const { startAngle: startOfTonicAngle } = PolarMath.NoteIndexToAngleRange(tonicIndex);
    const point_start: CartesianPoint = PolarMath.getCartesianFromPolar(
      innerRadius,
      startOfTonicAngle,
      true,
    );

    const point_end: CartesianPoint = PolarMath.getCartesianFromPolar(
      outerRadius * 1.5,
      startOfTonicAngle,
      true,
    );
    lineCartesianPoints.push(point_start);
    lineCartesianPoints.push(point_end);

    return lineCartesianPoints;
  }
}
