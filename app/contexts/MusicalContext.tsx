"use client";

import React, { createContext, useContext, useState } from "react";

interface MusicalContextType {
  selectedIndices: number[];
  setSelectedIndices: (indices: number[]) => void;
}

const MusicalContext = createContext<MusicalContextType | undefined>(undefined);

export const useMusical = () => {
  const context = useContext(MusicalContext);
  if (!context) {
    throw new Error("useMusical must be used within a MusicalProvider");
  }
  return context;
};

export const MusicalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  return (
    <MusicalContext.Provider value={{ selectedIndices, setSelectedIndices }}>
      {children}
    </MusicalContext.Provider>
  );
};
