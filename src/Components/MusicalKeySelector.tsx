import React, { useEffect } from "react";

import { MusicalKey } from "../types/Keys/MusicalKey";
import { GreekModeType } from "../types/GreekModes/GreekModeType";
import { KeyType } from "../types/Keys/KeyType";
import { KeySignature } from "../types/Keys/KeySignature";
import { ixActual, ixActualArray } from "../types/IndexTypes";
import { TWELVE } from "../types/NoteConstants";
import { KeyTextMode } from "../types/SettingModes";

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
    const scaleOffsets = selectedMusicalKey.greekModeInfo.pattern;
    let scaleDegreeIndex = 0;
    const interval = setInterval(
      () => {
        if (scaleDegreeIndex < scaleOffsets.length) {
          if (keyTextMode === KeyTextMode.Roman) {
            const [rootOffset, thirdOffset, fifthOffset] =
              selectedMusicalKey.greekModeInfo.getOffsets135(scaleDegreeIndex);

            const triadNotes = [rootOffset, thirdOffset, fifthOffset].map(
              (offset) => selectedMusicalKey.tonicIndex + offset,
            );
            setSelectedNoteIndices(ixActualArray(triadNotes));
          } else {
            const noteIndex = selectedMusicalKey.tonicIndex + scaleOffsets[scaleDegreeIndex];
            const currentNote = ixActual(noteIndex);
            setSelectedNoteIndices([currentNote]);
          }

          scaleDegreeIndex++;
        }
        // After playing all notes, play the octave and stop
        else {
          const octaveNote = ixActual(selectedMusicalKey.tonicIndex + TWELVE);
          setSelectedNoteIndices([octaveNote]);
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
