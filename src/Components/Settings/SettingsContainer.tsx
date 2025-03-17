import React from "react";
import ModeSelector from "./ModeSelector";
import PresetsSelector from "./PresetsSelector";
import { useNotes } from "../NotesContext";
import { InputMode } from "../../types/SettingModes";

const SettingsContainer: React.FC = () => {
  const { inputMode } = useNotes();

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
