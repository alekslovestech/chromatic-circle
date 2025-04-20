import React, { ReactNode } from "react";

import { DisplayProvider } from "./DisplayContext";
import { MusicalProvider } from "./MusicalContext";
import { PresetProvider } from "./PresetContext";
import { AudioProvider } from "./AudioContext";

export const RootProvider: React.FC<{ children: ReactNode }> = ({ children }) => (
  <AudioProvider>
    <DisplayProvider>
      <MusicalProvider>
        <PresetProvider>{children}</PresetProvider>
      </MusicalProvider>
    </DisplayProvider>
  </AudioProvider>
);
