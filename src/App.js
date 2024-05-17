import { NotesProvider } from "./NotesContext";
import "./App.css";
import ChromaticCircle from "./ChromaticCircle";
import ChordPresetsSelector from "./ChordPresetsSelector";
import ModeSelector from "./ModeSelector";

function App() {
  return (
    <div className="Chromatic">
      <header className="App-header">
        <h2>Chromatic Circle</h2>
        <NotesProvider>
          <ModeSelector />
          <ChromaticCircle />
          <ChordPresetsSelector />
        </NotesProvider>
      </header>
    </div>
  );
}

export default App;
