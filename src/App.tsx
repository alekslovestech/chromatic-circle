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
  const borderStyle = { border: `1px solid var(--border-color)` };
  return (
    <div className="Chromatic">
      <header className="App-header">
        <div className="container-fluid" style={borderStyle}>
          <NotesProvider>
            <div className="row" style={borderStyle}>
              <div className="col-12" style={borderStyle}>
                <KeyboardLinear />
              </div>
              <div className="col-6" style={borderStyle}>
                <KeyboardPieSlice />
              </div>
              <div className="col-6" style={borderStyle}>
                <ModeSelector />
                <PresetsSelector />
              </div>
            </div>
            <div className="row" style={borderStyle}>
              <div className="col-6" style={borderStyle}>
                <ChordDisplay />
              </div>
              <div className="col-6" style={borderStyle}>
                <NotesRenderer />
              </div>
            </div>
            <AudioPlayer />
          </NotesProvider>
        </div>
      </header>
    </div>
  );
}

export default App;
