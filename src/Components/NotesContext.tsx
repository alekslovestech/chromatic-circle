import React, { createContext, useState, useContext, ReactNode } from "react";
import { ActualIndex, InversionIndex, ixActualArray, ixInversion } from "../types/IndexTypes";
import { NoteGroupingId } from "../types/NoteGroupingTypes";
import {
  InputMode,
  ChordDisplayMode,
  CircularVisMode,
  NoteDisplayMode,
} from "../types/SettingModes";
import { calculateUpdatedIndices } from "../utils/KeyboardUtils";
import { MusicalKey, MusicalKeyUtil } from "../types/MusicalKey";

interface NotesContextType {
  inputMode: InputMode;
  selectedNoteIndices: ActualIndex[];
  selectedChordType: NoteGroupingId;
  selectedInversionIndex: InversionIndex;
  chordDisplayMode: ChordDisplayMode;
  monochromeMode: boolean;
  circularVisMode: CircularVisMode;
  noteDisplayMode: NoteDisplayMode;
  selectedMusicalKey: MusicalKey;
  setInputMode: (mode: InputMode) => void;
  setSelectedNoteIndices: (indices: ActualIndex[]) => void;
  setSelectedChordType: (type: NoteGroupingId) => void;
  setSelectedInversionIndex: (index: InversionIndex) => void;
  setChordDisplayMode: (mode: ChordDisplayMode) => void;
  setMonochromeMode: (mode: boolean) => void;
  setCircularVisMode: (mode: CircularVisMode) => void;
  setNoteDisplayMode: (mode: NoteDisplayMode) => void;
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
  const [monochromeMode, setMonochromeMode] = useState<boolean>(false);
  const [circularVisMode, setCircularVisMode] = useState<CircularVisMode>(CircularVisMode.None);
  const [selectedMusicalKey, setSelectedMusicalKey] = useState<MusicalKey>(
    MusicalKeyUtil.defaultMusicalKey,
  );
  const [noteDisplayMode, setNoteDisplayMode] = useState<NoteDisplayMode>(NoteDisplayMode.Letters);

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
    monochromeMode,
    circularVisMode,
    noteDisplayMode,
    selectedMusicalKey,
    setInputMode: handleInputModeChange,
    setSelectedNoteIndices,
    setSelectedChordType,
    setSelectedInversionIndex,
    setChordDisplayMode,
    setMonochromeMode,
    setCircularVisMode,
    setNoteDisplayMode,
    setSelectedMusicalKey,
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};

export const useNotes = () => useContext(NotesContext);
