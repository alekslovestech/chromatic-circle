import "../../styles/CircularSettings.css";
import { useNotes } from "../NotesContext";
//
export const ClearButton: React.FC = () => {
  const { setSelectedNoteIndices } = useNotes();
  return (
    <button className="clear-button" onClick={() => setSelectedNoteIndices([])}>
      Clear
    </button>
  );
};
