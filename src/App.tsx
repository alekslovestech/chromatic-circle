import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { NotesProvider } from "./Components/NotesContext";
import ChromaticCircle from "./Components/ChromaticCircle";
import AudioPlayer from "./Components/AudioPlayer";
import ModeSelector from "./Components/ModeSelector";
import ChordPresetsSelector from "./Components/ChordPresetsSelector";
import NotesRenderer from "./Components/NotesRenderer";

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
