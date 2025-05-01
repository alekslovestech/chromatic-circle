import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { CircularVisMode, ChordDisplayMode, KeyDisplayMode } from "../types/SettingModes";
import { GlobalMode, useGlobal } from "./GlobalContext";

export interface DisplaySettings {
  circularVisMode: CircularVisMode;
  monochromeMode: boolean;
  scalePreviewMode: boolean;
  keyTextMode: KeyDisplayMode;
  chordDisplayMode: ChordDisplayMode;
  setCircularVisMode: (mode: CircularVisMode) => void;
  setMonochromeMode: (mode: boolean) => void;
  setScalePreviewMode: (mode: boolean) => void;
  setKeyTextMode: (mode: KeyDisplayMode) => void;
  setChordDisplayMode: (mode: ChordDisplayMode) => void;
}

const DisplayContext = createContext<DisplaySettings | null>(null);

export const DisplayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [circularVisMode, setCircularVisMode] = useState<CircularVisMode>(CircularVisMode.None);
  const [monochromeMode, setMonochromeMode] = useState<boolean>(false);
  const [scalePreviewMode, setScalePreviewMode] = useState<boolean>(false);
  const [keyTextMode, setKeyTextMode] = useState<KeyDisplayMode>(KeyDisplayMode.NoteNames);
  const [chordDisplayMode, setChordDisplayMode] = useState<ChordDisplayMode>(
    ChordDisplayMode.Letters_Short,
  );

  // Get globalMode from context
  const { globalMode } = useGlobal();

  // Use useEffect to update display settings when globalMode changes
  useEffect(() => {
    if (globalMode === GlobalMode.Advanced) {
      setMonochromeMode(true);
      setKeyTextMode(KeyDisplayMode.ScaleDegree);
      setCircularVisMode(CircularVisMode.Polygon);
      //setScalePreviewMode(true);
    }
  }, [globalMode]);

  const value: DisplaySettings = {
    circularVisMode,
    monochromeMode,
    scalePreviewMode,
    keyTextMode,
    chordDisplayMode,
    setCircularVisMode,
    setMonochromeMode,
    setScalePreviewMode,
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
