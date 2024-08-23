import React, { createContext, useState, useContext, ReactNode } from "react";
import { Accidental } from "../types/Accidental";
import { InputMode } from "../types/InputMode";
import { ActualIndex } from "../types/IndexTypes";

interface NotesContextType {
  inputMode: InputMode;
  setInputMode: (mode: InputMode) => void;
  selectedNoteIndices: ActualIndex[];
  setSelectedNoteIndices: (indices: ActualIndex[]) => void;
  selectedChordType: string;
  setSelectedChordType: (type: string) => void;
  selectedAccidental: Accidental;
  setSelectedAccidental: (sharpFlat: Accidental) => void;
}

interface NotesProviderProps {
  children: ReactNode;
}

const defaultContextValue: NotesContextType = {
  inputMode: InputMode.Presets,
  setInputMode: () => {}, // Provide a no-op function as default
  selectedNoteIndices: [],
  setSelectedNoteIndices: () => {},
  selectedChordType: "dim",
  setSelectedChordType: () => {},
  selectedAccidental: Accidental.Sharp,
  setSelectedAccidental: () => {},
};

const NotesContext = createContext(defaultContextValue);

export const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
  const [inputMode, setInputMode] = useState<InputMode>(InputMode.Presets);
  const [selectedNoteIndices, setSelectedNoteIndices] = useState<ActualIndex[]>(
    [7]
  );
  const [selectedChordType, setSelectedChordType] = useState<string>("note");
  const [selectedAccidental, setSelectedAccidental] = useState<Accidental>(
    Accidental.Sharp
  );

  return (
    <NotesContext.Provider
      value={{
        inputMode,
        setInputMode: (mode: InputMode) => setInputMode(mode),
        selectedNoteIndices,
        setSelectedNoteIndices,
        selectedChordType,
        setSelectedChordType,
        selectedAccidental,
        setSelectedAccidental,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
