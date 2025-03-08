import { useState } from "react";
import { useNotes } from "./NotesContext";
import { IndexUtils } from "../utils/IndexUtils";
export const TransposeWidget: React.FC = () => {
  const { selectedNoteIndices, setSelectedNoteIndices } = useNotes();

  const handleTranspose = (amount: number) => {
    const transposedIndices = IndexUtils.shiftIndices(selectedNoteIndices, amount);
    setSelectedNoteIndices(transposedIndices);
  };

  return (
    <div>
      <div className="transpose-buttons">
        <button onClick={() => handleTranspose(1)}>↑</button>
        <button onClick={() => handleTranspose(-1)}>↓</button>
      </div>
    </div>
  );
};
