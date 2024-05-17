import React from "react";
import { useNotes } from "./NotesContext";
import { NOTE_NAMES, CHORD_TYPES } from "./chromatic-utils";

//const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const ChordPresetsSelector = () => {
  const { mode, updateNotes } = useNotes();
  const [selectedKey, setSelectedKey] = React.useState(NOTE_NAMES[0]);
  const [selectedChord, setSelectedChord] = React.useState(CHORD_TYPES[0]);

  if (mode !== "CHORD_PRESETS") return null;

  const handleKeyChange = (event) => {
    setSelectedKey(event.target.value);
  };

  const handleChordTypeChange = (event) => {
    setSelectedChord(event.target.value);
    const newNotes = calculateChordNotes(event.target.value, selectedKey);
    updateNotes(newNotes);
  };

  // Function to calculate notes based on key and chord type
  const calculateChordNotes = (chord, key) => {
    // Placeholder for actual chord calculation logic

    return [key + chord]; // Simplified return for illustration
  };

  return (
    <div>
      <select onChange={handleKeyChange} value={selectedKey}>
        {NOTE_NAMES.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <select onChange={handleChordTypeChange} value={selectedChord}>
        {CHORD_TYPES.map((chord) => (
          <option key={chord} value={chord}>
            {chord}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChordPresetsSelector;
