"use client";

import React from "react";
import { useMusical } from "../contexts/MusicalContext";
import { TWELVE } from "../types/NoteConstants";
import { ixActual } from "../types/IndexTypes";

const MusicalKeySelector: React.FC = () => {
  const { selectedNoteIndices, setSelectedNoteIndices } = useMusical();

  const handleKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newKey = parseInt(event.target.value);
    const newIndices = selectedNoteIndices.map((index) => ixActual(index + newKey));
    setSelectedNoteIndices(newIndices);
  };

  return (
    <div className="musical-key-selector">
      <select onChange={handleKeyChange}>
        <option value="0">C</option>
        <option value="1">C#</option>
        <option value="2">D</option>
        <option value="3">D#</option>
        <option value="4">E</option>
        <option value="5">F</option>
        <option value="6">F#</option>
        <option value="7">G</option>
        <option value="8">G#</option>
        <option value="9">A</option>
        <option value="10">A#</option>
        <option value="11">B</option>
      </select>
    </div>
  );
};

export default MusicalKeySelector;
