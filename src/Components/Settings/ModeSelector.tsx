import React from "react";
import { useNotes } from "../NotesContext";
import { InputMode } from "../../types/InputMode";

interface ModeSelectorButton {
  mode: InputMode;
  description: string;
}

const AVAILABLE_MODES: ModeSelectorButton[] = [
  {
    mode: InputMode.Toggle,
    description: "Click notes to toggle them on/off",
  },
  {
    mode: InputMode.ChordPresets,
    description: "Select from predefined chord patterns",
  },
  {
    mode: InputMode.IntervalPresets,
    description: "Select from predefined intervals",
  },
];

export const ModeSelector: React.FC = () => {
  const { inputMode, setInputMode } = useNotes();

  const handleModeChange = (newMode: InputMode) => {
    setInputMode(newMode);
  };

  return (
    <div className="mode-selector">
      <h3>Input Mode</h3>
      <div className="mode-buttons">
        {AVAILABLE_MODES.map(({ mode, description }) => (
          <button
            key={mode}
            onClick={() => handleModeChange(mode)}
            className={`mode-button ${inputMode === mode ? "active" : ""}`}
            title={description}
          >
            {mode.toString()}
          </button>
        ))}
      </div>
    </div>
  );
};
export default ModeSelector;
