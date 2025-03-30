import React from "react";

import { GreekModeType, KeyType, MusicalKey, MusicalKeyUtil } from "../types/MusicalKey";
import { formatForDisplay } from "../utils/NoteUtils";

import { useMusical } from "../contexts/MusicalContext";

import "../styles/CircularSettings.css";

export const MusicalKeySelector: React.FC<{ advanced?: boolean }> = ({ advanced = false }) => {
  const { selectedMusicalKey, setSelectedMusicalKey } = useMusical();

  const keys = MusicalKeyUtil.getKeyList(selectedMusicalKey.classicalMode);

  const handleKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newKey = new MusicalKey(event.target.value, selectedMusicalKey.classicalMode);
    setSelectedMusicalKey(newKey);
  };

  const handleGreekModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newKey = new MusicalKey(
      selectedMusicalKey.tonicString,
      event.target.value as GreekModeType,
    );
    console.log(newKey);
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
      {advanced ? (
        <select onChange={handleGreekModeChange}>
          {Object.values(GreekModeType).map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>
      ) : (
        <button id="major-minor-toggle" onClick={handleMajorToggle}>
          {selectedMusicalKey.classicalMode === KeyType.Major ? "Major" : "Minor"}
        </button>
      )}
    </div>
  );
};
