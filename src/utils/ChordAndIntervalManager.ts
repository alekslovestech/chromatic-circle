import { ActualIndex, InversionIndex, ixActualArray, ixInversion } from "../types/IndexTypes";
import { MusicalKey } from "../types/Keys/MusicalKey";
import { NoteGrouping } from "../types/NoteGrouping";
import { NoteGroupingLibrary } from "../types/NoteGroupingLibrary";
import { NoteGroupingId } from "../types/NoteGroupingTypes";
import { ChordDisplayMode } from "../types/SettingModes";
import { IndexUtils } from "./IndexUtils";
import { ChordUtils } from "./ChordUtils";

interface DisplayInfo {
  noteGroupingString: string;
  chordName: string;
}

export class ChordAndIntervalManager {
  static getDefinitionFromId = (id: NoteGroupingId): NoteGrouping =>
    NoteGroupingLibrary.getGroupingById(id);

  static hasInversions = (id: NoteGroupingId): boolean => {
    const definition = NoteGroupingLibrary.getGroupingById(id);
    return definition?.offsets.length > 1;
  };

  static getDisplayInfoFromIndices(
    indices: ActualIndex[],
    chordDisplayMode: ChordDisplayMode,
    musicalKey: MusicalKey,
  ): DisplayInfo {
    const chordMatch = ChordUtils.getMatchFromIndices(indices);
    const noteGrouping = NoteGrouping.getNoteGroupingTypeFromNumNotes(indices.length);
    const chordName = ChordUtils.deriveChordName(chordMatch, chordDisplayMode, musicalKey);
    const noteGroupingString = noteGrouping.toString();
    return { noteGroupingString, chordName };
  }

  static calculateChordNotesFromIndex = (
    rootIndex: ActualIndex,
    chordType: NoteGroupingId,
    inversionIndex: InversionIndex = ixInversion(0),
  ): ActualIndex[] => {
    const chordOffsets = ChordUtils.getOffsetsFromIdAndInversion(chordType, inversionIndex);
    const newNotes = chordOffsets.map((offset: number) => (offset + rootIndex) as ActualIndex);
    return ixActualArray(IndexUtils.fitChordToAbsoluteRange(newNotes));
  };
}
