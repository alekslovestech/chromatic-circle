import React from "react";
import { useMusical } from "../../contexts/MusicalContext";

export const ClearButton: React.FC = () => {
  const { setSelectedNoteIndices } = useMusical();
  return (
    <button className="clear-button" onClick={() => setSelectedNoteIndices([])}>
      Clear
    </button>
  );
};
