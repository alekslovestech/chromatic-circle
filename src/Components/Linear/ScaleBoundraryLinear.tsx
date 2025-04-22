import React from "react";
import { ChromaticIndex } from "../../types/ChromaticIndex";
import { WHITE_KEYS_PER_OCTAVE, WHITE_KEYS_PER_2OCTAVES } from "../../types/NoteConstants";
import "../../styles/KeyboardLinear.css";

export class ScaleBoundraryLinear {
  static draw(tonicIndex: ChromaticIndex): JSX.Element[] {
    // Map chromatic indices to white key positions (0-6)
    const whiteKeyPositions = [0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6];

    // Calculate the x position as a percentage of the container width
    const position = whiteKeyPositions[tonicIndex];
    const xPercent1 = (position / WHITE_KEYS_PER_2OCTAVES) * 100;
    const xPercent2 = ((position + WHITE_KEYS_PER_OCTAVE) / WHITE_KEYS_PER_2OCTAVES) * 100;

    // Create a vertical line at the tonic position - in both scales
    const line1_start = { x: `${xPercent1}%`, y: "0%" };
    const line1_end = { x: `${xPercent1}%`, y: "100%" };
    const line2_start = { x: `${xPercent2}%`, y: "0%" };
    const line2_end = { x: `${xPercent2}%`, y: "100%" };

    return [
      <line
        className="scale-boundary-line"
        key="scale-boundrary-left"
        x1={line1_start.x}
        y1={line1_start.y}
        x2={line1_end.x}
        y2={line1_end.y}
      />,
      <line
        className="scale-boundary-line"
        key="scale-boundrary-right"
        x1={line2_start.x}
        y1={line2_start.y}
        x2={line2_end.x}
        y2={line2_end.y}
      />,
    ];
  }
}
