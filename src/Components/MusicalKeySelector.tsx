import React from "react";

import { MusicalKey } from "../types/MusicalKey";
import { GreekModeType } from "../types/GreekModes/GreekModeType";
import { KeyType } from "../types/KeyType";
import { KeySignature } from "../types/KeySignature";

import { useMusical } from "../contexts/MusicalContext";

import "../styles/CircularSettings.css";

export const MusicalKeySelector = ({ useDropdownSelector }: { useDropdownSelector: boolean }) => {
  const { selectedMusicalKey, setSelectedMusicalKey } = useMusical();

  //C / C# / Db / D / D# / Eb / E / F / F# / Gb / G / G# / Ab / A / A# / Bb / B
  const handleTonicNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const tonicName = event.target.value as string;

    const newKey = useDropdownSelector
      ? MusicalKey.fromGreekMode(tonicName, selectedMusicalKey.greekMode)
      : MusicalKey.fromClassicalMode(tonicName, selectedMusicalKey.classicalMode);
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
      <select
        id="tonic-select"
        onChange={handleTonicNameChange}
        value={selectedMusicalKey.tonicString}
      >
        {KeySignature.getKeyList(selectedMusicalKey.classicalMode).map((note) => (
          <option key={note} value={note}>
            {note}
          </option>
        ))}
      </select>
      {/* In advanced mode (useDropdownSelector=true), show dropdown with all Greek modes
          In basic mode, show simple Major/Minor toggle button */}
      {useDropdownSelector ? (
        <select id="greek-mode-select" onChange={handleGreekModeChange}>
          {Object.values(GreekModeType).map((mode) => (
            <option id={`greek-mode-option-${mode}`} key={mode} value={mode}>
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
