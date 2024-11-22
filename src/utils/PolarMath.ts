export class PolarMath {
  static getCartesianFromPolar(radius: number, angle: number, isRounded: boolean = false) {
    if (isRounded)
      //round to the nearest 100th
      return {
        x: Math.round(radius * Math.cos(angle) * 100) / 100,
        y: Math.round(radius * Math.sin(angle) * 100) / 100,
      };

    //not rounded by default
    return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
  }
}
