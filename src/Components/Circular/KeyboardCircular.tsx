import { TWELVE } from "../../types/NoteConstants";
import { ActualIndex } from "../../types/IndexTypes";
import { useKeyboardHandlers } from "../useKeyboardHandlers";
import { useNotes } from "../NotesContext";
import { CircularVisualizations } from "./CircularVisualizations";
import PieSlice from "./PieSlice";
import { ixChromatic } from "../../types/ChromaticIndex";
import "../../styles/KeyboardCircular.css";

export const MAX_RADIUS = 100;
const OUTER_RADIUS = 0.9 * MAX_RADIUS;
const INNER_RADIUS = 0.5 * MAX_RADIUS;

const KeyboardCircular = ({ isLogo = false }: { isLogo?: boolean }) => {
  const { handleKeyClick } = useKeyboardHandlers();
  const { selectedNoteIndices, circularVisMode } = useNotes();

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

export default KeyboardCircular;
