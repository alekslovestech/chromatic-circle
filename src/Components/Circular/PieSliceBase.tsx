import React from "react";
import { ActualIndex } from "../../types/IndexTypes";
import { CommonMath } from "../../utils/CommonMath";
import { PolarMath } from "../../utils/PolarMath";

export interface PieSliceBaseProps {
  actualIndex: ActualIndex;
  outerRadius: number;
  innerRadius: number;
  className?: string;
  onClick?: () => void;
  showText?: boolean;
  children?: React.ReactNode;
}

const getArcPath = (
  startAngle: number,
  endAngle: number,
  outerRadius: number,
  innerRadius: number,
): string => {
  // Convert angles to cartesian coordinates
  const outerStart = PolarMath.getCartesianFromPolar(outerRadius, startAngle);
  const outerEnd = PolarMath.getCartesianFromPolar(outerRadius, endAngle);
  const innerStart = PolarMath.getCartesianFromPolar(innerRadius, startAngle);
  const innerEnd = PolarMath.getCartesianFromPolar(innerRadius, endAngle);

  // Create SVG path: move to outer start, arc to outer end, line to inner end, arc to inner start, close path
  return [
    `M ${outerStart.x} ${outerStart.y}`, // Move to start
    `A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}`, // Outer arc
    `L ${innerEnd.x} ${innerEnd.y}`, // Line to inner
    `A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}`, // Inner arc
    "Z", // Close path
  ].join(" ");
};

const PieSliceBase: React.FC<PieSliceBaseProps> = ({
  actualIndex,
  outerRadius,
  innerRadius,
  className = "",
  onClick,
  children,
}) => {
  const { startAngle, endAngle } = CommonMath.NoteIndexToAngles(actualIndex);
  const path = getArcPath(startAngle, endAngle, outerRadius, innerRadius);

  return (
    <g className={className} onClick={onClick}>
      <path d={path} />
      {children}
    </g>
  );
};

export default PieSliceBase;
