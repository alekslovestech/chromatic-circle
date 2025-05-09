"use client";

import React, { useEffect } from "react";
import { useMusical } from "../contexts/MusicalContext";
import { useDisplay } from "../contexts/DisplayContext";
import { useAudio } from "../contexts/AudioContext";
import { MusicalKey } from "../types/Keys/MusicalKey";
import { GreekModeType } from "../types/GreekModes/GreekModeType";
import { KeySignature } from "../types/Keys/KeySignature";
import { KeyType } from "../types/Keys/KeyType";

export const MusicalKeySelector = ({ useDropdownSelector }: { useDropdownSelector: boolean }) => {
  const { selectedMusicalKey, setSelectedMusicalKey } = useMusical();
  const { scalePreviewMode, keyTextMode } = useDisplay();
  const { isAudioInitialized, startScalePlayback, stopScalePlayback } = useAudio();

  useEffect(() => {
    if (scalePreviewMode && isAudioInitialized) {
      startScalePlayback(keyTextMode);
    } else {
      stopScalePlayback();
    }

    return () => {
      stopScalePlayback();
    };
  }, [scalePreviewMode, isAudioInitialized, selectedMusicalKey, keyTextMode]); // eslint-disable-line react-hooks/exhaustive-deps

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
        title="Select tonic note (scale start)"
        value={selectedMusicalKey.tonicString}
      >
        {KeySignature.getKeyList(selectedMusicalKey.classicalMode).map((note) => (
          <option key={note} value={note}>
            {note}
          </option>
        ))}
      </select>
      {useDropdownSelector ? (
        <select id="greek-mode-select" onChange={handleGreekModeChange} title="Select musical mode">
          {Object.values(GreekModeType).map((mode) => (
            <option id={`greek-mode-option-${mode}`} key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>
      ) : (
        <button
          id="major-minor-toggle"
          title="Toggle between major and minor"
          onClick={handleMajorMinorToggle}
        >
          {selectedMusicalKey.classicalMode === KeyType.Major ? "Major" : "Minor"}
        </button>
      )}
    </div>
  );
};
