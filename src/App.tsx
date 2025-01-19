import "./styles/App.css";
import { NotesProvider } from "./Components/NotesContext";
import KeyboardLinear from "./Components/KeyboardLinear";
import StaffRenderer from "./Components/StaffRenderer";
import ChordDisplay from "./Components/ChordNameDisplay";
import AudioPlayer from "./Components/AudioPlayer";
import KeyboardCircular from "./Components/Circular/KeyboardCircular";
import { CircularTopBar } from "./Components/Circular/CircularTopBar";

import React from "react";
import KeyboardLogo from "./Components/Circular/KeyboardLogo";
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
                <KeyboardLogo />
              ) : (
                <>
                  <CircularTopBar />
                  <KeyboardCircular />
                  <ChordDisplay />
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
