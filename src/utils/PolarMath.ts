export class PolarMath {
  static getCartesianFromPolar(radius: number, angle: number) {
    return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
  }
}
