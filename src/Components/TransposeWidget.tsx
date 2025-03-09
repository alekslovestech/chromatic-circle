import { useState } from "react";
import { useNotes } from "./NotesContext";
import { IndexUtils } from "../utils/IndexUtils";
import { ixActualArray } from "../types/IndexTypes";
export const TransposeWidget: React.FC = () => {
  const { selectedNoteIndices, setSelectedNoteIndices } = useNotes();

  const handleTranspose = (amount: number) => {
    const transposedIndices = ixActualArray(IndexUtils.shiftIndices(selectedNoteIndices, amount));
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
