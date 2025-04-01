import { AccidentalType, getAccidentalSignForDisplay } from "../types/AccidentalType";
import { getNotesArray } from "../types/NoteConstants";
import { ActualIndex, actualIndexToChromaticAndOctave } from "../types/IndexTypes";
import { addChromatic, ChromaticIndex } from "../types/ChromaticIndex";
import { NoteInfo } from "../types/NoteInfo";
import { GreekModeType } from "../types/GreekMode";
import { MusicalKey } from "../types/MusicalKey";
import { KeyTextMode } from "../types/SettingModes";
import { RomanResolver } from "../types/RomanResolver";
import { GreekModeDictionary } from "../types/GreekMode";
import { RomanNumeralUtils } from "./RomanNumeralUtils";

export const getBasicNoteInfo = (
  chromaticIndex: ChromaticIndex,
  accidentalPreference: AccidentalType,
): NoteInfo => {
  const notesArray = getNotesArray(accidentalPreference);
  return notesArray[chromaticIndex];
};

//this function only exported because we use it in tests
export const formatNoteNameForDisplay = (
  chromaticIndex: ChromaticIndex,
  accidentalPreference: AccidentalType,
): string => {
  const noteAtIndex = getBasicNoteInfo(chromaticIndex, accidentalPreference);
  const accidentalSign = getAccidentalSignForDisplay(noteAtIndex.accidental);
  return `${noteAtIndex.noteName}${accidentalSign}`;
};

export const formatForDisplay = (noteName: string): string => {
  return noteName.replace("#", "♯").replace("b", "♭");
};

export const getNoteTextFromActualIndex = (
  actualIndex: ActualIndex,
  accidentalPreference: AccidentalType,
): string => {
  const { chromaticIndex } = actualIndexToChromaticAndOctave(actualIndex);
  return formatNoteNameForDisplay(chromaticIndex, accidentalPreference);
};

export const getDisplayString = (
  chromaticIndex: ChromaticIndex,
  musicalKey: MusicalKey,
  displayMode: KeyTextMode,
) => {
  const scaleDegree = RomanResolver.getScaleDegreeFromIndexAndKey(chromaticIndex, musicalKey);
  switch (displayMode) {
    case KeyTextMode.NoteNames:
      return formatNoteNameForDisplay(chromaticIndex, musicalKey.getDefaultAccidental());
    case KeyTextMode.Arabic:
      const greekModeDictionary = GreekModeDictionary.getInstance();
      const thisGreekMode = greekModeDictionary.getMode(musicalKey.greekMode);
      const ionianPattern = greekModeDictionary.getMode(GreekModeType.Ionian).pattern;

      // Convert absolute chromatic index to index relative to tonic
      const tonicIndex = musicalKey.tonicIndex;
      const relativeIndex = thisGreekMode.pattern.findIndex(
        (offset) => addChromatic(tonicIndex, offset) === chromaticIndex,
      );

      if (relativeIndex === -1) {
        return ""; // Note not in scale
      }

      const scaleDegreeInfo = thisGreekMode.getScaleDegreeInfo(relativeIndex, ionianPattern);
      return scaleDegreeInfo.getDisplayString();
    case KeyTextMode.Roman:
      return scaleDegree > 0 ? RomanNumeralUtils.toRoman(scaleDegree).toLowerCase() : "";
  }
};
