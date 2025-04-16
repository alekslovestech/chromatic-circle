import { AccidentalType } from "./AccidentalType";
import { addOffsetToActual } from "./IndexTypes";
import { MusicalKey } from "./Keys/MusicalKey";
import { NoteGroupingLibrary } from "./NoteGroupingLibrary";
import { ChordType, NoteGroupingType, NoteGroupingId } from "./NoteGroupingTypes";
import { ChordDisplayMode } from "./SettingModes";
import { NoteConverter } from "./NoteConverter";
import { ChordMatch } from "./ChordMatch";
import { ChordFactory } from "./ChordFactory";
import { InversionIndex, ixInversion } from "./IndexTypes";

export class ChordNameResolver {
  static deriveChordName(
    chordMatch: ChordMatch,
    displayMode: ChordDisplayMode,
    selectedMusicalKey: MusicalKey,
  ): string {
    const selectedAccidental = selectedMusicalKey.getDefaultAccidental();
    const isUnknownChord = chordMatch.definition.id === ChordType.Unknown;
    let bassNoteIndex = chordMatch.rootNote;

    if (!isUnknownChord && chordMatch.definition.offsets.length > 0) {
      const offsets = this.getOffsetsFromIdAndInversion(
        chordMatch.definition.id,
        chordMatch.inversionIndex,
      );
      bassNoteIndex = addOffsetToActual(chordMatch.rootNote, offsets[0]);
    }

    const chordNameRoot = this.getRootNoteChordName(chordMatch, displayMode, selectedAccidental);

    const noteGroupingType = isUnknownChord
      ? NoteGroupingType.Chord
      : chordMatch.definition.getNoteGroupingType();

    switch (noteGroupingType) {
      case NoteGroupingType.None:
        return "Ø";
      case NoteGroupingType.Note:
        return `${chordNameRoot}`;
      case NoteGroupingType.Interval:
        return NoteGroupingLibrary.getId(chordMatch.definition.id, displayMode);
      default:
        if (bassNoteIndex !== chordMatch.rootNote) {
          const bassNoteName = NoteConverter.getNoteTextFromActualIndex(
            bassNoteIndex,
            selectedAccidental,
          );
          return `${chordNameRoot}/${bassNoteName}`;
        }
        return chordNameRoot;
    }
  }

  private static getRootNoteChordName(
    chordMatch: ChordMatch,
    displayMode: ChordDisplayMode,
    accidental: AccidentalType,
  ): string {
    const rootNoteName = NoteConverter.getNoteTextFromActualIndex(chordMatch.rootNote, accidental);
    const isUnknown = chordMatch.definition.id === ChordType.Unknown;
    const idWithoutRoot = isUnknown
      ? "-"
      : NoteGroupingLibrary.getId(chordMatch.definition.id, displayMode);
    return `${rootNoteName}${idWithoutRoot}`;
  }

  static getOffsetsFromIdAndInversion(
    id: NoteGroupingId,
    inversionIndex: InversionIndex = ixInversion(0),
  ) {
    return ChordFactory.getOffsetsFromIdAndInversion(id, inversionIndex);
  }
}
