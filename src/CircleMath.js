const TWELVE = 12; //the magic number
const TWO_PI = 2 * Math.PI;
const INIT_ANGLE = -Math.PI / 2; //vertical up

const INNER_RADIUS_WHITE = 80;
const OUTER_RADIUS = 160;
export class Constants {
  static CANVAS_RADIUS = 200;
  static centerX = Constants.CANVAS_RADIUS;
  static centerY = Constants.CANVAS_RADIUS;

  static FULL_KEY_ANGLE = TWO_PI / TWELVE;

  static SELECTED_WHITE_COLOR = "#ffff00";
  static SELECTED_BLACK_COLOR = "#dddd00";
}

// utilities related to the coordinate system transformations between
// canvas space (0 in top-left corner) <=>
//    ==> cartesian coors (0 in center of circle)
//        ==> circle coors (r,θ)
//              ==> index / notes
//        <== key coors(r, θ_left / θ_right)
// coor system is y-down and θ-clockwise
export class CircleMath {
  static ToDegrees(radians) {
    return Math.round((radians * 180) / Math.PI);
  }

  static GetMultiplierFromIndex(index) {
    return Math.pow(2, index / TWELVE);
  }

  static NoteIndexToLeftAngle(index) {
    return INIT_ANGLE + index * Constants.FULL_KEY_ANGLE;
  }

  // pure circular coors 0 degrees at x-horizontal, θ-clockwise
  static AngleToNoteIndex(angle) {
    const index =
      Math.floor(((angle - INIT_ANGLE + TWO_PI) * TWELVE) / TWO_PI) % TWELVE;
    return index;
  }

  static IsRadiusInRange(radius) {
    return radius >= INNER_RADIUS_WHITE && radius <= OUTER_RADIUS;
  }

  //working with spirals requires more care:
  // 1. the radius is not the same as the radius in the circle
  // 2. multiple octaves supported
  // 3. indices past 12 are supported
  static getInnerRadius(index) {
    const multiplier = 1.0; //CircleMath.GetMultiplierFromIndex(index);
    return multiplier * INNER_RADIUS_WHITE;
  }

  static getOuterRadius(index) {
    const multiplier = 1.0; //CircleMath.GetMultiplierFromIndex(index);
    return multiplier * OUTER_RADIUS;
  }

  static CartesianToCircular(pureX, pureY) {
    const angle = Math.atan2(pureY, pureX);
    const radius = Math.sqrt(pureX * pureX + pureY * pureY);
    return [radius, angle];
  }

  static ViewportToCartesian(clientX, clientY, rect) {
    const x = clientX - rect.left - Constants.centerX;
    const y = clientY - rect.top - Constants.centerY;
    return [x, y];
  }

  static GetKeyColor(isBlack, isSelected) {
    const keyColor = isSelected
      ? isBlack
        ? Constants.SELECTED_BLACK_COLOR
        : Constants.SELECTED_WHITE_COLOR
      : isBlack
      ? "black"
      : "white";
    return keyColor;
  }
}
