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

import React, { useEffect, useState } from "react";

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [orientation, setOrientation] = useState(
    window.innerWidth > window.innerHeight ? "landscape" : "portrait",
  );
  const borderStyle = { border: `1px solid var(--border-color)` };

  const handleResize = () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    const newOrientation = newWidth > newHeight ? "landscape" : "portrait";
    console.log(
      `resizing with width: ${newWidth} and height: ${newHeight}, orientation: ${newOrientation}`,
    );
    setWindowSize({ width: newWidth, height: newHeight });
    setOrientation(newOrientation);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Force re-render on orientation change
  useEffect(() => {
    setOrientation(window.innerWidth > window.innerHeight ? "landscape" : "portrait");
  }, [orientation]);

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
