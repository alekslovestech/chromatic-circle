import { NotesProvider } from "./NotesContext";
import "./App.css";
import ChromaticCircle from "./Chromatic-circle";
import ChordPresetsSelector from "./ChordPresetsSelector";
import ModeSelector from "./ModeSelector";

function App() {
  return (
    <div className="Chromatic">
      <header className="App-header">
        <h1>Chromatic Circle</h1>
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
