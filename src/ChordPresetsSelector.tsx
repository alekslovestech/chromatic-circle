import React from "react";
import { useNotes } from "./NotesContext";
import { NOTE_NAMES, CHORD_TYPES, calculateChordNotesFromIndex } from "./ChromaticUtils";

const ChordPresetsSelector = () => {
  const {
    inputMode,
    selectedNoteIndices,
    setSelectedNoteIndices,
    selectedChordType,
    setSelectedChordType,
  } = useNotes();
  
  if (inputMode !== "CHORD_PRESETS") return null;

  /*const handleNoteClick = (event) => {
    const note = event.target.value;
    console.log(`Note ${note} was clicked!`);
    const incomingKey = note;
    setSelectedKey(incomingKey);
    const newNotes = calculateChordNotes(incomingKey, selectedChordType);
    console.log(`key change: newNotes=${newNotes}`);
    setSelectedNoteIndices(newNotes);
  }; */

  const handleChordTypeChange = (event: any) => {
    const incomingChord = event.target.value;
    setSelectedChordType(incomingChord);
    const originalRootIndex = selectedNoteIndices[0];
    const newNotes = calculateChordNotesFromIndex(originalRootIndex, incomingChord);
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
      {/*<select onChange={handleNoteClick} value={selectedKey}>
        {
          //console.log(selectedKey);
          NOTE_NAMES.map((note) => (
            <option key={note} value={note}>
              {note}
            </option>
          ))
        }
      </select>*/}

      <select onChange={handleChordTypeChange} value={selectedChordType}>
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
