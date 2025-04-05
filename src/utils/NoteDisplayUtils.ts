import { AccidentalType } from "../types/AccidentalType";
import { ActualIndex, actualIndexToChromaticAndOctave } from "../types/IndexTypes";
import { ChromaticIndex } from "../types/ChromaticIndex";
import { MusicalKey } from "../types/MusicalKey";
import { KeyTextMode } from "../types/SettingModes";
import { RomanNumeralUtils } from "./RomanNumeralUtils";
import { NoteConverter } from "../types/NoteConverter";
import { ScaleDegreeInfo } from "../types/GreekModes/ScaleDegreeInfo";
import { ChordType } from "../types/NoteGroupingTypes";
import { RomanChord } from "../types/RomanChord";
import { GreekModeDictionary } from "../types/GreekModes/GreekModeDictionary";

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

export const getRomanDisplayString = (
  chromaticIndex: ChromaticIndex,
  musicalKey: MusicalKey,
): string => {
  const greekModeInfo = GreekModeDictionary.getModeInfo(musicalKey.greekMode);
  const pattern = greekModeInfo.pattern;
  const scaleDegreeInfo = musicalKey.getScaleDegreeInfo(chromaticIndex);
  if (scaleDegreeInfo) {
    const romanChord = new RomanChord(
      scaleDegreeInfo.scaleDegree,
      ChordType.Minor,
      scaleDegreeInfo.accidentalPrefix,
    );
    return romanChord.getString();
  }
  return "";
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
