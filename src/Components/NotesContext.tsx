import React, { createContext, useState, useContext, ReactNode } from "react";
import { Accidental } from "../types/Accidental";
import { InputMode } from "../types/InputMode";
import { ActualIndex, InversionIndex, ixActualArray, ixInversion } from "../types/IndexTypes";
import { NoteGroupingId } from "../types/NoteGrouping";
import { ChordDisplayMode } from "../types/ChordDisplayMode";

interface NotesContextType {
  inputMode: InputMode;
  selectedNoteIndices: ActualIndex[];
  selectedChordType: NoteGroupingId;
  selectedAccidental: Accidental;
  selectedInversionIndex: InversionIndex;
  chordDisplayMode: ChordDisplayMode;
  setInputMode: (mode: InputMode) => void;
  setSelectedNoteIndices: (indices: ActualIndex[]) => void;
  setSelectedChordType: (type: NoteGroupingId) => void;
  setSelectedAccidental: (sharpFlat: Accidental) => void;
  setSelectedInversionIndex: (index: InversionIndex) => void;
  setChordDisplayMode: (mode: ChordDisplayMode) => void;
}

const NotesContext = createContext<NotesContextType>({} as NotesContextType);

export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inputMode, setInputMode] = useState<InputMode>(InputMode.SingleNote);
  const [selectedNoteIndices, setSelectedNoteIndices] = useState<ActualIndex[]>(ixActualArray([7]));
  const [selectedChordType, setSelectedChordType] = useState<NoteGroupingId>(
    "Note" as NoteGroupingId,
  );
  const [selectedAccidental, setSelectedAccidental] = useState<Accidental>(Accidental.Sharp);
  const [selectedInversionIndex, setSelectedInversionIndex] = useState<InversionIndex>(
    ixInversion(0),
  );
  const [chordDisplayMode, setChordDisplayMode] = useState<ChordDisplayMode>(
    ChordDisplayMode.Verbose,
  );

  const value = {
    inputMode,
    selectedNoteIndices,
    selectedChordType,
    selectedAccidental,
    selectedInversionIndex,
    chordDisplayMode,
    setInputMode,
    setSelectedNoteIndices,
    setSelectedChordType,
    setSelectedAccidental,
    setSelectedInversionIndex,
    setChordDisplayMode,
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};

export const useNotes = () => useContext(NotesContext);
