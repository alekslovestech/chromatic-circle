import React from "react";

import { KeyType, MusicalKey, MusicalKeyUtil } from "../types/MusicalKey";
import { GreekModeType } from "../types/GreekMode";
import { formatForDisplay } from "../utils/NoteUtils";

import { useMusical } from "../contexts/MusicalContext";

import "../styles/CircularSettings.css";

export const MusicalKeySelector: React.FC<{ advanced?: boolean }> = ({ advanced = false }) => {
  const { selectedMusicalKey, setSelectedMusicalKey } = useMusical();

  const keys = MusicalKeyUtil.getKeyList(selectedMusicalKey.classicalMode);

  //C / C# / Db / D / D# / Eb / E / F / F# / Gb / G / G# / Ab / A / A# / Bb / B
  const handleKeyNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const keyName = event.target.value as string;
    const newKey = MusicalKey.fromClassicalMode(keyName, selectedMusicalKey.classicalMode);
    setSelectedMusicalKey(newKey);
  };

  //Ionian / Dorian / Phrygian / Lydian / Mixolydian / Aeolian / Locrian
  const handleGreekModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const greekMode = event.target.value as GreekModeType;
    const newKey = MusicalKey.fromGreekMode(selectedMusicalKey.tonicString, greekMode);
    setSelectedMusicalKey(newKey);
  };

  //Major / Minor
  const handleMajorMinorToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newKey = selectedMusicalKey.getOppositeKey();
    setSelectedMusicalKey(newKey);
  };

  return (
    <div className="musical-key-selector">
      <select onChange={handleKeyNameChange} value={selectedMusicalKey.tonicString}>
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
        <button id="major-minor-toggle" onClick={handleMajorMinorToggle}>
          {selectedMusicalKey.classicalMode === KeyType.Major ? "Major" : "Minor"}
        </button>
      )}
    </div>
  );
};
