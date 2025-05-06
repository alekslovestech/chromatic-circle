import { ChromaticIndex } from "../../../types/ChromaticIndex";
import { ActualIndex } from "../../../types/IndexTypes";
import { CircularVisMode } from "../../../types/SettingModes";
import { CartesianPoint } from "./PolarMath";
import { PolarMath } from "./PolarMath";

export class NoteIndexVisualizer {
  constructor(
    private readonly radius: number,
    private readonly center: CartesianPoint = { x: 0, y: 0 },
  ) {}

  getVisualization(indices: ActualIndex[], mode: CircularVisMode): CartesianPoint[] {
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
  }

  private getCartesianFromIndex(index: ChromaticIndex | ActualIndex): CartesianPoint {
    const middleAngle = PolarMath.NoteIndexToMiddleAngle(index);
    const cartPoint = PolarMath.getCartesianFromPolar(this.radius, middleAngle, true);
    return { x: cartPoint.x + this.center.x, y: cartPoint.y + this.center.y };
  }
}
