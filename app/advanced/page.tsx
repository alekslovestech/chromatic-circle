"use client";

import React from "react";
import { RootProvider } from "../../contexts/RootContext";
import { GlobalMode } from "../../contexts/GlobalContext";
import AppContent from "../../components/AppContent";
import AudioPlayer from "../../components/AudioPlayer";

export default function AdvancedMode() {
  return (
    <div className="ChromaticCircle">
      <header className="App-header">
        <RootProvider globalMode={GlobalMode.Advanced}>
          <AppContent />
          <AudioPlayer />
        </RootProvider>
      </header>
    </div>
  );
}
