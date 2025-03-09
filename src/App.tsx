import "./styles/App.css";
import { NotesProvider } from "./Components/NotesContext";
import KeyboardLinear from "./Components/KeyboardLinear";
import StaffRenderer from "./Components/StaffRenderer";
import { ChordNameDisplay } from "./Components/ChordNameDisplay";
import AudioPlayer from "./Components/AudioPlayer";
import KeyboardCircular from "./Components/Circular/KeyboardCircular";
import { CircularSettings } from "./Components/Circular/CircularSettings";

import React from "react";
import SettingsContainer from "./Components/Settings/SettingsContainer";

const isLogo = process.env.REACT_APP_IS_LOGO === "true";

const App: React.FC = () => {
  const borderStyle = { border: `1px solid var(--debug-border-color)` };

  console.log(`isLogo: ${isLogo}`);

  return (
    <div className="ChromaticCircle">
      <header className="App-header" /* style={borderStyle} */>
        <NotesProvider>
          <div className="grid-container" /* style={borderStyle} */>
            <div className="keyboardlinear-container" style={borderStyle}>
              <KeyboardLinear />
            </div>
            <div className="keyboardcircular-container" style={borderStyle}>
              {isLogo ? (
                <KeyboardCircular isLogo={true} />
              ) : (
                <>
                  <CircularSettings />
                  <KeyboardCircular />
                </>
              )}
            </div>
            <SettingsContainer />
            <StaffRenderer />
          </div>
          <AudioPlayer />
        </NotesProvider>
      </header>
    </div>
  );
};

export default App;
