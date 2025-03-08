import React from "react";
import CircularVisModeSelect from "./CircularVisModeSelect";
import { MusicalKeySelector } from "../MusicalKeySelector";
import { TransposeWidget } from "../TransposeWidget";

export const CircularTopBar: React.FC = () => {
  return (
    <div id="keyboardcircular-topbar">
      {/* <AccidentalToggle /> */}
      <MusicalKeySelector />
      <TransposeWidget />
      <CircularVisModeSelect />
    </div>
  );
};
