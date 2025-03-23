import React, { ReactNode } from "react";

import { DisplayProvider } from "./DisplayContext";
import { MusicalProvider } from "./MusicalContext";
import { PresetProvider } from "./PresetContext";

export const RootProvider: React.FC<{ children: ReactNode }> = ({ children }) => (
  <DisplayProvider>
    <MusicalProvider>
      <PresetProvider>{children}</PresetProvider>
    </MusicalProvider>
  </DisplayProvider>
);
