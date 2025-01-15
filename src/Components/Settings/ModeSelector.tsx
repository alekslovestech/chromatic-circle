import React from "react";
import { useNotes } from "../NotesContext";
import { InputMode } from "../../types/InputMode";
import "../../styles/ModeSelector.css";

interface ModeSelectorButton {
  id: string;
  mode: InputMode;
  description: string;
}

const AVAILABLE_MODES: ModeSelectorButton[] = [
  {
    id: "modeFreeform",
    mode: InputMode.Toggle,
    description: "Click notes to toggle them on/off",
  },
  {
    id: "modeSingleNote",
    mode: InputMode.SingleNote,
    description: "Click a note to select it",
  },
  {
    id: "modeIntervals",
    mode: InputMode.IntervalPresets,
    description: "Select from predefined intervals",
  },
  {
    id: "modeChords",
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
        {AVAILABLE_MODES.map(({ id, mode, description }) => (
          <button
            id={id}
            key={mode}
            onClick={() => handleModeChange(mode)}
            className={`btn btn-outline-secondary ${inputMode === mode ? "selected" : ""}`}
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
