import React from "react";

import { RootProvider } from "./contexts/RootContext";

import AudioPlayer from "./Components/AudioPlayer";
import KeyboardCircular from "./Components/Circular/KeyboardCircular";
import { CircularSettings } from "./Components/Circular/CircularSettings";
import KeyboardLinear from "./Components/KeyboardLinear";
import SettingsContainer from "./Components/Settings/SettingsContainer";
import StaffRenderer from "./Components/StaffRenderer";

import "./styles/App.css";

const isLogo = process.env.REACT_APP_IS_LOGO === "true";

const App: React.FC = () => {
  const borderStyle = { border: `1px solid var(--debug-border-color)` };

  console.log(`isLogo: ${isLogo}`);

  return (
    <div className="ChromaticCircle">
      <header className="App-header" /* style={borderStyle} */>
        <RootProvider>
          <div className="grid-container" /* style={borderStyle} */>
            <div className="keyboardlinear-container" style={borderStyle}>
              <KeyboardLinear />
            </div>
            <div className="keyboardcircular-container" style={borderStyle}>
              {isLogo ? (
                <KeyboardCircular isLogo={true} />
              ) : (
                <>
                  <KeyboardCircular />
                  <CircularSettings />
                </>
              )}
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
