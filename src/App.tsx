import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import AudioPlayer from "./Components/AudioPlayer";
import { KeyboardCircular } from "./Components/Keyboard/Circular/KeyboardCircular";
import { CircularSettings } from "./Components/Keyboard/Circular/CircularSettings";
import { KeyboardLinear } from "./Components/Keyboard/Linear/KeyboardLinear";
import SettingsContainer from "./Components/Settings/SettingsContainer";
import StaffRenderer from "./Components/StaffRenderer";

import { RootProvider } from "./contexts/RootContext";
import { GlobalMode, useGlobal } from "./contexts/GlobalContext";

import "./styles/App.css";

const AppContent: React.FC = () => {
  const borderStyle = { border: `1px solid var(--debug-border-color)` };
  const { globalMode, setGlobalMode } = useGlobal();
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
        <RootProvider globalMode={GlobalMode.Default}>
          <AppContent />
          <AudioPlayer />
        </RootProvider>
      </header>
    </div>
  );
};

export default App;
