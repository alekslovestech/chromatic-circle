import { TWELVE } from "../../types/NoteConstants";
import { ActualIndex } from "../../types/IndexTypes";
import { ixChromatic } from "../../types/ChromaticIndex";
import { GlobalMode } from "../../types/SettingModes";

import { ColorUtils } from "../../utils/ColorUtils";

import { useKeyboardHandlers } from "../useKeyboardHandlers";

import { useDisplay } from "../../contexts/DisplayContext";
import { useMusical } from "../../contexts/MusicalContext";

import { ScaleBoundraryCircular } from "./ScaleBoundraryCircular";
import { CircularVisualizations } from "./CircularVisualizations";
import { PianoKeyCircular } from "./PianoKeyCircular";

import "../../styles/KeyboardCircular.css";

const MAX_RADIUS = 100;
const OUTER_RADIUS = 0.9 * MAX_RADIUS;
const INNER_RADIUS = 0.5 * MAX_RADIUS;

export const KeyboardCircular = () => {
  const { globalMode } = useDisplay();
  const { handleKeyClick } = useKeyboardHandlers();
  const { selectedNoteIndices, selectedMusicalKey } = useMusical();
  const { circularVisMode } = useDisplay();
  const isLogo = globalMode === GlobalMode.Logo;
  const isAdvanced = globalMode === GlobalMode.Advanced;
  const coords = [-MAX_RADIUS, -MAX_RADIUS, MAX_RADIUS * 2, MAX_RADIUS * 2];
  const color = ColorUtils.getChordColor(selectedNoteIndices);
  return (
    <svg viewBox={coords.join(" ")} className="svg-container">
      {Array.from({ length: TWELVE }).map((_, index) => (
        <PianoKeyCircular
          key={index}
          chromaticIndex={ixChromatic(index)}
          onClick={() => (isLogo ? () => {} : handleKeyClick(index as ActualIndex))}
          outerRadius={OUTER_RADIUS}
          innerRadius={INNER_RADIUS}
        />
      ))}
      {CircularVisualizations.draw(selectedNoteIndices, circularVisMode, INNER_RADIUS, color)}
      {isAdvanced && ScaleBoundraryCircular.draw(selectedMusicalKey, INNER_RADIUS, OUTER_RADIUS)}
    </svg>
  );
};
