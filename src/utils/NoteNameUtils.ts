import { AccidentalType } from "../types/AccidentalType";
import { ActualIndex, actualIndexToChromaticAndOctave } from "../types/IndexTypes";
import { ChromaticIndex } from "../types/ChromaticIndex";
import { MusicalKey } from "../types/MusicalKey";
import { KeyTextMode } from "../types/SettingModes";
import { RomanNumeralUtils } from "./RomanNumeralUtils";
import { NoteConverter } from "../types/NoteConverter";

const formatNoteNameForDisplay = (
  chromaticIndex: ChromaticIndex,
  accidentalPreference: AccidentalType,
): string => {
  const noteAtIndex = NoteConverter.getBasicNoteInfo(chromaticIndex, accidentalPreference);
  return noteAtIndex.formatNoteNameForDisplay();
};

export const getNoteTextFromActualIndex = (
  actualIndex: ActualIndex,
  accidentalPreference: AccidentalType,
): string => {
  const { chromaticIndex } = actualIndexToChromaticAndOctave(actualIndex);
  const noteInfo = NoteConverter.getBasicNoteInfo(chromaticIndex, accidentalPreference);
  return noteInfo.formatNoteNameForDisplay();
};

const getRomanDisplayString = (chromaticIndex: ChromaticIndex, musicalKey: MusicalKey): string => {
  const scaleDegreeInfo = musicalKey.getScaleDegreeInfo(chromaticIndex);
  return scaleDegreeInfo
    ? RomanNumeralUtils.toRoman(scaleDegreeInfo.scaleDegree).toLowerCase()
    : "";
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
