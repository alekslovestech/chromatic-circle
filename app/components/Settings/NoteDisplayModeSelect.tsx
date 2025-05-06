import { useDisplay } from "../../../src/contexts/DisplayContext";
import { KeyDisplayMode } from "../../../src/types/SettingModes";
import "../../styles/CircularSettings.css";

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
          title="Note Names"
          checked={keyTextMode === KeyDisplayMode.NoteNames}
          onChange={() => setKeyTextMode(KeyDisplayMode.NoteNames)}
        />
        <label htmlFor="key-text-note-names">A</label>
      </div>

      <div className="radio-option">
        <input
          type="radio"
          id="key-text-numbers"
          name="key-text-mode"
          title="Scale Degree"
          checked={keyTextMode === KeyDisplayMode.ScaleDegree}
          onChange={() => setKeyTextMode(KeyDisplayMode.ScaleDegree)}
        />
        <label htmlFor="key-text-numbers">1</label>
      </div>

      <div className="radio-option">
        <input
          type="radio"
          id="key-text-roman"
          name="key-text-mode"
          title="Roman Numerals"
          checked={keyTextMode === KeyDisplayMode.Roman}
          onChange={() => setKeyTextMode(KeyDisplayMode.Roman)}
        />
        <label htmlFor="key-text-roman">iv</label>
      </div>
    </div>
  );
};
