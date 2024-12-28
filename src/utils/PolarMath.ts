export class PolarMath {
  static getCartesianFromPolar(radius: number, angle: number, isRounded: boolean = false) {
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    if (!isRounded) return { x, y };
    return { x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 };
  }
}
