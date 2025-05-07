"use client";

import React, { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import AudioPlayer from "../components/AudioPlayer";
import { KeyboardCircular } from "../components/Keyboard/Circular/KeyboardCircular";
import { CircularSettings } from "../components/Keyboard/Circular/CircularSettings";
import { KeyboardLinear } from "../components/Keyboard/Linear/KeyboardLinear";
import SettingsContainer from "../components/Settings/SettingsContainer";
import StaffRenderer from "../components/StaffRenderer";

import { RootProvider } from "../contexts/RootContext";
import { GlobalMode, useGlobal } from "../contexts/GlobalContext";

import "./styles/App.css";

const AppContent: React.FC = () => {
  const borderStyle = { border: `1px solid var(--debug-border-color)` };
  const { globalMode, setGlobalMode } = useGlobal();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  useEffect(() => {
    if (mode === "logo") {
      setGlobalMode(GlobalMode.Logo);
    } else if (mode === "advanced") {
      setGlobalMode(GlobalMode.Advanced);
    } else {
      setGlobalMode(GlobalMode.Default);
    }
  }, [mode, setGlobalMode]);

  return (
    <div className="grid-container">
      <div className="keyboardlinear-container" style={borderStyle}>
        <KeyboardLinear />
      </div>
      <div className="keyboardcircular-container" style={borderStyle}>
        <KeyboardCircular />
        {globalMode !== GlobalMode.Logo && <CircularSettings />}
      </div>
      <SettingsContainer />
      <StaffRenderer />
    </div>
  );
};

export default function Home() {
  return (
    <div className="ChromaticCircle">
      <header className="App-header">
        <RootProvider globalMode={GlobalMode.Default}>
          <Suspense fallback={<div>Loading...</div>}>
            <AppContent />
          </Suspense>
          <AudioPlayer />
        </RootProvider>
      </header>
    </div>
  );
}
