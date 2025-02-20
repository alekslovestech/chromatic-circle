import { ActualIndex } from "../../types/IndexTypes";
import { PolarMath } from "./PolarMath";
import { CartesianPoint } from "./PolarMath";

export class NoteIndexVisualizer {
  constructor(
    private readonly radius: number,
    private readonly center: CartesianPoint = { x: 0, y: 0 },
  ) {}

  getRadialVisualization = (indices: ActualIndex[]): CartesianPoint[] =>
    indices.flatMap((index) => {
      const point = this.getCartesianFromIndex(index);
      return [this.center, point];
    });

  getPolygonVisualization = (indices: ActualIndex[]): CartesianPoint[] =>
    indices.map((index) => this.getCartesianFromIndex(index));

  private getCartesianFromIndex(index: ActualIndex): CartesianPoint {
    const middleAngle = PolarMath.NoteIndexToMiddleAngle(index);
    return PolarMath.getCartesianFromPolarWithOffset(this.center, this.radius, middleAngle, true);
  }
}
