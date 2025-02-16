import { CommonMath } from "../../utils/CommonMath";
import { CartesianPoint, PolarMath } from "../../utils/PolarMath";

export class CircularVisIcons {
  readonly innerRadius: number;
  private readonly circleRadius: number;
  readonly circleDiameter: number;

  constructor(circleRadius: number, innerRadius: number) {
    this.circleRadius = circleRadius;
    this.innerRadius = innerRadius;
    this.circleDiameter = 2 * this.circleRadius;

    this.center = {
      x: this.circleRadius,
      y: this.circleRadius,
    };
    this.coor0 = PolarMath.getCartesianFromPolarWithOffset(
      this.center,
      this.innerRadius,
      this.angle0,
      true,
    );
    this.coor1 = PolarMath.getCartesianFromPolarWithOffset(
      this.center,
      this.innerRadius,
      this.angle1,
      true,
    );
    this.coor2 = PolarMath.getCartesianFromPolarWithOffset(
      this.center,
      this.innerRadius,
      this.angle2,
      true,
    );
  }

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

  private readonly angle0 = CommonMath.NoteIndexToAngles(0).middleAngle;
  private readonly angle1 = CommonMath.NoteIndexToAngles(4).middleAngle;
  private readonly angle2 = CommonMath.NoteIndexToAngles(8).middleAngle;

  private readonly center: CartesianPoint;
  private readonly coor0: CartesianPoint;
  private readonly coor1: CartesianPoint;
  private readonly coor2: CartesianPoint;
}
