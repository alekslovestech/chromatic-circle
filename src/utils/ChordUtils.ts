import { AccidentalType } from "../types/AccidentalType";
import { addOffsetToActual, ixActualArray, ixOffsetArray } from "../types/IndexTypes";
import { MusicalKey } from "../types/Keys/MusicalKey";
import { NoteGroupingLibrary } from "../types/NoteGroupingLibrary";
import { ChordType, NoteGroupingType, NoteGroupingId } from "../types/NoteGroupingTypes";
import { ChordDisplayMode } from "../types/SettingModes";
import { NoteConverter } from "../types/NoteConverter";
import { IChordMatch } from "../types/ChordMatch";
import {
  InversionIndex,
  ixInversion,
  ActualIndex,
  OffsetIndex,
  ixActual,
} from "../types/IndexTypes";
import { NoteGrouping } from "../types/NoteGrouping";
import { TWELVE } from "../types/NoteConstants";
import { SpecialType } from "../types/NoteGroupingTypes";

import { IndexUtils } from "./IndexUtils";

export class ChordUtils {
  static getOffsetsFromIdAndInversion(
    id: NoteGroupingId,
    inversionIndex: InversionIndex = ixInversion(0),
  ): OffsetIndex[] {
    const definition = NoteGroupingLibrary.getGroupingById(id);
    if (!definition) {
      console.warn(`No chord definition found for type: ${id}`);
      throw new Error(`Invalid chord type: ${id}`);
    }

    if (inversionIndex === 0) return definition.offsets;
    return definition.inversions[inversionIndex];
  }

  static getMatchFromIndices(indices: ActualIndex[]): IChordMatch {
    if (indices.length === 0) {
      return {
        rootNote: ixActual(0),
        definition: NoteGroupingLibrary.getGroupingById(SpecialType.None),
        inversionIndex: ixInversion(0),
      };
    }

    const normalizedIndices = IndexUtils.normalizeIndices(indices);
    const allIds = NoteGroupingLibrary.getAllIds();

    // Check all note grouping types in root position first
    for (const id of allIds) {
      const definition = NoteGroupingLibrary.getGroupingById(id);
      const inversionIndices = IndexUtils.normalizeIndices(definition.offsets);

      if (IndexUtils.areIndicesEqual(inversionIndices, normalizedIndices)) {
        const rootNoteIndex = ixActual(
          IndexUtils.rootNoteAtInversion(indices, ixInversion(0)) % TWELVE,
        );
        return { rootNote: rootNoteIndex, definition, inversionIndex: ixInversion(0) };
      }
    }

    // Then check all inversions for each type
    for (const id of allIds) {
      const definition = NoteGroupingLibrary.getGroupingById(id);
      for (let i = 1 as InversionIndex; i < definition.inversions.length; i++) {
        const inversionIndices = IndexUtils.normalizeIndices(definition.inversions[i]);
        if (IndexUtils.areIndicesEqual(inversionIndices, normalizedIndices)) {
          const rootNoteIndex = ixActual(IndexUtils.rootNoteAtInversion(indices, i) % TWELVE);
          return { rootNote: rootNoteIndex, definition, inversionIndex: i };
        }
      }
    }

    const firstIndex = indices[0];
    const offsets = indices.map((index) => (index - firstIndex) % TWELVE).sort((a, b) => a - b);
    const noteGrouping = new NoteGrouping(
      ChordType.Unknown,
      "",
      "",
      "",
      -1,
      ixOffsetArray(offsets),
      false,
    );
    return {
      rootNote: ixActual(firstIndex),
      definition: noteGrouping,
      inversionIndex: ixInversion(0),
    };
  }

  static deriveChordName(
    chordMatch: IChordMatch,
    displayMode: ChordDisplayMode,
    selectedMusicalKey: MusicalKey,
  ): string {
    const selectedAccidental = selectedMusicalKey.getDefaultAccidental();
    const isUnknownChord = chordMatch.definition.id === ChordType.Unknown;
    const bassNoteIndex = this.getBassNoteIndex(chordMatch, isUnknownChord);
    const chordNameRoot = this.getChordNameRoot(
      chordMatch,
      selectedAccidental,
      isUnknownChord,
      displayMode,
    );
    const noteGroupingType = this.getNoteGroupingType(chordMatch, isUnknownChord);

    return this.formatChordName(
      chordNameRoot,
      noteGroupingType,
      bassNoteIndex,
      chordMatch.rootNote,
      selectedAccidental,
      chordMatch,
      displayMode,
    );
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

  private static getBassNoteIndex(chordMatch: IChordMatch, isUnknownChord: boolean): ActualIndex {
    if (isUnknownChord || chordMatch.definition.offsets.length === 0) {
      return chordMatch.rootNote;
    }

    const offsets = this.getOffsetsFromIdAndInversion(
      chordMatch.definition.id,
      chordMatch.inversionIndex,
    );
    return addOffsetToActual(chordMatch.rootNote, offsets[0]);
  }

  private static getChordNameRoot(
    chordMatch: IChordMatch,
    selectedAccidental: AccidentalType,
    isUnknownChord: boolean,
    displayMode: ChordDisplayMode,
  ): string {
    const rootNoteName = NoteConverter.getNoteTextFromActualIndex(
      chordMatch.rootNote,
      selectedAccidental,
    );
    const idWithoutRoot = isUnknownChord
      ? "-"
      : NoteGroupingLibrary.getId(chordMatch.definition.id, displayMode);
    return `${rootNoteName}${idWithoutRoot}`;
  }

  private static getNoteGroupingType(
    chordMatch: IChordMatch,
    isUnknownChord: boolean,
  ): NoteGroupingType {
    return isUnknownChord ? NoteGroupingType.Chord : chordMatch.definition.getNoteGroupingType();
  }

  private static formatChordName(
    chordNameRoot: string,
    noteGroupingType: NoteGroupingType,
    bassNoteIndex: ActualIndex,
    rootNoteIndex: ActualIndex,
    selectedAccidental: AccidentalType,
    chordMatch: IChordMatch,
    displayMode: ChordDisplayMode,
  ): string {
    switch (noteGroupingType) {
      case NoteGroupingType.None:
        return "Ø";
      case NoteGroupingType.Note:
        return chordNameRoot;
      case NoteGroupingType.Interval:
        return NoteGroupingLibrary.getId(chordMatch.definition.id, displayMode);
      default:
        if (bassNoteIndex !== rootNoteIndex) {
          const bassNoteName = NoteConverter.getNoteTextFromActualIndex(
            bassNoteIndex,
            selectedAccidental,
          );
          return `${chordNameRoot}/${bassNoteName}`;
        }
        return chordNameRoot;
    }
  }
}
