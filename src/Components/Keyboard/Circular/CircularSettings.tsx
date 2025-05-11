import React from "react";

// Components
import { MusicalKeySelector } from "../../MusicalKeySelector";
import { TransposeWidget } from "../../TransposeWidget";
import { ChordNameDisplay } from "../../ChordNameDisplay";

import { CircularVisModeSelect } from "./CircularVisModeSelect";

import { MonochromeModeToggle } from "../../Settings/MonochromeModeToggle";
import { ClearButton } from "../../Settings/ClearButton";
import { KeyTextModeSelect } from "../../Settings/NoteDisplayModeSelect";
import { ScalePreviewToggle } from "../../Settings/ScalePreviewToggle";
import { PlayScaleButton } from "../../Settings/PlayScaleButton";
import { GlobalModeButton } from "../../Settings/GlobalModeButton";

import { GlobalMode, useGlobal } from "../../../contexts/GlobalContext";

import "../../../styles/CircularSettings.css";

export const CircularSettings = () => {
  const { globalMode } = useGlobal();
  const isAdvanced = globalMode === GlobalMode.Advanced;
  if (isAdvanced) {
    return (
      <div id="keyboardcircular-settings">
        <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
              <MusicalKeySelector useDropdownSelector={true} />
              <TransposeWidget showKeyTranspose={true} />
            </div>
            <ScalePreviewToggle />
            <KeyTextModeSelect />
            <PlayScaleButton />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <ChordNameDisplay />
            <GlobalModeButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="keyboardcircular-settings">
      <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <CircularVisModeSelect />
          <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
            <MusicalKeySelector useDropdownSelector={false} />
            <TransposeWidget showKeyTranspose={false} />
          </div>
          <MonochromeModeToggle />
          <ClearButton />
          <ChordNameDisplay />
          <GlobalModeButton />
        </div>
      </div>
    </div>
  );
};
