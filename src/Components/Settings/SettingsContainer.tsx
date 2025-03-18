import React from "react";

import { ModeSelector } from "./ModeSelector";
import { PresetsSelector } from "./PresetsSelector";

import { usePreset } from "../../contexts/PresetContext";
import { InputMode } from "../../types/SettingModes";

const SettingsContainer: React.FC = () => {
  const { inputMode } = usePreset();

  const showPresets =
    inputMode === InputMode.ChordPresets || inputMode === InputMode.IntervalPresets;

  return (
    <div className="settings-container">
      <ModeSelector />
      {showPresets && <PresetsSelector />}
    </div>
  );
};

export default SettingsContainer;
