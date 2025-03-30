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

export const CircularSettings: React.FC<{ advanced?: boolean }> = ({ advanced = false }) => {
  return (
    <div id="keyboardcircular-settings">
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <CircularVisModeSelect />
        <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
          <MusicalKeySelector advanced={advanced} />
          <TransposeWidget />
        </div>
        {<MonochromeModeToggle />}
        {advanced && <KeyTextModeSelect />}
        <ClearButton />
        <ChordNameDisplay />
      </div>
    </div>
  );
};
