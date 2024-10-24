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
        <div className="container-fluid">
          <NotesProvider>
            {" "}
            {/* 
            1. Do the first round with components in 1 column. 
            2. Divs fill the whole width 100% 
            3. use bootstrap 
            4. add grid-bootstrap class to page */}
            <KeyboardLinear />
            <KeyboardPieSlice />
            {/*<KeyboardCircular />*/}
            <PresetsSelector />
            <ModeSelector />
            <ChordDisplay />
            <NotesRenderer />
            <AudioPlayer />
          </NotesProvider>
        </div>
      </header>
    </div>
  );
}

export default App;
