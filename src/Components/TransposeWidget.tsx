import { ixActualArray } from "../types/IndexTypes";
import { IndexUtils } from "../utils/IndexUtils";
import { useMusical } from "../contexts/MusicalContext";
import "../styles/CircularSettings.css";

// This component is used to transpose the selected notes OR the musical key.
export const TransposeWidget: React.FC<{ showKeyTranspose: boolean }> = ({
  showKeyTranspose = false,
}) => {
  const { selectedNoteIndices, setSelectedNoteIndices, selectedMusicalKey, setSelectedMusicalKey } =
    useMusical();

  const handleSelectedNotesTranspose = (amount: number) => {
    const transposedIndices = ixActualArray(IndexUtils.shiftIndices(selectedNoteIndices, amount));
    setSelectedNoteIndices(transposedIndices);
  };

  const handleMusicalKeyTranspose = (amount: number) => {
    const newKey = selectedMusicalKey.getTransposedKey(amount);
    setSelectedMusicalKey(newKey);
  };

  return (
    <div>
      <div className="transpose-buttons-container">
        {!showKeyTranspose && (
          <>
            <button
              className="transpose-up-button"
              onClick={() => handleSelectedNotesTranspose(1)}
              title="Transpose selected notes up"
            >
              ↑♫↑
            </button>
            <button
              className="transpose-down-button"
              onClick={() => handleSelectedNotesTranspose(-1)}
              title="Transpose selected notes down"
            >
              ↓♫↓
            </button>
          </>
        )}

        {showKeyTranspose && (
          <>
            <button
              className="musicalkey-up-button"
              onClick={() => handleMusicalKeyTranspose(1)}
              title="Transpose musical key up"
            >
              ↑𝄞↑
            </button>
            <button
              className="musicalkey-down-button"
              onClick={() => handleMusicalKeyTranspose(-1)}
              title="Transpose musical key down"
            >
              ↓𝄞↓
            </button>
          </>
        )}
      </div>
    </div>
  );
};
