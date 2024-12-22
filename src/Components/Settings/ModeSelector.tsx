import React from "react";
import { useNotes } from "../NotesContext";
import { InputMode } from "../../types/InputMode";
import "../../styles/ModeSelector.css";

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
    mode: InputMode.SingleNote,
    description: "Click a note to select it",
  },
  {
    mode: InputMode.IntervalPresets,
    description: "Select from predefined intervals",
  },
  {
    mode: InputMode.ChordPresets,
    description: "Select from predefined chord patterns",
  },
];

export const ModeSelector: React.FC = () => {
  const { inputMode, setInputMode } = useNotes();

  const handleModeChange = (newMode: InputMode) => {
    setInputMode(newMode);
  };

  return (
    <div className="mode-selector text-center">
      <div className="mode-selector-title">Input Mode</div>
      <div className="mode-buttons">
        {AVAILABLE_MODES.map(({ mode, description }) => (
          <button
            key={mode}
            onClick={() => handleModeChange(mode)}
            className={`btn btn-outline-secondary ${inputMode === mode ? "active" : ""}`}
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
