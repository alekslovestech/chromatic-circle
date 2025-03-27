import { TWELVE } from "../../types/NoteConstants";
import { ActualIndex } from "../../types/IndexTypes";
import { ixChromatic } from "../../types/ChromaticIndex";

import { useKeyboardHandlers } from "../useKeyboardHandlers";
import { CircularVisualizations } from "./CircularVisualizations";
import { PieSlice } from "./PieSlice";

import { useDisplay } from "../../contexts/DisplayContext";
import { useMusical } from "../../contexts/MusicalContext";

import "../../styles/KeyboardCircular.css";

const MAX_RADIUS = 100;
const OUTER_RADIUS = 0.9 * MAX_RADIUS;
const INNER_RADIUS = 0.5 * MAX_RADIUS;

export const KeyboardCircular = ({ isLogo = false }: { isLogo?: boolean }) => {
  const { handleKeyClick } = useKeyboardHandlers();
  const { selectedNoteIndices } = useMusical();
  const { circularVisMode } = useDisplay();

  const coords = [-MAX_RADIUS, -MAX_RADIUS, MAX_RADIUS * 2, MAX_RADIUS * 2];
  return (
    <svg viewBox={coords.join(" ")} className="svg-container">
      {Array.from({ length: TWELVE }).map((_, index) => (
        <PieSlice
          key={index}
          chromaticIndex={ixChromatic(index)}
          onClick={() => (isLogo ? () => {} : handleKeyClick(index as ActualIndex))}
          outerRadius={OUTER_RADIUS}
          innerRadius={INNER_RADIUS}
          isLogo={isLogo}
        />
      ))}
      {CircularVisualizations.draw(selectedNoteIndices, circularVisMode, INNER_RADIUS)}
    </svg>
  );
};
