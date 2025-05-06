import React from "react";

import { InputModeSelector } from "./InputModeSelector";
import { PresetsSelector } from "./PresetsSelector";

import { usePreset } from "../../../src/contexts/PresetContext";
import { InputMode } from "../../../src/types/SettingModes";

const SettingsContainer: React.FC = () => {
  const { inputMode } = usePreset();

  const showPresets =
    inputMode === InputMode.ChordPresets || inputMode === InputMode.IntervalPresets;

  return (
    <div className="settings-container">
      <InputModeSelector />
      {showPresets && <PresetsSelector />}
    </div>
  );
};

export default SettingsContainer;
