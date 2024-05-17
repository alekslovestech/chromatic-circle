import React from "react";
import { useNotes } from "./NotesContext";

const ModeSelector = () => {
  const { switchMode } = useNotes();

  return (
    <div>
      <button onClick={() => switchMode("CIRCLE_INPUT")}>Circle Input</button>
      <button onClick={() => switchMode("CHORD_PRESETS")}>Chord Presets</button>
    </div>
  );
};

export default ModeSelector;
