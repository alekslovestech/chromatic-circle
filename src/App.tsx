import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import AudioPlayer from "./Components/AudioPlayer";
import { KeyboardCircular } from "./Components/Circular/KeyboardCircular";
import { CircularSettings } from "./Components/Circular/CircularSettings";
import { KeyboardLinear } from "./Components/Linear/KeyboardLinear";
import SettingsContainer from "./Components/Settings/SettingsContainer";
import StaffRenderer from "./Components/StaffRenderer";

import { GlobalMode } from "./types/SettingModes";
import { useDisplay } from "./contexts/DisplayContext";
import { RootProvider } from "./contexts/RootContext";

import "./styles/App.css";

const AppContent: React.FC = () => {
  const borderStyle = { border: `1px solid var(--debug-border-color)` };
  const { globalMode, setGlobalMode } = useDisplay();
  const [searchParams] = useSearchParams();
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
    <div className="grid-container" /* style={borderStyle} */>
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

const App: React.FC = () => {
  return (
    <div className="ChromaticCircle">
      <header className="App-header">
        <RootProvider>
          <AppContent />
          <AudioPlayer />
        </RootProvider>
      </header>
    </div>
  );
};

export default App;
