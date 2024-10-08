import React from "react";
import "./styles/App.css";
import { NotesProvider } from "./Components/NotesContext";
import KeyboardLinear from "./Components/KeyboardLinear";
import KeyboardCircular from "./Components/KeyboardCircular";
import NotesRenderer from "./Components/NotesRenderer";
import ChordDisplay from "./Components/ChordNameDisplay";
import PresetsSelector from "./Components/PresetsSelector";
import ModeSelector from "./Components/ModeSelector";
import AudioPlayer from "./Components/AudioPlayer";
import KeyboardPieSlice from "./Components/KeyboardPieSlice";

function App() {
  return (
    <div className="Chromatic">
      <header className="App-header">
        <NotesProvider>
          <div className="main-layout">
            {" "}
            {/* 
          1. Do the first round with components in 1 column. 
          2. Divs fill the whole width 100% 
          3. use bootstrap 
          4. add grid-bootstrap class to page */}
            <div className="grid-layout">
              <div className="keyboardlinear-container">
                <KeyboardLinear />
              </div>
              <KeyboardPieSlice />
              {/* <div className="keyboardcircular-container">
                <KeyboardCircular />
              </div> */}

              <div className="notes-renderer-container">
                <NotesRenderer />
              </div>
              <div className="chords-names-display-container">
                <ChordDisplay />
              </div>
              <div className="mode-selector-container">
                <ModeSelector />
              </div>
              <div className="presets-selector">
                <PresetsSelector />
              </div>
            </div>
            <div className="settings-column">
              <AudioPlayer />
            </div>
          </div>
        </NotesProvider>
      </header>
    </div>
  );
}

export default App;
