import React from "react";
import AccidentalToggle from "../AccidentalToggle";
import CircularVisModeSelect from "./CircularVizModeSelect";
import MusicKeySelector from "../MusicKeySelector";

export const CircularTopBar: React.FC = () => {
  return (
    <div id="keyboardcircular-topbar">
      {/* <AccidentalToggle /> */}
      <MusicKeySelector />
      <CircularVisModeSelect />
    </div>
  );
};
