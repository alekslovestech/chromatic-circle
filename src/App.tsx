import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { NotesProvider } from "./NotesContext";
import ChromaticCircle from "./ChromaticCircle";
import AudioPlayer from "./AudioPlayer";
import ModeSelector from "./ModeSelector";
import ChordPresetsSelector from "./ChordPresetsSelector";
import NotesRenderer from "./NotesRenderer";

function App() {
  return (
    <div className="Chromatic">
      <div className="Chromatic">
        <header className="App-header">
          <h2>Chromatic Circle</h2>
          <NotesProvider>
            <ChromaticCircle />
            <AudioPlayer />
            <ModeSelector />
            <ChordPresetsSelector />
            <NotesRenderer />
          </NotesProvider>
        </header>
      </div>
    </div>
  );
}

export default App;
