import React from "react";
import "../styles/KeyboardPieSlice.css";
import { TWELVE } from "../types/NoteConstants";

const INNER_RADIUS = 50; // Inner radius for the slices
const OUTER_RADIUS = 100; // Outer radius for the slices

interface PieSliceProps {
  index: number;
  onClick: () => void;
}

const PieSlice: React.FC<PieSliceProps> = ({ index, onClick }) => {
  const sliceAngle = (2 * Math.PI) / TWELVE; // Angle for each slice
  const startAngle = index * sliceAngle;
  const endAngle = startAngle + sliceAngle;

  // Convert polar coordinates to Cartesian for the SVG path
  const x1 = OUTER_RADIUS * Math.cos(startAngle);
  const y1 = OUTER_RADIUS * Math.sin(startAngle);
  const x2 = OUTER_RADIUS * Math.cos(endAngle);
  const y2 = OUTER_RADIUS * Math.sin(endAngle);
  console.log(x1, y1, x2, y2);

  const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

  // Path for each slice
  const pathData = [
    `M ${INNER_RADIUS} 0`, // Move to the inner radius
    `L ${x1} ${y1}`, // Draw line to outer radius (start angle)
    `A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 ${largeArcFlag} 1 ${x2} ${y2}`, // Draw arc
    `L 0 0`, // Line back to center (inner circle)
    "Z", // Close the path
  ].join(" ");

  return <path d={pathData} className={`slice slice-${index}`} onClick={onClick} />;
};

const KeyboardPieSlice: React.FC = () => {
  const handleClick = (index: number) => {
    console.log(`Slice ${index + 1} clicked!`);
  };

  return (
    <svg width="300" height="300" viewBox="-150 -150 300 300" className="pie-slice-keyboard">
      {Array.from({ length: 1 }).map((_, index) => (
        <PieSlice key={index} index={index} onClick={() => handleClick(index)} />
      ))}
    </svg>
  );
};

export default KeyboardPieSlice;
