import React from "react";
import { useNotes } from "./NotesContext";

const ModeSelector = () => {
  const { setMode } = useNotes();

  return (
    <div>
      <button
        onClick={() => {
          console.log(`setting mode to circle input`);
          setMode("CIRCLE_INPUT");
        }}
      >
        Circle Input
      </button>
      <button
        onClick={() => {
          console.log(`setting mode to chord presets`);
          setMode("CHORD_PRESETS");
        }}
      >
        Chord Presets
      </button>
    </div>
  );
};

export default ModeSelector;
