import { TWELVE } from "../../../types/NoteConstants";
import { ixChromatic } from "../../../types/ChromaticIndex";

import { ColorUtils } from "../../../utils/ColorUtils";

import { useDisplay } from "../../../contexts/DisplayContext";
import { useMusical } from "../../../contexts/MusicalContext";

import { CircularVisualizations } from "./CircularVisualizations";
import { PianoKeyCircular } from "./PianoKeyCircular";

import { GlobalMode, useGlobal } from "../../../contexts/GlobalContext";
import { useKeyboardHandlers } from "../KeyboardBase";

import "../../../styles/KeyboardCircular.css";
import { CartesianPoint, PolarMath } from "../../../utils/Keyboard/Circular/PolarMath";
import { MusicalKey } from "../../../types/Keys/MusicalKey";

const MAX_RADIUS = 100;
const OUTER_RADIUS = 0.9 * MAX_RADIUS;
const INNER_RADIUS = 0.5 * MAX_RADIUS;
const CIRCLE_RADIUS = 3;

export const KeyboardCircular = () => {
  const { globalMode } = useGlobal();
  const { handleKeyClick } = useKeyboardHandlers();
  const { selectedNoteIndices, selectedMusicalKey } = useMusical();
  const { circularVisMode } = useDisplay();
  const isLogo = globalMode === GlobalMode.Logo;
  const isAdvanced = globalMode === GlobalMode.Advanced;
  const coords = [-MAX_RADIUS, -MAX_RADIUS, MAX_RADIUS * 2, MAX_RADIUS * 2];
  const color = ColorUtils.getChordColor(selectedNoteIndices);

  const getLineCartesianPoints = (
    selectedMusicalKey: MusicalKey,
    innerRadius: number,
    outerRadius: number,
  ): CartesianPoint[] => {
    const tonicIndex = selectedMusicalKey.tonicIndex;

    const COEFF = 1.05;
    const { startAngle: startOfTonicAngle } = PolarMath.NoteIndexToAngleRange(tonicIndex);
    const point_start: CartesianPoint = PolarMath.getCartesianFromPolar(
      innerRadius / COEFF,
      startOfTonicAngle,
      true,
    );

    const point_end: CartesianPoint = PolarMath.getCartesianFromPolar(
      outerRadius * COEFF,
      startOfTonicAngle,
      true,
    );

    return [point_start, point_end];
  };

  const renderScaleBoundary = () => {
    if (isAdvanced) {
      const [point_start, point_end] = getLineCartesianPoints(
        selectedMusicalKey,
        INNER_RADIUS,
        OUTER_RADIUS * 0.95,
      );

      const { startAngle: startOfTonicAngle } = PolarMath.NoteIndexToAngleRange(
        selectedMusicalKey.tonicIndex,
      );
      const point_end_circle = PolarMath.getCartesianFromPolar(
        OUTER_RADIUS + CIRCLE_RADIUS,
        startOfTonicAngle,
        true,
      );

      return [
        <div className="scale-boundary-circular" key="scale-boundrary-circular">
          <line x1={point_start.x} y1={point_start.y} x2={point_end.x} y2={point_end.y} />
          <circle
            cx={point_end_circle.x}
            cy={point_end_circle.y}
            r={CIRCLE_RADIUS}
            fill="none"
            stroke="currentColor"
          />
        </div>,
      ];
    }
    return null;
  };

  return (
    <svg viewBox={coords.join(" ")} className="svg-container">
      {Array.from({ length: TWELVE }).map((_, index) => (
        <PianoKeyCircular
          key={index}
          chromaticIndex={ixChromatic(index)}
          onClick={isLogo ? () => {} : handleKeyClick}
          outerRadius={OUTER_RADIUS}
          innerRadius={INNER_RADIUS}
        />
      ))}
      {CircularVisualizations.draw(selectedNoteIndices, circularVisMode, INNER_RADIUS, color)}
      {renderScaleBoundary()}
    </svg>
  );
};
