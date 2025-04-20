import React, { useEffect } from "react";

import { MusicalKey } from "../types/Keys/MusicalKey";

import { ixActualArray } from "../types/IndexTypes";
import { KeyTextMode } from "../types/SettingModes";

import { ixScaleDegreeIndex } from "../types/GreekModes/ScaleDegreeType";
import { GreekModeType } from "../types/GreekModes/GreekModeType";

import { KeyType } from "../types/Keys/KeyType";
import { KeySignature } from "../types/Keys/KeySignature";

import { IndexUtils } from "../utils/IndexUtils";

import { useMusical } from "../contexts/MusicalContext";
import { useDisplay } from "../contexts/DisplayContext";

import "../styles/CircularSettings.css";
import { useAudio } from "../contexts/AudioContext";
export const MusicalKeySelector = ({ useDropdownSelector }: { useDropdownSelector: boolean }) => {
  const { selectedMusicalKey, setSelectedMusicalKey, setSelectedNoteIndices } = useMusical();
  const { scalePreviewMode, keyTextMode } = useDisplay();
  const { isAudioInitialized } = useAudio();
  useEffect(() => {
    if (!scalePreviewMode || !isAudioInitialized) return;

    let scaleDegreeIndex = 0;
    const isRomanMode = keyTextMode === KeyTextMode.Roman;
    const interval = setInterval(
      () => {
        if (scaleDegreeIndex < selectedMusicalKey.scalePatternLength) {
          const playedOffsets = selectedMusicalKey.getOffsets(
            ixScaleDegreeIndex(scaleDegreeIndex),
            isRomanMode,
          );
          const noteIndices = playedOffsets.map((offset) => selectedMusicalKey.tonicIndex + offset);
          const sanitizedNoteIndices = ixActualArray(
            IndexUtils.fitChordToAbsoluteRange(noteIndices),
          );
          setSelectedNoteIndices(sanitizedNoteIndices);
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
  }, [selectedMusicalKey, keyTextMode, scalePreviewMode, setSelectedNoteIndices]);

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
