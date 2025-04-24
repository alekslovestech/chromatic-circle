import React, { ReactNode } from "react";

import { DisplayProvider } from "./DisplayContext";
import { MusicalProvider } from "./MusicalContext";
import { PresetProvider } from "./PresetContext";
import { AudioProvider } from "./AudioContext";

export const RootProvider: React.FC<{ children: ReactNode }> = ({ children }) => (
  <MusicalProvider>
    <AudioProvider>
      <DisplayProvider>
        <PresetProvider>{children}</PresetProvider>
      </DisplayProvider>
    </AudioProvider>
  </MusicalProvider>
);
