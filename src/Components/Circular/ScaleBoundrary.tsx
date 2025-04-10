import React from "react";
import { CartesianPoint, PolarMath } from "../../utils/Circular/PolarMath";
import { MusicalKey } from "../../types/Keys/MusicalKey";
import "../../styles/CircularVis.css";

export class ScaleBoundrary {
  static draw(
    selectedMusicalKey: MusicalKey,
    innerRadius: number,
    outerRadius: number,
  ): JSX.Element[] {
    const [point_start, point_end] = this.getLineCartesianPoints(
      selectedMusicalKey,
      innerRadius,
      outerRadius,
    );

    return [
      <line
        className="scale-boundary-line"
        key="scale-boundrary"
        x1={point_start.x}
        y1={point_start.y}
        x2={point_end.x}
        y2={point_end.y}
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
    const tonicIndex = selectedMusicalKey.tonicIndex;

    const COEFF = 1.05;
    const { startAngle: startOfTonicAngle } = PolarMath.NoteIndexToAngleRange(tonicIndex);
    const point_start: CartesianPoint = PolarMath.getCartesianFromPolar(
      innerRadius / COEFF,
      startOfTonicAngle,
      true,
    );

    const point_end: CartesianPoint = PolarMath.getCartesianFromPolar(
      outerRadius * COEFF,
      startOfTonicAngle,
      true,
    );

    return [point_start, point_end];
  }
}
