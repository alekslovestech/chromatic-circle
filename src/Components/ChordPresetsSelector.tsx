import React from "react";
import Grid from "@mui/material/Grid";
//import Item from "@mui/material/Item"
import { useNotes } from "./NotesContext";
import {
  CHORD_TYPES,
  calculateChordNotesFromIndex,
  getNoteFromKeyAndAccidental,
  getChordName,
} from "../ChromaticUtils";
import { Accidental } from "../NoteDisplayModes";

const ChordPresetsSelector: React.FC = () => {
  const {
    inputMode,
    selectedNoteIndices,
    setSelectedNoteIndices,
    selectedChordType,
    setSelectedChordType,
    selectedAccidental,
    setSelectedAccidental,
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
    const newNotes = calculateChordNotesFromIndex(
      originalRootIndex,
      incomingChord
    );
    console.log(`chord type change: ${incomingChord}, newNotes=${newNotes}`);
    setSelectedNoteIndices(newNotes);
  };

  const handleAccidentalChange = (event: any) => {
    const incomingAccidental: Accidental = event.target.value;
    setSelectedAccidental(incomingAccidental);
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
      chord:{" "}
      {selectedNoteIndices.length === 0
        ? "UNKNOWN"
        : getChordName(
            selectedNoteIndices[0],
            selectedChordType,
            selectedAccidental
          )}{" "}
      <br />
      Notes:{" "}
      {selectedNoteIndices
        .map((one) => {
          return getNoteFromKeyAndAccidental(one, selectedAccidental);
        })
        .join("-")}
      <select onChange={handleChordTypeChange} value={selectedChordType}>
        {CHORD_TYPES.map((chord) => (
          <option key={chord} value={chord}>
            {chord}
          </option>
        ))}
      </select>
      <select onChange={handleAccidentalChange} value={selectedAccidental}>
        <option>{Accidental.Sharp}</option>
        <option>{Accidental.Flat}</option>
      </select>
    </div>
  );
};

export default ChordPresetsSelector;
