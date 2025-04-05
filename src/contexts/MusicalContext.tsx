import React, { createContext, useState, useContext, ReactNode } from "react";
import { ActualIndex, ixActualArray } from "../types/IndexTypes";
import { DEFAULT_MUSICAL_KEY, MusicalKey } from "../types/Keys/MusicalKey";

export interface MusicalSettings {
  selectedNoteIndices: ActualIndex[];
  selectedMusicalKey: MusicalKey;
  setSelectedNoteIndices: (indices: ActualIndex[]) => void;
  setSelectedMusicalKey: (key: MusicalKey) => void;
}

const MusicalContext = createContext<MusicalSettings | null>(null);

export const MusicalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedNoteIndices, setSelectedNoteIndices] = useState<ActualIndex[]>(ixActualArray([7]));
  const [selectedMusicalKey, setSelectedMusicalKey] = useState<MusicalKey>(DEFAULT_MUSICAL_KEY);

  const value: MusicalSettings = {
    selectedNoteIndices,
    selectedMusicalKey,
    setSelectedNoteIndices,
    setSelectedMusicalKey,
  };

  return <MusicalContext.Provider value={value}>{children}</MusicalContext.Provider>;
};

export const useMusical = () => {
  const context = useContext(MusicalContext);
  if (!context) {
    throw new Error("useMusical must be used within a MusicalProvider");
  }
  return context;
};
