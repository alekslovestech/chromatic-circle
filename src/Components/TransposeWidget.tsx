import { ixActualArray } from "../types/IndexTypes";

import { GlobalMode } from "../types/SettingModes";
import { IndexUtils } from "../utils/IndexUtils";

import { useMusical } from "../contexts/MusicalContext";
import { useDisplay } from "../contexts/DisplayContext";

import "../styles/CircularSettings.css";

export const TransposeWidget: React.FC = () => {
  const { selectedNoteIndices, setSelectedNoteIndices, selectedMusicalKey, setSelectedMusicalKey } =
    useMusical();
  const { globalMode } = useDisplay();
  const isAdvanced = globalMode === GlobalMode.Advanced;

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
        {!isAdvanced && (
          <>
            <button className="transpose-up-button" onClick={() => handleSelectedNotesTranspose(1)}>
              ↑♫↑
            </button>
            <button
              className="transpose-down-button"
              onClick={() => handleSelectedNotesTranspose(-1)}
            >
              ↓♫↓
            </button>
          </>
        )}

        {isAdvanced && (
          <>
            <button className="musicalkey-up-button" onClick={() => handleMusicalKeyTranspose(1)}>
              ↑𝄞↑
            </button>
            <button
              className="musicalkey-down-button"
              onClick={() => handleMusicalKeyTranspose(-1)}
            >
              ↓𝄞↓
            </button>
          </>
        )}
      </div>
    </div>
  );
};
