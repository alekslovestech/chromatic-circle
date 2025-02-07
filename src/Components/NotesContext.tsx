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

    newChordType =
      newMode === InputMode.IntervalPresets
        ? ("Interval_Maj3" as NoteGroupingId)
        : newMode === InputMode.ChordPresets
        ? ("Chord_Maj" as NoteGroupingId)
        : newMode === InputMode.SingleNote
        ? ("Note" as NoteGroupingId)
        : selectedChordType;

    setSelectedChordType(newChordType);
    setSelectedInversionIndex(ixInversion(0));

    if (newMode !== InputMode.Toggle) {
      const updatedIndices = calculateUpdatedIndices(
        rootNoteIndex!,
        newMode,
        selectedNoteIndices,
        newChordType,
        ixInversion(0),
      );
      setSelectedNoteIndices(updatedIndices);
    }

    setSelectedChordType(newChordType);
    setSelectedInversionIndex(ixInversion(0));

    if (newMode !== InputMode.Toggle) {
      const updatedIndices = calculateUpdatedIndices(
        rootNoteIndex!,
        newMode,
        selectedNoteIndices,
        newChordType,
        ixInversion(0),
      );
      setSelectedNoteIndices(updatedIndices);
    }
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
