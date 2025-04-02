import { AccidentalType, getAccidentalSignForDisplay } from "../types/AccidentalType";
import { ActualIndex, actualIndexToChromaticAndOctave } from "../types/IndexTypes";
import { ChromaticIndex } from "../types/ChromaticIndex";
import { MusicalKey } from "../types/MusicalKey";
import { KeyTextMode } from "../types/SettingModes";
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

  const thisGreekMode = GreekModeDictionary.getModeInfo(musicalKey.greekMode);
  const scaleDegreeInfo = thisGreekMode.getScaleDegreeInfoFromChromatic(
    chromaticIndex,
    musicalKey.tonicIndex,
  );
  return scaleDegreeInfo?.getDisplayString() ?? "";
};

const getRomanDisplayString = (chromaticIndex: ChromaticIndex, musicalKey: MusicalKey): string => {
  const thisGreekMode = GreekModeDictionary.getModeInfo(musicalKey.greekMode);
  const scaleDegree = thisGreekMode.getScaleDegreeFromIndexAndKey(chromaticIndex, musicalKey);
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
