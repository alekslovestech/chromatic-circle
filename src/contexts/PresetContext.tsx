import React, { createContext, useState, useContext, ReactNode } from "react";

import { InversionIndex, ixInversion } from "../types/IndexTypes";
import { NoteGroupingId } from "../types/NoteGroupingTypes";
import { InputMode } from "../types/SettingModes";
import { calculateUpdatedIndices } from "../utils/KeyboardUtils";

import { useMusical } from "./MusicalContext";

export interface PresetSettings {
  inputMode: InputMode;
  selectedChordType: NoteGroupingId;
  selectedInversionIndex: InversionIndex;
  setInputMode: (mode: InputMode) => void;
  setSelectedChordType: (type: NoteGroupingId) => void;
  setSelectedInversionIndex: (index: InversionIndex) => void;
}

const PresetContext = createContext<PresetSettings | null>(null);

export const PresetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inputMode, setInputMode] = useState<InputMode>(InputMode.SingleNote);
  const [selectedChordType, setSelectedChordType] = useState<NoteGroupingId>(
    "Note" as NoteGroupingId,
  );
  const [selectedInversionIndex, setSelectedInversionIndex] = useState<InversionIndex>(
    ixInversion(0),
  );

  const { selectedNoteIndices, setSelectedNoteIndices } = useMusical();

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

  const value: PresetSettings = {
    inputMode,
    selectedChordType,
    selectedInversionIndex,
    setInputMode: handleInputModeChange,
    setSelectedChordType,
    setSelectedInversionIndex,
  };

  return <PresetContext.Provider value={value}>{children}</PresetContext.Provider>;
};

export const usePreset = () => {
  const context = useContext(PresetContext);
  if (!context) {
    throw new Error("usePreset must be used within a PresetProvider");
  }
  return context;
};
