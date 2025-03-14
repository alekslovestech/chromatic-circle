import React, { createContext, useState, useContext, ReactNode } from "react";
import { InputMode } from "../types/InputMode";
import { ActualIndex, InversionIndex, ixActualArray, ixInversion } from "../types/IndexTypes";
import { NoteGroupingId } from "../types/NoteGroupingTypes";
import { ChordDisplayMode } from "../types/ChordDisplayMode";
import { CircularVisMode } from "../utils/Circular/CircularVisMode";
import { calculateUpdatedIndices } from "../utils/KeyboardUtils";
import { MusicalKey, MusicalKeyUtil } from "../types/MusicalKey";

interface NotesContextType {
  inputMode: InputMode;
  selectedNoteIndices: ActualIndex[];
  selectedChordType: NoteGroupingId;
  selectedInversionIndex: InversionIndex;
  chordDisplayMode: ChordDisplayMode;
  circularVisMode: CircularVisMode;
  selectedMusicalKey: MusicalKey;
  setInputMode: (mode: InputMode) => void;
  setSelectedNoteIndices: (indices: ActualIndex[]) => void;
  setSelectedChordType: (type: NoteGroupingId) => void;
  setSelectedInversionIndex: (index: InversionIndex) => void;
  setChordDisplayMode: (mode: ChordDisplayMode) => void;
  setCircularVisMode: (mode: CircularVisMode) => void;
  setSelectedMusicalKey: (key: MusicalKey) => void;
}

const NotesContext = createContext<NotesContextType>({} as NotesContextType);

export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inputMode, setInputMode] = useState<InputMode>(InputMode.SingleNote);
  const [selectedNoteIndices, setSelectedNoteIndices] = useState<ActualIndex[]>(ixActualArray([7]));
  const [selectedChordType, setSelectedChordType] = useState<NoteGroupingId>(
    "Note" as NoteGroupingId,
  );
  const [selectedInversionIndex, setSelectedInversionIndex] = useState<InversionIndex>(
    ixInversion(0),
  );
  const [chordDisplayMode, setChordDisplayMode] = useState<ChordDisplayMode>(
    ChordDisplayMode.Letters_Short,
  );
  const [circularVisMode, setCircularVisMode] = useState<CircularVisMode>(CircularVisMode.None);
  const [selectedMusicalKey, setSelectedMusicalKey] = useState<MusicalKey>(
    MusicalKeyUtil.defaultMusicalKey,
  );

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
    selectedInversionIndex,
    chordDisplayMode,
    circularVisMode,
    selectedMusicalKey,
    setInputMode: handleInputModeChange,
    setSelectedNoteIndices,
    setSelectedChordType,
    setSelectedInversionIndex,
    setChordDisplayMode,
    setCircularVisMode,
    setSelectedMusicalKey,
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};

export const useNotes = () => useContext(NotesContext);
