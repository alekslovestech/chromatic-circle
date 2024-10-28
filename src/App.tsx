import "./styles/App.css";
import { NotesProvider } from "./Components/NotesContext";
import KeyboardLinear from "./Components/KeyboardLinear";
import NotesRenderer from "./Components/NotesRenderer";
import ChordDisplay from "./Components/ChordNameDisplay";
import PresetsSelector from "./Components/PresetsSelector";
import ModeSelector from "./Components/ModeSelector";
import AudioPlayer from "./Components/AudioPlayer";
import KeyboardPieSlice from "./Components/KeyboardPieSlice";

import React, { useEffect, useState } from "react";

function App() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const borderStyle = { border: `1px solid var(--border-color)` };

  const handleResize = () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    const newOrientation = newWidth > newHeight ? "landscape" : "portrait";
    console.log(
      `resizing with width: ${newWidth} and height: ${newHeight}, orientation: ${newOrientation}`,
    );
    setViewportWidth(newWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="Chromatic">
      <header className="App-header">
        <div className="container-fluid d-flex flex-wrap" style={borderStyle}>
          <NotesProvider>
            <div className="row d-flex flex-wrap" style={borderStyle}>
              <div className="col-12" style={borderStyle}>
                <KeyboardLinear />
              </div>
              <div className="col-6" style={borderStyle}>
                <KeyboardPieSlice />
              </div>
              <div className="col-6 settings-container" style={borderStyle}>
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
