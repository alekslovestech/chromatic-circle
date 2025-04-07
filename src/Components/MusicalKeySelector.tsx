import React, { useEffect } from "react";

import { MusicalKey } from "../types/Keys/MusicalKey";
import { GreekModeType } from "../types/GreekModes/GreekModeType";
import { KeyType } from "../types/Keys/KeyType";
import { KeySignature } from "../types/Keys/KeySignature";
import { ixActualArray } from "../types/IndexTypes";
import { KeyTextMode } from "../types/SettingModes";

import { GreekModeInfo } from "../types/GreekModes/GreekModeInfo";

import { useMusical } from "../contexts/MusicalContext";
import { useDisplay } from "../contexts/DisplayContext";

import "../styles/CircularSettings.css";

export const MusicalKeySelector = ({ useDropdownSelector }: { useDropdownSelector: boolean }) => {
  const { selectedMusicalKey, setSelectedMusicalKey, setSelectedNoteIndices } = useMusical();
  const { scalePreviewMode, keyTextMode } = useDisplay();

  useEffect(() => {
    if (!scalePreviewMode) {
      return;
    }
    const greekModeInfo = selectedMusicalKey.greekModeInfo;
    let scaleDegreeIndex = 0;
    const interval = setInterval(
      () => {
        const isRomanMode = keyTextMode === KeyTextMode.Roman;
        const playedOffsets = isRomanMode
          ? greekModeInfo.getOffsets135(scaleDegreeIndex)
          : greekModeInfo.getRootOffset(scaleDegreeIndex);
        if (scaleDegreeIndex < greekModeInfo.pattern.length) {
          const selectedNoteIndices = ixActualArray(
            playedOffsets.map((offset) => selectedMusicalKey.tonicIndex + offset),
          );
          setSelectedNoteIndices(selectedNoteIndices);
          scaleDegreeIndex++;
        } else {
          setSelectedNoteIndices(ixActualArray([selectedMusicalKey.tonicIndex]));
          clearInterval(interval);
        }
      },
      // Use slower interval for triads, faster for single notes
      keyTextMode === KeyTextMode.Roman ? 500 : 250,
    );

    return () => clearInterval(interval);
  }, [selectedMusicalKey, keyTextMode]);

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
