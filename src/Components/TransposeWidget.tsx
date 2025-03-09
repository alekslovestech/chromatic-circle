import { useNotes } from "./NotesContext";
import { IndexUtils } from "../utils/IndexUtils";
import { ixActualArray } from "../types/IndexTypes";
import "../styles/Settings.css";

export const TransposeWidget: React.FC = () => {
  const { selectedNoteIndices, setSelectedNoteIndices } = useNotes();

  const handleTranspose = (amount: number) => {
    const transposedIndices = ixActualArray(IndexUtils.shiftIndices(selectedNoteIndices, amount));
    setSelectedNoteIndices(transposedIndices);
  };

  return (
    <div>
      <div className="transpose-buttons-container">
        Transpose
        <button className="transpose-button" onClick={() => handleTranspose(1)}>
          ↑♫↑
        </button>
        <button className="transpose-button" onClick={() => handleTranspose(-1)}>
          ↓♫↓
        </button>
      </div>
    </div>
  );
};
