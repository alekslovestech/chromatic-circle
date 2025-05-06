"use client";

import React from "react";
import { RootProvider } from "../../contexts/RootContext";
import { GlobalMode } from "../../contexts/GlobalContext";
import AppContent from "../../components/AppContent";
import AudioPlayer from "../../components/AudioPlayer";

export default function DefaultMode() {
  return (
    <div className="ChromaticCircle">
      <header className="App-header">
        <RootProvider globalMode={GlobalMode.Default}>
          <AppContent />
          <AudioPlayer />
        </RootProvider>
      </header>
    </div>
  );
}
