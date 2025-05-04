import React from "react";
import { CartesianPoint, PolarMath } from "../../../utils/Circular/PolarMath";
import { MusicalKey } from "../../../types/Keys/MusicalKey";

import "../../../styles/KeyboardBase.css";

const CIRCLE_RADIUS = 3;
export class ScaleBoundraryCircular {
  static draw(
    selectedMusicalKey: MusicalKey,
    innerRadius: number,
    outerRadius: number,
  ): JSX.Element[] {
    const [point_start, point_end] = this.getLineCartesianPoints(
      selectedMusicalKey,
      innerRadius,
      outerRadius * 0.95,
    );

    const { startAngle: startOfTonicAngle } = PolarMath.NoteIndexToAngleRange(
      selectedMusicalKey.tonicIndex,
    );
    const point_end_circle = PolarMath.getCartesianFromPolar(
      outerRadius + CIRCLE_RADIUS,
      startOfTonicAngle,
      true,
    );

    return [
      <div className="scale-boundary-circular" key="scale-boundrary-circular">
        <line x1={point_start.x} y1={point_start.y} x2={point_end.x} y2={point_end.y} />
        <circle
          cx={point_end_circle.x}
          cy={point_end_circle.y}
          r={CIRCLE_RADIUS}
          fill="none"
          stroke="currentColor"
        />
      </div>,
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
