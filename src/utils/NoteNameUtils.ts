import { AccidentalType, getAccidentalSignForDisplay } from "../types/AccidentalType";
import { ActualIndex, actualIndexToChromaticAndOctave } from "../types/IndexTypes";
import { ChromaticIndex } from "../types/ChromaticIndex";
import { MusicalKey } from "../types/MusicalKey";
import { KeyTextMode } from "../types/SettingModes";
import { RomanNumeralUtils } from "./RomanNumeralUtils";
import { getBasicNoteInfo } from "../types/NoteConstants";

const formatNoteNameForDisplay = (
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

export const getNoteTextFromChromaticIndex = (
  chromaticIndex: ChromaticIndex,
  accidentalPreference: AccidentalType,
): string => {
  return formatNoteNameForDisplay(chromaticIndex, accidentalPreference);
};

const getRomanDisplayString = (chromaticIndex: ChromaticIndex, musicalKey: MusicalKey): string => {
  const scaleDegree = musicalKey.getScaleDegreeFromIndexAndKey(chromaticIndex);
  return scaleDegree > 0 ? RomanNumeralUtils.toRoman(scaleDegree).toLowerCase() : "";
};

export const getDisplayString = (
  chromaticIndex: ChromaticIndex,
  musicalKey: MusicalKey,
  displayMode: KeyTextMode,
): string => {
  switch (displayMode) {
    case KeyTextMode.NoteNames:
      return formatNoteNameForDisplay(chromaticIndex, musicalKey.getDefaultAccidental());
    case KeyTextMode.ScaleDegree:
      return musicalKey.getScaleDegreeDisplayString(chromaticIndex);
    case KeyTextMode.Roman:
      return getRomanDisplayString(chromaticIndex, musicalKey);
  }
};
