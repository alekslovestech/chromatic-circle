import React from "react";
import AccidentalToggle from "../AccidentalToggle";
import CircularVisModeSelect from "./CircularVizModeSelect";

interface CircularTopBarProps {
  showVisualizationMode: boolean;
}

export const CircularTopBar: React.FC<CircularTopBarProps> = ({ showVisualizationMode }) => (
  <div className="d-flex justify-content-between w-100" id="keyboardpieslice-topbar">
    <div className="me-auto">
      <AccidentalToggle />
    </div>
    <div className={`ms-auto ${showVisualizationMode ? "" : "invisible"}`}>
      <CircularVisModeSelect />
    </div>
  </div>
);
