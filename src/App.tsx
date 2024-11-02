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
  const borderStyle = { border: `1px solid var(--debug-border-color)` };

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
      <header className="App-header" /* style={borderStyle} */>
        <NotesProvider>
          <div className="grid-container" /* style={borderStyle} */>
            <div className="keyboardlinear-container" style={borderStyle}>
              <KeyboardLinear />
            </div>
            <div className="keyboardpieslice-container" style={borderStyle}>
              <KeyboardPieSlice />
            </div>
            <div className="settings-container" style={borderStyle}>
              <ModeSelector />
              <PresetsSelector />
            </div>
            <div className="chord-display-container" style={borderStyle}>
              <ChordDisplay />
            </div>
            <div className="notes-renderer-container" style={borderStyle}>
              <NotesRenderer />
            </div>
          </div>
          <AudioPlayer />
        </NotesProvider>
      </header>
    </div>
  );
}

export default App;
