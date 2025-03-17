import { useNotes } from "../NotesContext";
import "../../styles/CircularSettings.css";
import { NoteDisplayMode } from "../../types/SettingModes";
export const NoteDisplayModeSelect: React.FC = () => {
  const { noteDisplayMode, setNoteDisplayMode } = useNotes();
  return (
    <div className="note-display-mode-container">
      <div className="radio-option">
        <input
          type="radio"
          id="note-display-letters"
          name="note-display-mode"
          checked={noteDisplayMode === NoteDisplayMode.Letters}
          onChange={() => setNoteDisplayMode(NoteDisplayMode.Letters)}
        />
        <label htmlFor="note-display-letters">A B C</label>
      </div>

      <div className="radio-option">
        <input
          type="radio"
          id="note-display-arabic"
          name="note-display-mode"
          checked={noteDisplayMode === NoteDisplayMode.Arabic}
          onChange={() => setNoteDisplayMode(NoteDisplayMode.Arabic)}
        />
        <label htmlFor="note-display-solfege">1 2 3</label>
      </div>

      <div className="radio-option">
        <input
          type="radio"
          id="note-display-roman"
          name="note-display-mode"
          checked={noteDisplayMode === NoteDisplayMode.Roman}
          onChange={() => setNoteDisplayMode(NoteDisplayMode.Roman)}
        />
        <label htmlFor="note-display-numbers">i ii iii</label>
      </div>
    </div>
  );
};
