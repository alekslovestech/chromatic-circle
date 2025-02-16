import React from "react";
import CircularVisModeSelect from "./CircularVisModeSelect";
import MusicalKeySelector from "../MusicalKeySelector";

export const CircularTopBar: React.FC = () => {
  return (
    <div id="keyboardcircular-topbar">
      {/* <AccidentalToggle /> */}
      <MusicalKeySelector />
      <CircularVisModeSelect />
    </div>
  );
};
