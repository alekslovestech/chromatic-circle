import React from "react";
import AccidentalToggle from "../AccidentalToggle";
import CircularVisModeSelect from "./CircularVizModeSelect";
import { useNotes } from "../NotesContext";

export const CircularTopBar: React.FC = () => {
  const { selectedNoteIndices } = useNotes();
  const showVisualizationMode = selectedNoteIndices.length > 1;

  return (
    <div className="d-flex justify-content-between w-100" id="keyboardpieslice-topbar">
      <div className="me-auto">
        <AccidentalToggle />
      </div>
      <div className={`ms-auto ${showVisualizationMode ? "" : "invisible"}`}>
        <CircularVisModeSelect />
      </div>
    </div>
  );
};
