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

export interface DisplaySettings {
  circularVisMode: CircularVisMode;
  monochromeMode: boolean;
  noteDisplayMode: NoteDisplayMode;
  chordDisplayMode: ChordDisplayMode;

  setCircularVisMode: (mode: CircularVisMode) => void;
  setMonochromeMode: (mode: boolean) => void;
  setNoteDisplayMode: (mode: NoteDisplayMode) => void;
  setChordDisplayMode: (mode: ChordDisplayMode) => void;
}
export interface MusicalSettings {
  selectedNoteIndices: ActualIndex[];
  selectedMusicalKey: MusicalKey;

  setSelectedNoteIndices: (indices: ActualIndex[]) => void;
  setSelectedMusicalKey: (key: MusicalKey) => void;
}
export interface PresetSettings {
  inputMode: InputMode;
  selectedChordType: NoteGroupingId;
  selectedInversionIndex: InversionIndex;

  setInputMode: (mode: InputMode) => void;
  setSelectedChordType: (type: NoteGroupingId) => void;
  setSelectedInversionIndex: (index: InversionIndex) => void;
}

interface NotesContextType extends DisplaySettings, MusicalSettings, PresetSettings {}

const NotesContext = createContext<NotesContextType>({} as NotesContextType);

export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Display Settings
  const [circularVisMode, setCircularVisMode] = useState<CircularVisMode>(CircularVisMode.None);
  const [monochromeMode, setMonochromeMode] = useState<boolean>(false);
  const [noteDisplayMode, setNoteDisplayMode] = useState<NoteDisplayMode>(NoteDisplayMode.Letters);
  const [chordDisplayMode, setChordDisplayMode] = useState<ChordDisplayMode>(
    ChordDisplayMode.Letters_Short,
  );

  // Musical Settings
  const [selectedNoteIndices, setSelectedNoteIndices] = useState<ActualIndex[]>(ixActualArray([7]));
  const [selectedMusicalKey, setSelectedMusicalKey] = useState<MusicalKey>(
    MusicalKeyUtil.defaultMusicalKey,
  );

  // Preset Settings
  const [inputMode, setInputMode] = useState<InputMode>(InputMode.SingleNote);
  const [selectedChordType, setSelectedChordType] = useState<NoteGroupingId>(
    "Note" as NoteGroupingId,
  );
  const [selectedInversionIndex, setSelectedInversionIndex] = useState<InversionIndex>(
    ixInversion(0),
  );

  const handleInputModeChange = (newMode: InputMode) => {
    setInputMode(newMode);

    const rootNoteIndex = selectedNoteIndices[0] || null;
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
  };

  const value = {
    // Display Settings
    circularVisMode,
    monochromeMode,
    noteDisplayMode,
    chordDisplayMode,
    setCircularVisMode,
    setMonochromeMode,
    setNoteDisplayMode,
    setChordDisplayMode,

    // Musical Settings
    selectedNoteIndices,
    selectedMusicalKey,
    setSelectedNoteIndices,
    setSelectedMusicalKey,

    // Preset Settings
    inputMode,
    selectedChordType,
    selectedInversionIndex,
    setInputMode: handleInputModeChange,
    setSelectedChordType,
    setSelectedInversionIndex,
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};

export const useNotes = () => useContext(NotesContext);
