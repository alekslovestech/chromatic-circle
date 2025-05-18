import React from "react";

import { InputMode } from "../../types/SettingModes";

import { usePreset } from "../../contexts/PresetContext";

import "../../styles/InputModeSelector.css";
import { Button } from "../Common/Button";
import { SectionTitle } from "../Common/SectionTitle";

interface ModeSelectorButton {
  id: string;
  mode: InputMode;
  description: string;
}

const AVAILABLE_MODES: ModeSelectorButton[] = [
  {
    id: "mode-freeform",
    mode: InputMode.Toggle,
    description: "Click notes to toggle them on/off",
  },
  {
    id: "mode-singlenote",
    mode: InputMode.SingleNote,
    description: "Click a note to select it",
  },
  {
    id: "mode-intervals",
    mode: InputMode.IntervalPresets,
    description: "Select from predefined intervals",
  },
  {
    id: "mode-chords",
    mode: InputMode.ChordPresets,
    description: "Select from predefined chord patterns",
  },
];

export const InputModeSelector: React.FC = () => {
  const { inputMode, setInputMode } = usePreset();
  const handleModeChange = (newMode: InputMode) => {
    setInputMode(newMode);
  };

  return (
    <div className="mode-selector text-center">
      <SectionTitle>Input Mode</SectionTitle>
      <div className="mode-button-container">
        {AVAILABLE_MODES.map(({ id, mode, description }) => {
          return (
            <Button
              id={id}
              key={mode}
              variant="option"
              density="compact"
              size="sm"
              onClick={() => handleModeChange(mode)}
              selected={inputMode === mode}
              title={description}
            >
              {mode.toString()}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
