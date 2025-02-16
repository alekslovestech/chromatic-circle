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
    this.Bcoor = PolarMath.getCartesianFromPolarWithOffset(
      this.center,
      this.innerRadius,
      this.Bangle,
      true,
    );
    this.Ebcoor = PolarMath.getCartesianFromPolarWithOffset(
      this.center,
      this.innerRadius,
      this.Ebangle,
      true,
    );
    this.Gcoor = PolarMath.getCartesianFromPolarWithOffset(
      this.center,
      this.innerRadius,
      this.Gangle,
      true,
    );
    this.Ocoor = PolarMath.getCartesianFromPolarWithOffset(this.center, 0, 0, true);
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
      points={`${this.Ocoor.x},${this.Ocoor.y} ${this.Bcoor.x},${this.Bcoor.y} ${this.Ocoor.x},${this.Ocoor.y} ${this.Ebcoor.x},${this.Ebcoor.y} ${this.Ocoor.x},${this.Ocoor.y} ${this.Gcoor.x},${this.Gcoor.y} ${this.Ocoor.x},${this.Ocoor.y}`}
      fill="none"
      stroke={strokeColor}
      strokeWidth="2"
    />
  );

  getPolygonPoints = (strokeColor: string): JSX.Element => (
    <polygon
      points={`${this.Bcoor.x},${this.Bcoor.y} ${this.Ebcoor.x},${this.Ebcoor.y} ${this.Gcoor.x},${this.Gcoor.y}`}
      fill="none"
      stroke={strokeColor}
      strokeWidth="2"
    />
  );

  private readonly Bangle = CommonMath.NoteIndexToAngles(11).middleAngle;
  private readonly Gangle = CommonMath.NoteIndexToAngles(7).middleAngle;
  private readonly Ebangle = CommonMath.NoteIndexToAngles(3).middleAngle;

  private readonly center: CartesianPoint;
  private readonly Bcoor: CartesianPoint;
  private readonly Ebcoor: CartesianPoint;
  private readonly Gcoor: CartesianPoint;
  private readonly Ocoor: CartesianPoint;
}
