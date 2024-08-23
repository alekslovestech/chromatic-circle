import React from "react";
import "./styles/App.css";
import { NotesProvider } from "./Components/NotesContext";
import PianoKeyboard from "./Components/PianoKeyboard";
import ChromaticCircle from "./Components/ChromaticCircle";
import NotesRenderer from "./Components/NotesRenderer";
import ChordDisplay from "./Components/ChordNameDisplay";
import ChordPresetsSelector from "./Components/ChordPresetsSelector";
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
                <PianoKeyboard />
              </div>
              <div className="chromatic-circle-container">
                <ChromaticCircle />
              </div>
              <div className="notes-renderer">
                <NotesRenderer />
              </div>
            </div>
            <div className="settings-column">
              <AccidentalToggle />
              <ModeSelector />
              <ChordPresetsSelector />
              <AudioPlayer />
              <ChordDisplay />
            </div>
          </div>
        </NotesProvider>
      </header>
    </div>
  );
}

export default App;
