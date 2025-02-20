import { CartesianPoint } from "../../utils/PolarMath";
import { NoteIndexVisualizer } from "../../utils/NoteIndexVisualizer";
import { ixActualArray } from "../../types/IndexTypes";

export class CircularVisIcons {
  readonly innerRadius: number;
  readonly circleDiameter: number;
  private circleRadius: number;
  private center: CartesianPoint;
  private readonly visualizer: NoteIndexVisualizer;

  constructor(circleRadius: number, innerRadius: number) {
    this.circleRadius = circleRadius;
    this.innerRadius = innerRadius;
    this.circleDiameter = 2 * this.circleRadius;

    this.center = { x: this.circleRadius, y: this.circleRadius };
    this.visualizer = new NoteIndexVisualizer(innerRadius, this.center);
  }

  renderCircle = (strokeColor: string): JSX.Element => (
    <circle
      cx={this.circleRadius}
      cy={this.circleRadius}
      r={this.innerRadius}
      stroke={strokeColor}
      fill="none"
      strokeWidth="1"
    />
  );

  renderRadialPoints = (strokeColor: string): JSX.Element => {
    const points = this.visualizer.getRadialVisualization(ixActualArray([11, 3, 7]));
    return (
      <polyline
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
      />
    );
  };

  renderPolygonPoints = (strokeColor: string): JSX.Element => {
    const points = this.visualizer.getPolygonVisualization(ixActualArray([11, 3, 7]));
    return (
      <polygon
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
      />
    );
  };
}
