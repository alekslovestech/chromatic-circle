import React, { createContext, useState, useContext, ReactNode } from "react";
import { Accidental } from "../types/Accidental";

interface NotesContextType {
  inputMode: string;
  setInputMode: (mode: string) => void;
  selectedNoteIndices: number[];
  setSelectedNoteIndices: (indices: number[]) => void;
  selectedChordType: string;
  setSelectedChordType: (type: string) => void;
  selectedAccidental: Accidental;
  setSelectedAccidental: (sharpFlat: Accidental) => void;
}

interface NotesProviderProps {
  children: ReactNode;
}

const defaultContextValue: NotesContextType = {
  inputMode: "CIRCLE_INPUT",
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
  const [inputMode, setInputMode] = useState<string>("CHORD_PRESETS");
  const [selectedNoteIndices, setSelectedNoteIndices] = useState<number[]>([7]);
  const [selectedChordType, setSelectedChordType] = useState<string>("note");
  const [selectedAccidental, setSelectedAccidental] = useState<Accidental>(
    Accidental.Sharp
  );

  return (
    <NotesContext.Provider
      value={{
        inputMode,
        setInputMode,
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
