import { CartesianPoint, PolarMath } from "../../utils/PolarMath";
import { SvgElements } from "./SVGElements";

export class CircularVisIcons {
  readonly innerRadius: number;
  readonly circleDiameter: number;
  private circleRadius: number;

  constructor(circleRadius: number, innerRadius: number) {
    this.circleRadius = circleRadius;
    this.innerRadius = innerRadius;
    this.circleDiameter = 2 * this.circleRadius;

    this.center = {
      x: this.circleRadius,
      y: this.circleRadius,
    };
    const angle0 = PolarMath.NoteIndexToMiddleAngle(11);
    const angle1 = PolarMath.NoteIndexToMiddleAngle(3);
    const angle2 = PolarMath.NoteIndexToMiddleAngle(7);
    this.coor0 = this.getCartesianFromAngle(angle0);
    this.coor1 = this.getCartesianFromAngle(angle1);
    this.coor2 = this.getCartesianFromAngle(angle2);
  }

  private getCartesianFromAngle = (angle: number): CartesianPoint =>
    PolarMath.getCartesianFromPolarWithOffset(this.center, this.innerRadius, angle, true);

  renderCircle = (strokeColor: string): JSX.Element => (
    <SvgElements.circle
      cx={this.circleRadius}
      cy={this.circleRadius}
      radius={this.innerRadius}
      stroke={strokeColor}
      strokeWidth="1"
    />
  );

  renderRadialPoints = (strokeColor: string): JSX.Element => (
    <SvgElements.polygon
      points={[this.center, this.coor0, this.center, this.coor1, this.center, this.coor2]}
      stroke={strokeColor}
      strokeWidth="2"
    />
  );

  renderPolygonPoints = (strokeColor: string): JSX.Element => (
    <SvgElements.polygon
      points={[this.coor0, this.coor1, this.coor2]}
      stroke={strokeColor}
      strokeWidth="2"
    />
  );

  private center: CartesianPoint;
  private coor0: CartesianPoint;
  private coor1: CartesianPoint;
  private coor2: CartesianPoint;
}
