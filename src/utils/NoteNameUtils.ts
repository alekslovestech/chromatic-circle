import { AccidentalType, getAccidentalSignForDisplay } from "../types/AccidentalType";
import { ActualIndex, actualIndexToChromaticAndOctave } from "../types/IndexTypes";
import { addChromatic, ChromaticIndex } from "../types/ChromaticIndex";
import { MusicalKey } from "../types/MusicalKey";
import { KeyTextMode } from "../types/SettingModes";
import { RomanResolver } from "../types/RomanResolver";
import { GreekModeDictionary } from "../types/GreekMode";
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

export const getScaleDegreeDisplayString = (
  chromaticIndex: ChromaticIndex,
  musicalKey: MusicalKey,
): string => {
  if (!musicalKey.isDiatonicNote(chromaticIndex)) return "";

  const greekModeDictionary = GreekModeDictionary.getInstance();
  const thisGreekMode = greekModeDictionary.getMode(musicalKey.greekMode);

  const relativeIndex = thisGreekMode.pattern.findIndex(
    (offset) => addChromatic(musicalKey.tonicIndex, offset) === chromaticIndex,
  );

  const scaleDegreeInfo = thisGreekMode.getScaleDegreeInfo(relativeIndex);
  return scaleDegreeInfo.getDisplayString();
};

const getRomanDisplayString = (chromaticIndex: ChromaticIndex, musicalKey: MusicalKey): string => {
  const scaleDegree = RomanResolver.getScaleDegreeFromIndexAndKey(chromaticIndex, musicalKey);
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
      return getScaleDegreeDisplayString(chromaticIndex, musicalKey);
    case KeyTextMode.Roman:
      return getRomanDisplayString(chromaticIndex, musicalKey);
  }
};
