import { ChromaticIndex } from "../../../types/ChromaticIndex";
import { CartesianPoint, PolarMath } from "./PolarMath";

export class ArcPathVisualizer {
  public static readonly ROMAN_POINT_COEFFICIENT = 0.85;

  public static getTextPoint(
    chromaticIndex: ChromaticIndex,
    outerRadius: number,
    innerRadius: number,
  ): CartesianPoint {
    const middleAngle = PolarMath.NoteIndexToMiddleAngle(chromaticIndex);
    return PolarMath.getCartesianFromPolar((innerRadius + outerRadius) * 0.5, middleAngle);
  }

  public static getArcPathData(
    chromaticIndex: ChromaticIndex,
    outerRadius: number,
    innerRadius: number,
  ): string {
    const [outerStart, outerEnd, innerEnd, innerStart] = this.getArcPoints(
      chromaticIndex,
      outerRadius,
      innerRadius,
    );

    // Create SVG path: move to outer start, arc to outer end, line to inner end, arc to inner start, close path
    return [
      `M ${outerStart.x} ${outerStart.y}`, // Move to start
      `A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}`, // Outer arc
      `L ${innerEnd.x} ${innerEnd.y}`, // Line to inner
      `A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}`, // Inner arc
      "Z", // Close path
    ].join(" ");
  }

  private static getArcPoints(
    chromaticIndex: ChromaticIndex,
    outerRadius: number,
    innerRadius: number,
  ): CartesianPoint[] {
    const { startAngle, endAngle } = PolarMath.NoteIndexToAngleRange(chromaticIndex);
    // Convert angles to cartesian coordinates
    const outerStart = PolarMath.getCartesianFromPolar(outerRadius, startAngle, true);
    const outerEnd = PolarMath.getCartesianFromPolar(outerRadius, endAngle, true);
    const innerStart = PolarMath.getCartesianFromPolar(innerRadius, startAngle, true);
    const innerEnd = PolarMath.getCartesianFromPolar(innerRadius, endAngle, true);

    return [outerStart, outerEnd, innerEnd, innerStart];
  }
}
