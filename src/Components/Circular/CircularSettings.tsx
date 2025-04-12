import React from "react";

// Components
import { MusicalKeySelector } from "../MusicalKeySelector";
import { TransposeWidget } from "../TransposeWidget";
import { ChordNameDisplay } from "../ChordNameDisplay";

import { CircularVisModeSelect } from "./CircularVisModeSelect";
import { MonochromeModeToggle } from "./MonochromeModeToggle";
import { ClearButton } from "./ClearButton";
import { KeyTextModeSelect } from "./NoteDisplayModeSelect";

// Styles
import "../../styles/CircularSettings.css";

import { useDisplay } from "../../contexts/DisplayContext";
import { GlobalMode } from "../../types/SettingModes";
import { ScalePreviewToggle } from "./ScalePreviewToggle";

export const CircularSettings = () => {
  const { globalMode } = useDisplay();
  const isAdvanced = globalMode === GlobalMode.Advanced;
  return (
    <div id="keyboardcircular-settings">
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {!isAdvanced && <CircularVisModeSelect />}
        <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
          <MusicalKeySelector useDropdownSelector={isAdvanced} />
          <TransposeWidget />
        </div>
        {!isAdvanced && <MonochromeModeToggle />}
        {isAdvanced && <ScalePreviewToggle />}
        {isAdvanced && <KeyTextModeSelect />}
        <ClearButton />
        <ChordNameDisplay />
      </div>
    </div>
  );
};
