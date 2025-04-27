import React, { createContext, useContext, useState, ReactNode } from "react";

export enum GlobalMode {
  Default = "Default",
  Logo = "Logo",
  Advanced = "Advanced",
}

interface GlobalContextType {
  globalMode: GlobalMode;
  setGlobalMode: (mode: GlobalMode) => void;
}

const GlobalContext = createContext<GlobalContextType | null>(null);

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};

export const GlobalProvider: React.FC<{
  children: ReactNode;
  globalMode: GlobalMode;
}> = ({ children, globalMode: initialMode }) => {
  const [globalMode, setGlobalMode] = useState<GlobalMode>(initialMode);

  const value: GlobalContextType = {
    globalMode,
    setGlobalMode,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};
