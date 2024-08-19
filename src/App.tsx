import React from "react";
import logo from "./logo.svg";
import "./styles/App.css";
import { NotesProvider } from "./Components/NotesContext";
import ChromaticCircle from "./Components/ChromaticCircle";
import AudioPlayer from "./Components/AudioPlayer";
import ModeSelector from "./Components/ModeSelector";
import ChordPresetsSelector from "./Components/ChordPresetsSelector";
import NotesRenderer from "./Components/NotesRenderer";
import PianoKeyboard from "./Components/PianoKeyboard";
import "./styles/PianoKeyboard.css";
import "./styles/ChromaticCircle.css";
import "./styles/Colors.css";
import "./styles/AccidentalToggle.css";
import AccidentalToggle from "./Components/AccidentalToggle";
import { getComputedColor } from "./utils/ColorUtils";

function App() {
  return (
    <div className="Chromatic">
      <header className="App-header">
        <h3>Chromatic Circle</h3>
        <NotesProvider>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0px",
              marginBottom: "5px",
            }}
          >
            <PianoKeyboard />
            <ChromaticCircle />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0px",
              margin: "0",
            }}
          >
            <NotesRenderer />
            <AudioPlayer />
          </div>
          <ChordPresetsSelector />
          <ModeSelector />
          <div className="accidental-toggle" style = {{ 
            color: getComputedColor(`--key-black-bg`)
          }}>          
            <AccidentalToggle  />
          </div>
        </NotesProvider>
      </header>
    </div>
  );
}

export default App;
