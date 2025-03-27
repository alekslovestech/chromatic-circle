import React, { createContext, useState, useContext, ReactNode } from "react";
import { CircularVisMode, ChordDisplayMode, KeyTextMode } from "../types/SettingModes";

export interface DisplaySettings {
  circularVisMode: CircularVisMode;
  monochromeMode: boolean;
  keyTextMode: KeyTextMode;
  chordDisplayMode: ChordDisplayMode;
  setCircularVisMode: (mode: CircularVisMode) => void;
  setMonochromeMode: (mode: boolean) => void;
  setKeyTextMode: (mode: KeyTextMode) => void;
  setChordDisplayMode: (mode: ChordDisplayMode) => void;
}

const DisplayContext = createContext<DisplaySettings | null>(null);

export const DisplayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [circularVisMode, setCircularVisMode] = useState<CircularVisMode>(CircularVisMode.None);
  const [monochromeMode, setMonochromeMode] = useState<boolean>(false);
  const [keyTextMode, setKeyTextMode] = useState<KeyTextMode>(KeyTextMode.NoteNames);
  const [chordDisplayMode, setChordDisplayMode] = useState<ChordDisplayMode>(
    ChordDisplayMode.Letters_Short,
  );

  const value: DisplaySettings = {
    circularVisMode,
    monochromeMode,
    keyTextMode,
    chordDisplayMode,
    setCircularVisMode,
    setMonochromeMode,
    setKeyTextMode,
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
