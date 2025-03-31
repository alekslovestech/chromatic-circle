import React from "react";
import { useSearchParams } from "react-router-dom";
import { RootProvider } from "./contexts/RootContext";

import AudioPlayer from "./Components/AudioPlayer";
import { KeyboardCircular } from "./Components/Circular/KeyboardCircular";
import { CircularSettings } from "./Components/Circular/CircularSettings";
import { KeyboardLinear } from "./Components/KeyboardLinear";
import SettingsContainer from "./Components/Settings/SettingsContainer";
import StaffRenderer from "./Components/StaffRenderer";

import "./styles/App.css";

const App: React.FC = () => {
  const borderStyle = { border: `1px solid var(--debug-border-color)` };
  const [searchParams] = useSearchParams();
  const isLogo = searchParams.get("mode") === "logo";
  const isAdvanced = searchParams.get("mode") === "advanced";
  console.log(`isLogo: ${isLogo}, isAdvanced: ${isAdvanced}`);

  return (
    <div className="ChromaticCircle">
      <header className="App-header" /* style={borderStyle} */>
        <RootProvider>
          <div className="grid-container" /* style={borderStyle} */>
            <div className="keyboardlinear-container" style={borderStyle}>
              <KeyboardLinear />
            </div>
            <div className="keyboardcircular-container" style={borderStyle}>
              <KeyboardCircular isLogo={isLogo} />
              {!isLogo && <CircularSettings advanced={isAdvanced} />}
            </div>
            <SettingsContainer />
            <StaffRenderer />
          </div>
          <AudioPlayer />
        </RootProvider>
      </header>
    </div>
  );
};

export default App;
