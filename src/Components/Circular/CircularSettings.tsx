import React from "react";
import CircularVisModeSelect from "./CircularVisModeSelect";
import { MusicalKeySelector } from "../MusicalKeySelector";
import { TransposeWidget } from "../TransposeWidget";
import "../../styles/CircularSettings.css";

import { ChordNameDisplay } from "../ChordNameDisplay";

export const CircularSettings: React.FC = () => {
  return (
    <div id="keyboardcircular-settings">
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <CircularVisModeSelect />
        <MusicalKeySelector />

        <TransposeWidget />
      </div>
      <ChordNameDisplay />
    </div>
  );
};
