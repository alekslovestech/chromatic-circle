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
        <div className="container-fluid" style={{ border: "1px solid black" }}>
          <NotesProvider>
            <div className="row" style={{ border: "1px solid black" }}>
              <div className="col-12" style={{ border: "1px solid black" }}>
                <KeyboardLinear />
              </div>
              <div className="col-8" style={{ border: "1px solid black" }}>
                <KeyboardPieSlice />
              </div>
              <div className="col-4" style={{ border: "1px solid black" }}>
                <ModeSelector />
                <PresetsSelector />
              </div>
            </div>
            <div className="row" style={{ border: "1px solid black" }}>
              <div className="col-6" style={{ border: "1px solid black" }}>
                <ChordDisplay />
              </div>
              <div className="col-6" style={{ border: "1px solid black" }}>
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
