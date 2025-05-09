import React from "react";

// Components
import { MusicalKeySelector } from "../../../components/MusicalKeySelector";
import { TransposeWidget } from "../../../components/TransposeWidget";
import { ChordNameDisplay } from "../../../components/ChordNameDisplay";

import { CircularVisModeSelect } from "./CircularVisModeSelect";

import { MonochromeModeToggle } from "../../Settings/MonochromeModeToggle";
import { ClearButton } from "../../Settings/ClearButton";
import { KeyTextModeSelect } from "../../Settings/NoteDisplayModeSelect";
import { ScalePreviewToggle } from "../../Settings/ScalePreviewToggle";
import { PlayScaleButton } from "../../Settings/PlayScaleButton";
import { GlobalModeButton } from "../../Settings/GlobalModeButton";

import { GlobalMode, useGlobal } from "../../../contexts/GlobalContext";

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

        {isAdvanced ? (
          <>
            <ScalePreviewToggle />
            <KeyTextModeSelect />
            <PlayScaleButton />
          </>
        ) : (
          <>
            <MonochromeModeToggle />
            <ClearButton />
          </>
        )}
        <ChordNameDisplay />
        <GlobalModeButton />
      </div>
    </div>
  );
};
