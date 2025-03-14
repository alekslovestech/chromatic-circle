import { useNotes } from "../NotesContext";
import "../../styles/CircularSettings.css";
export const MonochromeModeToggle: React.FC = () => {
  const { monochromeMode, setMonochromeMode } = useNotes();
  return (
    <div className="monochrome-mode-container">
      <input
        type="checkbox"
        id="monochrome-mode"
        checked={monochromeMode}
        onChange={() => setMonochromeMode(!monochromeMode)}
      />
      <label htmlFor="monochrome-mode" className="monochrome-mode-label">
        Monochrome Mode
      </label>
    </div>
  );
};
