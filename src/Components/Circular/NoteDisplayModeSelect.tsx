import { useDisplay } from "../../contexts/DisplayContext";
import "../../styles/CircularSettings.css";
import { KeyTextMode } from "../../types/SettingModes";

// determines the way the note names / scale degrees are displayed on the circular keyboard
export const KeyTextModeSelect: React.FC = () => {
  const { keyTextMode, setKeyTextMode } = useDisplay();
  return (
    <div
      className="note-display-mode-container"
      style={{ display: "flex", flexDirection: "row", gap: "10px" }}
    >
      <div className="radio-option">
        <input
          type="radio"
          id="key-text-note-names"
          name="key-text-mode"
          checked={keyTextMode === KeyTextMode.NoteNames}
          onChange={() => setKeyTextMode(KeyTextMode.NoteNames)}
        />
        <label htmlFor="key-text-note-names">A</label>
      </div>

      <div className="radio-option">
        <input
          type="radio"
          id="key-text-numbers"
          name="key-text-mode"
          checked={keyTextMode === KeyTextMode.Arabic}
          onChange={() => setKeyTextMode(KeyTextMode.Arabic)}
        />
        <label htmlFor="key-text-numbers">1</label>
      </div>

      <div className="radio-option">
        <input
          type="radio"
          id="key-text-roman"
          name="key-text-mode"
          checked={keyTextMode === KeyTextMode.Roman}
          onChange={() => setKeyTextMode(KeyTextMode.Roman)}
        />
        <label htmlFor="key-text-roman">iv</label>
      </div>
    </div>
  );
};
