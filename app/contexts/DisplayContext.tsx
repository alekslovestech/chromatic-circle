"use client";

import React, { createContext, useContext, useState } from "react";

export enum NoteDisplayMode {
  Letters = "letters",
  Numbers = "numbers",
  Solfege = "solfege",
}

interface DisplayContextType {
  noteDisplayMode: NoteDisplayMode;
  setNoteDisplayMode: (mode: NoteDisplayMode) => void;
  isMonochrome: boolean;
  setIsMonochrome: (value: boolean) => void;
}

const DisplayContext = createContext<DisplayContextType | undefined>(undefined);

export const useDisplay = () => {
  const context = useContext(DisplayContext);
  if (!context) {
    throw new Error("useDisplay must be used within a DisplayProvider");
  }
  return context;
};

export const DisplayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [noteDisplayMode, setNoteDisplayMode] = useState<NoteDisplayMode>(NoteDisplayMode.Letters);
  const [isMonochrome, setIsMonochrome] = useState(false);

  return (
    <DisplayContext.Provider
      value={{
        noteDisplayMode,
        setNoteDisplayMode,
        isMonochrome,
        setIsMonochrome,
      }}
    >
      {children}
    </DisplayContext.Provider>
  );
};
