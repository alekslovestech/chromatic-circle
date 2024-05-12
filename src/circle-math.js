export const TWELVE = 12; //the magic number
const TWO_PI = 2 * Math.PI;
export class Constants {
  static CANVAS_RADIUS = 300;
  static centerX = Constants.CANVAS_RADIUS;
  static centerY = Constants.CANVAS_RADIUS;
  static INNER_RADIUS_WHITE = 120;
  static OUTER_RADIUS = 250;
  static INIT_ANGLE = -Math.PI / 2; //vertical up
  static FULL_KEY_ANGLE = TWO_PI / TWELVE;
  static BLACK_TO_WHITE_KEY_RATIO = 1;
  static SELECTED_BLACK_COLOR = "#444444";
  static SELECTED_WHITE_COLOR = "#cccccc";
}

// utilities related to the coordinate system transformations between
// canvas space <=> input coors (x,y) ==> circle coords (r,θ) ==> index / notes
//                  (key coors)       <== circle coors(r, θ_left / θ_right) <== index / notes
// coor system is y-down and θ-clockwise
export class CircleMath {
  static ToDegrees(radians) {
    return Math.round((radians * 180) / Math.PI);
  }

  static getLeftAngleFromNoteIndex(index) {
    return Constants.INIT_ANGLE + index * Constants.FULL_KEY_ANGLE;
  }

  // pure circular coors 0 degrees at x-horizontal, θ-clockwise
  static GetNoteIndex(angle) {
    const index =
      Math.floor(((angle - Constants.INIT_ANGLE + TWO_PI) * TWELVE) / TWO_PI) %
      TWELVE;
    console.log("selectedNoteIndex=" + index);
    return index;
  }

  static IsRadiusInRange(radius) {
    return (
      radius >= Constants.INNER_RADIUS_WHITE && radius <= Constants.OUTER_RADIUS
    );
  }

  static getInnerRadius(isBlack) {
    return isBlack
      ? Constants.INNER_RADIUS_WHITE +
          (Constants.OUTER_RADIUS - Constants.INNER_RADIUS_WHITE) *
            (1.0 - Constants.BLACK_TO_WHITE_KEY_RATIO)
      : Constants.INNER_RADIUS_WHITE;
  }

  // pure rectangular coors (y-down) relative to circle center =>
  // pure circular coors (θ-clockwise)
  static GetCircularCoors(pureX, pureY) {
    const angle = Math.atan2(pureY, pureX);
    const radius = Math.sqrt(pureX * pureX + pureY * pureY);
    return [radius, angle];
  }

  static GetPureCoorsFromViewport(clientX, clientY, rect) {
    const x = clientX - rect.left - Constants.centerX;
    const y = clientY - rect.top - Constants.centerY;
    return [x, y];
  }
}
