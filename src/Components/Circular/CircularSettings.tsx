import React from "react";

import { CircularVisModeSelect } from "./CircularVisModeSelect";
import { MusicalKeySelector } from "../MusicalKeySelector";
import { TransposeWidget } from "../TransposeWidget";
import "../../styles/CircularSettings.css";

import { ChordNameDisplay } from "../ChordNameDisplay";
import { MonochromeModeToggle } from "./MonochromeModeToggle";

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
        <ChordNameDisplay />
      </div>
    </div>
  );
};
