import React from "react";

// Components
import { MusicalKeySelector } from "../MusicalKeySelector";
import { TransposeWidget } from "../TransposeWidget";
import { ChordNameDisplay } from "../ChordNameDisplay";

import { CircularVisModeSelect } from "./CircularVisModeSelect";
import { MonochromeModeToggle } from "../Settings/MonochromeModeToggle";
import { ClearButton } from "../Settings/ClearButton";
import { KeyTextModeSelect } from "../Settings/NoteDisplayModeSelect";

// Styles
import "../../styles/CircularSettings.css";

import { GlobalMode, useGlobal } from "../../contexts/GlobalContext";
import { ScalePreviewToggle } from "../Settings/ScalePreviewToggle";
import { PlayScaleButton } from "../Settings/PlayScaleButton";

export const CircularSettings = () => {
  const { globalMode } = useGlobal();
  const isAdvanced = globalMode === GlobalMode.Advanced;
  return (
    <div id="keyboardcircular-settings">
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {!isAdvanced && <CircularVisModeSelect />}
        <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
          <MusicalKeySelector useDropdownSelector={isAdvanced} />
          <TransposeWidget showKeyTranspose={isAdvanced} />
        </div>
        {!isAdvanced && <MonochromeModeToggle />}
        {isAdvanced && <ScalePreviewToggle />}
        {isAdvanced && <KeyTextModeSelect />}
        {isAdvanced && <PlayScaleButton />}
        <ClearButton />
        <ChordNameDisplay />
      </div>
    </div>
  );
};
