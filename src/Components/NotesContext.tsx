import React, { createContext, useState, useContext, ReactNode } from "react";
import { AccidentalType } from "../types/AccidentalType";
import { InputMode } from "../types/InputMode";
import { ActualIndex, InversionIndex, ixActualArray, ixInversion } from "../types/IndexTypes";
import { NoteGroupingId } from "../types/NoteGroupingTypes";
import { ChordDisplayMode } from "../types/ChordDisplayMode";
import { CircularVisMode } from "./Circular/CircularVisualizationsSVG";
import { calculateUpdatedIndices } from "../utils/KeyboardUtils";

interface NotesContextType {
  inputMode: InputMode;
  selectedNoteIndices: ActualIndex[];
  selectedChordType: NoteGroupingId;
  selectedAccidental: AccidentalType;
  selectedInversionIndex: InversionIndex;
  chordDisplayMode: ChordDisplayMode;
  circularVisMode: CircularVisMode;
  setInputMode: (mode: InputMode) => void;
  setSelectedNoteIndices: (indices: ActualIndex[]) => void;
  setSelectedChordType: (type: NoteGroupingId) => void;
  setSelectedAccidental: (sharpFlat: AccidentalType) => void;
  setSelectedInversionIndex: (index: InversionIndex) => void;
  setChordDisplayMode: (mode: ChordDisplayMode) => void;
  setCircularVisMode: (mode: CircularVisMode) => void;
}

const NotesContext = createContext<NotesContextType>({} as NotesContextType);

export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inputMode, setInputMode] = useState<InputMode>(InputMode.SingleNote);
  const [selectedNoteIndices, setSelectedNoteIndices] = useState<ActualIndex[]>(ixActualArray([7]));
  const [selectedChordType, setSelectedChordType] = useState<NoteGroupingId>(
    "Note" as NoteGroupingId,
  );
  const [selectedAccidental, setSelectedAccidental] = useState<AccidentalType>(
    AccidentalType.Sharp,
  );
  const [selectedInversionIndex, setSelectedInversionIndex] = useState<InversionIndex>(
    ixInversion(0),
  );
  const [chordDisplayMode, setChordDisplayMode] = useState<ChordDisplayMode>(
    ChordDisplayMode.Letters_Short,
  );
  const [circularVisMode, setCircularVisMode] = useState<CircularVisMode>(CircularVisMode.Radial);

  const handleInputModeChange = (newMode: InputMode) => {
    setInputMode(newMode);

    const rootNoteIndex = selectedNoteIndices[0] || null; // Get the index of the 0th selected note, or null if none are selected
    let newChordType: NoteGroupingId;
    let updatedIndices: ActualIndex[];
    // Reset to default preset based on mode
    switch (newMode) {
      case InputMode.IntervalPresets:
        newChordType = "Interval_Maj3" as NoteGroupingId;
        setSelectedChordType(newChordType);
        break;
      case InputMode.ChordPresets:
        newChordType = "Chord_Maj" as NoteGroupingId;
        setSelectedChordType(newChordType);
        break;
      default:
        newChordType = "Note" as NoteGroupingId;
        setSelectedChordType("Note" as NoteGroupingId);
    }

    updatedIndices = calculateUpdatedIndices(
      rootNoteIndex!,
      newMode,
      selectedNoteIndices,
      newChordType, // Use the updated chord type here
      selectedInversionIndex,
    );
    setSelectedNoteIndices(updatedIndices);
    // Reset inversion
    setSelectedInversionIndex(ixInversion(0));
  };

  const value = {
    inputMode,
    selectedNoteIndices,
    selectedChordType,
    selectedAccidental,
    selectedInversionIndex,
    chordDisplayMode,
    circularVisMode,
    setInputMode: handleInputModeChange,
    setSelectedNoteIndices,
    setSelectedChordType,
    setSelectedAccidental,
    setSelectedInversionIndex,
    setChordDisplayMode,
    setCircularVisMode,
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};

export const useNotes = () => useContext(NotesContext);
