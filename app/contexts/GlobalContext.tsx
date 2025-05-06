"use client";

import React, { createContext, useContext, useState } from "react";

export enum GlobalMode {
  Default = "default",
  Advanced = "advanced",
}

interface GlobalContextType {
  globalMode: GlobalMode;
  setGlobalMode: (mode: GlobalMode) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};

export const GlobalProvider: React.FC<{
  children: React.ReactNode;
  initialMode?: GlobalMode;
}> = ({ children, initialMode = GlobalMode.Default }) => {
  const [globalMode, setGlobalMode] = useState<GlobalMode>(initialMode);

  return (
    <GlobalContext.Provider value={{ globalMode, setGlobalMode }}>
      {children}
    </GlobalContext.Provider>
  );
};
