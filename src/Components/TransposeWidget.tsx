import { ixActualArray } from "../types/IndexTypes";
import { IndexUtils } from "../utils/IndexUtils";

import { useMusical } from "../contexts/MusicalContext";

import "../styles/CircularSettings.css";

export const TransposeWidget: React.FC = () => {
  const { selectedNoteIndices, setSelectedNoteIndices } = useMusical();

  const handleTranspose = (amount: number) => {
    const transposedIndices = ixActualArray(IndexUtils.shiftIndices(selectedNoteIndices, amount));
    setSelectedNoteIndices(transposedIndices);
  };

  return (
    <div>
      <div className="transpose-buttons-container">
        {/* Transpose */}
        <button className="transpose-button" onClick={() => handleTranspose(1)}>
          ↑♫↑
        </button>
        <button className="transpose-button" onClick={() => handleTranspose(-1)}>
          ↓♫↓
        </button>
      </div>
    </div>
  );
};
