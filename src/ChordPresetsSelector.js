import React from "react";
import { useNotes } from "./NotesContext";
import { NOTE_NAMES, CHORD_TYPES, calculateChordNotes } from "./ChromaticUtils";

const ChordPresetsSelector = () => {
  const { mode, setSelectedNoteIndices } = useNotes();
  const [selectedKey, setSelectedKey] = React.useState(NOTE_NAMES[0]);
  const [selectedChord, setSelectedChord] = React.useState(CHORD_TYPES[0]);

  if (mode !== "CHORD_PRESETS") return null;

  const handleNoteClick = (note) => {
    console.log(`Note ${note} was clicked!`);
    const incomingKey = note;
    setSelectedKey(incomingKey);
    const newNotes = calculateChordNotes(incomingKey, selectedChord);
    console.log(`key change: newNotes=${newNotes}`);
    setSelectedNoteIndices(newNotes);
  };

  const handleChordTypeChange = (event) => {
    const incomingChord = event.target.value;
    setSelectedChord(incomingChord);
    const newNotes = calculateChordNotes(selectedKey, incomingChord);
    console.log(`chord type change: newNotes=${newNotes}`);
    setSelectedNoteIndices(newNotes);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {NOTE_NAMES.map((note) => (
        <button
          key={note}
          onClick={() => handleNoteClick(note)}
          style={{ height: "30px", margin: "5px", width: "50px" }} // Set width to 150px
        >
          {note}
        </button>
      ))}

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
