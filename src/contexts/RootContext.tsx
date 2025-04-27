import React, { ReactNode } from "react";

import { DisplayProvider } from "./DisplayContext";
import { MusicalProvider } from "./MusicalContext";
import { PresetProvider } from "./PresetContext";
import { AudioProvider } from "./AudioContext";
import { GlobalMode, GlobalProvider } from "./GlobalContext";

export const RootProvider: React.FC<{
  children: ReactNode;
  globalMode: GlobalMode;
}> = ({ children, globalMode }) => (
  <GlobalProvider globalMode={globalMode}>
    <MusicalProvider>
      <AudioProvider>
        <DisplayProvider>
          <PresetProvider>{children}</PresetProvider>
        </DisplayProvider>
      </AudioProvider>
    </MusicalProvider>
  </GlobalProvider>
);
