"use client";

import React, { createContext, useContext, useState } from "react";
import { InputMode } from "../types/SettingModes";

interface PresetContextType {
  inputMode: InputMode;
  setInputMode: (mode: InputMode) => void;
  selectedPreset: string;
  setSelectedPreset: (preset: string) => void;
}

const PresetContext = createContext<PresetContextType | undefined>(undefined);

export const usePreset = () => {
  const context = useContext(PresetContext);
  if (!context) {
    throw new Error("usePreset must be used within a PresetProvider");
  }
  return context;
};

export const PresetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inputMode, setInputMode] = useState<InputMode>(InputMode.Free);
  const [selectedPreset, setSelectedPreset] = useState("");

  return (
    <PresetContext.Provider
      value={{
        inputMode,
        setInputMode,
        selectedPreset,
        setSelectedPreset,
      }}
    >
      {children}
    </PresetContext.Provider>
  );
};
