import React from "react";
import { ChromaticIndex } from "../../../types/ChromaticIndex";
import { LinearKeyboardUtils } from "../../../utils/LinearKeyboardUtils";

import "../../../styles/KeyboardBase.css";

const CIRCLE_RADIUS = 5;
export class ScaleBoundraryLinear {
  static draw(tonicIndex: ChromaticIndex): JSX.Element[] {
    const { x1, x2 } = LinearKeyboardUtils.calculateScaleBoundaryPercentages(tonicIndex);

    const startY = "85%";
    const endY = "100%";
    const circleCenterY = "110%";
    // Apply the heights to both boundary lines
    const line1_start = { x: `${x1}%`, y: startY };
    const line1_end = { x: `${x1}%`, y: endY };
    const line2_start = { x: `${x2}%`, y: startY };
    const line2_end = { x: `${x2}%`, y: endY };
    // Create a vertical line at the tonic position - in both scales

    return [
      <line
        className="scale-boundary linear"
        key="scale-boundrary-left"
        x1={line1_start.x}
        y1={line1_start.y}
        x2={line1_end.x}
        y2={line1_end.y}
      />,
      <circle
        key="scale-boundrary-left-circle"
        cx={line1_start.x}
        cy={circleCenterY}
        r={CIRCLE_RADIUS}
        fill="none"
        stroke="currentColor"
      />,
      <line
        className="scale-boundary linear"
        key="scale-boundrary-right"
        x1={line2_start.x}
        y1={line2_start.y}
        x2={line2_end.x}
        y2={line2_end.y}
      />,
    ];
  }
}
