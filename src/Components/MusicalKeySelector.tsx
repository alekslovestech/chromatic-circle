import React, { useEffect } from "react";

import { MusicalKey } from "../types/Keys/MusicalKey";
import { GreekModeType } from "../types/GreekModes/GreekModeType";
import { KeyType } from "../types/Keys/KeyType";
import { KeySignature } from "../types/Keys/KeySignature";

import { useMusical } from "../contexts/MusicalContext";
import { useDisplay } from "../contexts/DisplayContext";
import { useAudio } from "../contexts/AudioContext";

import "../styles/CircularSettings.css";
import { Button } from "./Common/Button";
import { Select } from "./Common/Select";

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
      <Select
        id="tonic-select"
        value={selectedMusicalKey.tonicString}
        onChange={handleTonicNameChange}
        title="Select tonic note (scale start)"
      >
        {KeySignature.getKeyList(selectedMusicalKey.classicalMode).map((note) => (
          <option key={note} value={note}>
            {note}
          </option>
        ))}
      </Select>
      {useDropdownSelector ? (
        <Select
          id="greek-mode-select"
          value={selectedMusicalKey.greekMode}
          onChange={handleGreekModeChange}
          title="Select musical mode"
        >
          {Object.values(GreekModeType).map((mode) => (
            <option id={`greek-mode-option-${mode}`} key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </Select>
      ) : (
        <Button
          id="major-minor-toggle"
          variant="action"
          density="standard"
          size="md"
          title="Toggle between major and minor"
          onClick={handleMajorMinorToggle}
        >
          {selectedMusicalKey.classicalMode === KeyType.Major ? "Major" : "Minor"}
        </Button>
      )}
    </div>
  );
};
