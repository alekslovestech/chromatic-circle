import { CommonMath } from "../../utils/CommonMath";
import { CartesianPoint, PolarMath } from "../../utils/PolarMath";

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
    const angle0 = CommonMath.NoteIndexToAngles(11).middleAngle;
    const angle1 = CommonMath.NoteIndexToAngles(3).middleAngle;
    const angle2 = CommonMath.NoteIndexToAngles(7).middleAngle;
    this.coor0 = this.getCartesianFromAngle(angle0);
    this.coor1 = this.getCartesianFromAngle(angle1);
    this.coor2 = this.getCartesianFromAngle(angle2);
  }

  private getCartesianFromAngle = (angle: number): CartesianPoint =>
    PolarMath.getCartesianFromPolarWithOffset(this.center, this.innerRadius, angle, true);

  getCirclePoints = (strokeColor: string): JSX.Element => (
    <circle
      cx={this.circleRadius}
      cy={this.circleRadius}
      r={this.innerRadius}
      stroke={strokeColor}
      fill="none"
      strokeWidth="1"
    />
  );

  getRadialPoints = (strokeColor: string): JSX.Element => (
    <polyline
      points={`${this.center.x},${this.center.y} ${this.coor0.x},${this.coor0.y} ${this.center.x},${this.center.y} ${this.coor1.x},${this.coor1.y} ${this.center.x},${this.center.y} ${this.coor2.x},${this.coor2.y} ${this.center.x},${this.center.y}`}
      fill="none"
      stroke={strokeColor}
      strokeWidth="2"
    />
  );

  getPolygonPoints = (strokeColor: string): JSX.Element => (
    <polygon
      points={`${this.coor0.x},${this.coor0.y} ${this.coor1.x},${this.coor1.y} ${this.coor2.x},${this.coor2.y}`}
      fill="none"
      stroke={strokeColor}
      strokeWidth="2"
    />
  );

  private center: CartesianPoint;
  private coor0: CartesianPoint;
  private coor1: CartesianPoint;
  private coor2: CartesianPoint;
}
