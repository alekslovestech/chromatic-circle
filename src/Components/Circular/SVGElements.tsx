import { CartesianPoint, PolarMath } from "../../utils/PolarMath";
import { ActualIndex } from "../../types/IndexTypes";

export class SvgElements {
  // Basic SVG shapes
  static circle({
    cx,
    cy,
    radius,
    stroke,
    strokeWidth,
  }: {
    cx: number;
    cy: number;
    radius: number;
    stroke: string;
    strokeWidth?: string;
  }): JSX.Element {
    return (
      <circle cx={cx} cy={cy} r={radius} stroke={stroke} fill="none" strokeWidth={strokeWidth} />
    );
  }

  static polygon({
    points,
    stroke,
    strokeWidth = "2",
  }: {
    points: CartesianPoint[];
    stroke: string;
    strokeWidth?: string;
  }): JSX.Element {
    const pointsString = points.map((p) => `${p.x},${p.y}`).join(" ");
    return <polygon points={pointsString} fill="none" stroke={stroke} strokeWidth={strokeWidth} />;
  }

  // Musical-specific SVG elements
  static getArcPathFromIndex = (
    actualIndex: number,
    outerRadius: number,
    innerRadius: number,
  ): JSX.Element => {
    const { startAngle, endAngle } = PolarMath.NoteIndexToAngleRange(actualIndex);
    // Convert angles to cartesian coordinates
    const outerStart = PolarMath.getCartesianFromPolar(outerRadius, startAngle, true);
    const outerEnd = PolarMath.getCartesianFromPolar(outerRadius, endAngle, true);
    const innerStart = PolarMath.getCartesianFromPolar(innerRadius, startAngle, true);
    const innerEnd = PolarMath.getCartesianFromPolar(innerRadius, endAngle, true);

    // Create SVG path: move to outer start, arc to outer end, line to inner end, arc to inner start, close path
    const arcPath = [
      `M ${outerStart.x} ${outerStart.y}`, // Move to start
      `A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}`, // Outer arc
      `L ${innerEnd.x} ${innerEnd.y}`, // Line to inner
      `A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}`, // Inner arc
      "Z", // Close path
    ].join(" ");
    return <path d={arcPath} />;
  };
}
