import React from "react";
import AccidentalToggle from "../AccidentalToggle";
import CircularVisModeSelect from "./CircularVizModeSelect";

export const CircularTopBar: React.FC = () => {
  return (
    <div id="keyboardcircular-topbar">
      <AccidentalToggle />
      <CircularVisModeSelect />
    </div>
  );
};
