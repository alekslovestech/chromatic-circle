import { ActualIndex } from "../../types/IndexTypes";
import { CircularVisMode } from "./CircularVisMode";
import { PolarMath } from "./PolarMath";
import { CartesianPoint } from "./PolarMath";

export class NoteIndexVisualizer {
  constructor(
    private readonly radius: number,
    private readonly center: CartesianPoint = { x: 0, y: 0 },
  ) {}

  getVisualization = (indices: ActualIndex[], mode: CircularVisMode): CartesianPoint[] => {
    switch (mode) {
      case CircularVisMode.Radial:
        return indices.flatMap((index) => {
          const point = this.getCartesianFromIndex(index);
          return [this.center, point];
        });
      case CircularVisMode.Polygon:
        return indices.map((index) => this.getCartesianFromIndex(index));
      default:
        return [];
    }
  };

  private getCartesianFromIndex(index: ActualIndex): CartesianPoint {
    const middleAngle = PolarMath.NoteIndexToMiddleAngle(index);
    return PolarMath.getCartesianFromPolarWithOffset(this.center, this.radius, middleAngle, true);
  }
}
