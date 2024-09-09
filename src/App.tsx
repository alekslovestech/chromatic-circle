import React from "react";
import "./styles/App.css";
import { NotesProvider } from "./Components/NotesContext";
import KeyboardLinear from "./Components/KeyboardLinear";
import KeyboardCircular from "./Components/KeyboardCircular";
import NotesRenderer from "./Components/NotesRenderer";
import ChordDisplay from "./Components/ChordNameDisplay";
import PresetsSelector from "./Components/PresetsSelector";
import ModeSelector from "./Components/ModeSelector";
import AccidentalToggle from "./Components/AccidentalToggle";
import AudioPlayer from "./Components/AudioPlayer";

function App() {
  return (
    <div className="Chromatic">
      <header className="App-header">
        <h3>Chromatic Circle</h3>
        <NotesProvider>
          <div className="main-layout">
            <div className="grid-layout">
              <div className="piano-keyboard-container">
                <KeyboardLinear />
              </div>
              <div className="chromatic-circle-container">
                <KeyboardCircular />
              </div>
              <div className="notesAndChordContainer">
                <NotesRenderer />
                <ChordDisplay />
              </div>
            </div>
            <div className="settings-column">
              <AccidentalToggle />
              <ModeSelector />
              <PresetsSelector />
              <AudioPlayer />
            </div>
          </div>
        </NotesProvider>
      </header>
    </div>
  );
}

export default App;
