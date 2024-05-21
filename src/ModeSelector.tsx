import React from "react";
import { useNotes } from "./NotesContext";

const ModeSelector = () => {
  const { setInputMode } = useNotes();

  return (
    <div>
      <button
        onClick={() => {
          console.log(`setting mode to circle input`);
          setInputMode("CIRCLE_INPUT");
        }}
      >
        Circle Input
      </button>
      <button
        onClick={() => {
          console.log(`setting mode to chord presets`);
          setInputMode("CHORD_PRESETS");
        }}
      >
        Chord Presets
      </button>
    </div>
  );
};

export default ModeSelector;
