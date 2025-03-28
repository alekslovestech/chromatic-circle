import React from "react";

import { KeyType, MusicalKey, MusicalKeyUtil } from "../types/MusicalKey";
import { formatForDisplay } from "../utils/NoteUtils";

import { useMusical } from "../contexts/MusicalContext";

import "../styles/CircularSettings.css";

export const MusicalKeySelector: React.FC = () => {
  const { selectedMusicalKey, setSelectedMusicalKey } = useMusical();

  const keys = MusicalKeyUtil.getKeyList(selectedMusicalKey.mode);

  const handleKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newKey = new MusicalKey(event.target.value, selectedMusicalKey.mode);
    setSelectedMusicalKey(newKey);
  };

  const handleMajorToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newKey = selectedMusicalKey.getOppositeKey();
    console.log(newKey);
    setSelectedMusicalKey(newKey);
  };

  return (
    <div className="musical-key-selector">
      <select onChange={handleKeyChange} value={selectedMusicalKey.tonicString}>
        {keys.map((key) => (
          <option key={key} value={key}>
            {formatForDisplay(key)}
          </option>
        ))}
      </select>
      <button id="major-minor-toggle" onClick={handleMajorToggle}>
        {selectedMusicalKey.mode === KeyType.Major ? "Major" : "Minor"}
      </button>
    </div>
  );
};
