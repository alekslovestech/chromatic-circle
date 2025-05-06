"use client";

import React from "react";
import { GlobalProvider, GlobalMode } from "./GlobalContext";
import { AudioProvider } from "./AudioContext";
import { MusicalProvider } from "./MusicalContext";
import { DisplayProvider } from "./DisplayContext";
import { PresetProvider } from "./PresetContext";

interface RootProviderProps {
  children: React.ReactNode;
  globalMode?: GlobalMode;
}

export const RootProvider: React.FC<RootProviderProps> = ({ children, globalMode }) => {
  return (
    <GlobalProvider initialMode={globalMode}>
      <MusicalProvider>
        <AudioProvider>
          <DisplayProvider>
            <PresetProvider>{children}</PresetProvider>
          </DisplayProvider>
        </AudioProvider>
      </MusicalProvider>
    </GlobalProvider>
  );
};
