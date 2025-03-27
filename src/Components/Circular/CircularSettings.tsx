import React from "react";

// Components
import { CircularVisModeSelect } from "./CircularVisModeSelect";
import { MusicalKeySelector } from "../MusicalKeySelector";
import { TransposeWidget } from "../TransposeWidget";
import { ChordNameDisplay } from "../ChordNameDisplay";
import { MonochromeModeToggle } from "./MonochromeModeToggle";
import { ClearButton } from "./ClearButton";

// Styles
import "../../styles/CircularSettings.css";

export const CircularSettings: React.FC = () => {
  return (
    <div id="keyboardcircular-settings">
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <CircularVisModeSelect />
        <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
          <MusicalKeySelector />
          <TransposeWidget />
        </div>
        <MonochromeModeToggle />
        {/*<KeyTextModeSelect />*/}
        <ClearButton />
        <ChordNameDisplay />
      </div>
    </div>
  );
};
