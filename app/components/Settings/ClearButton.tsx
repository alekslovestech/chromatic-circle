import { useMusical } from "../../../src/contexts/MusicalContext";

import "../../styles/CircularSettings.css";

export const ClearButton: React.FC = () => {
  const { setSelectedNoteIndices } = useMusical();
  return (
    <button className="clear-button" onClick={() => setSelectedNoteIndices([])}>
      Clear
    </button>
  );
};
