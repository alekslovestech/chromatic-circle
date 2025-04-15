import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { CircularVisMode, ChordDisplayMode, KeyTextMode, GlobalMode } from "../types/SettingModes";

export interface DisplaySettings {
  circularVisMode: CircularVisMode;
  monochromeMode: boolean;
  scalePreviewMode: boolean;
  keyTextMode: KeyTextMode;
  chordDisplayMode: ChordDisplayMode;
  globalMode: GlobalMode;
  setCircularVisMode: (mode: CircularVisMode) => void;
  setMonochromeMode: (mode: boolean) => void;
  setScalePreviewMode: (mode: boolean) => void;
  setKeyTextMode: (mode: KeyTextMode) => void;
  setChordDisplayMode: (mode: ChordDisplayMode) => void;
  setGlobalMode: (mode: GlobalMode) => void;
}

const DisplayContext = createContext<DisplaySettings | null>(null);

export const DisplayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [circularVisMode, setCircularVisMode] = useState<CircularVisMode>(CircularVisMode.None);
  const [monochromeMode, setMonochromeMode] = useState<boolean>(false);
  const [scalePreviewMode, setScalePreviewMode] = useState<boolean>(false);
  const [keyTextMode, setKeyTextMode] = useState<KeyTextMode>(KeyTextMode.NoteNames);
  const [chordDisplayMode, setChordDisplayMode] = useState<ChordDisplayMode>(
    ChordDisplayMode.Letters_Short,
  );
  const [globalMode, setGlobalMode] = useState<GlobalMode>(GlobalMode.Default);

  // Set monochromeMode to true when in Advanced mode
  useEffect(() => {
    if (globalMode === GlobalMode.Advanced) {
      setMonochromeMode(true);
      setKeyTextMode(KeyTextMode.ScaleDegree);
      setCircularVisMode(CircularVisMode.Polygon);
      setScalePreviewMode(true);
    }
  }, [globalMode]);

  const value: DisplaySettings = {
    circularVisMode,
    monochromeMode,
    scalePreviewMode,
    keyTextMode,
    chordDisplayMode,
    globalMode,
    setCircularVisMode,
    setMonochromeMode,
    setScalePreviewMode,
    setKeyTextMode,
    setChordDisplayMode,
    setGlobalMode,
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
