import React, { createContext, useState, useContext, ReactNode } from "react";
import { CircularVisMode, ChordDisplayMode, NoteDisplayMode } from "../types/SettingModes";

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

const DisplayContext = createContext<DisplaySettings | null>(null);

export const DisplayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [circularVisMode, setCircularVisMode] = useState<CircularVisMode>(CircularVisMode.None);
  const [monochromeMode, setMonochromeMode] = useState<boolean>(false);
  const [noteDisplayMode, setNoteDisplayMode] = useState<NoteDisplayMode>(NoteDisplayMode.Letters);
  const [chordDisplayMode, setChordDisplayMode] = useState<ChordDisplayMode>(
    ChordDisplayMode.Letters_Short,
  );

  const value: DisplaySettings = {
    circularVisMode,
    monochromeMode,
    noteDisplayMode,
    chordDisplayMode,
    setCircularVisMode,
    setMonochromeMode,
    setNoteDisplayMode,
    setChordDisplayMode,
  };

  return <DisplayContext.Provider value={value}>{children}</DisplayContext.Provider>;
};

export const useDisplay = () => {
  const context = useContext(DisplayContext);
  if (!context) {
    throw new Error("useDisplay must be used within a DisplayProvider");
  }
  return context;
};
