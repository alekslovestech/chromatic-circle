import { CartesianPoint } from "../../utils/Circular/PolarMath";
import { NoteIndexVisualizer } from "../../utils/Circular/NoteIndexVisualizer";
import { ixActualArray } from "../../types/IndexTypes";
import { CircularVisMode } from "../../utils/Circular/CircularVisMode";

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

  private getColor = (isSelected: boolean) => (isSelected ? "white" : "black");

  private getStrokeOpacity = (isSelected: boolean) => (isSelected ? "1" : "0.4");

  render(mode: CircularVisMode, selectedMode: CircularVisMode): JSX.Element {
    const isSelected = mode === selectedMode;
    return mode === CircularVisMode.None
      ? this.renderCircle(isSelected)
      : this.renderPoints(isSelected, mode);
  }

  private renderCircle = (isSelected: boolean): JSX.Element => {
    return (
      <circle
        cx={this.circleRadius}
        cy={this.circleRadius}
        r={this.innerRadius}
        stroke={this.getColor(isSelected)}
        fill="none"
        strokeWidth="2"
        strokeOpacity={this.getStrokeOpacity(isSelected)}
      />
    );
  };

  private renderPoints = (isSelected: boolean, mode: CircularVisMode): JSX.Element => {
    const points = this.visualizer.getVisualization(ixActualArray([11, 3, 7]), mode);
    const pointsString = points.map((p) => `${p.x},${p.y}`).join(" ");
    return (
      <polygon
        points={pointsString}
        fill="none"
        stroke={this.getColor(isSelected)}
        strokeWidth="2.5"
        strokeOpacity={this.getStrokeOpacity(isSelected)}
      />
    );
  };
}
