import { AccidentalType } from "../types/AccidentalType";
import { addOffsetToActual, ixActualArray, ixOffset } from "../types/IndexTypes";
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

interface DisplayInfo {
  noteGroupingString: string;
  chordName: string;
}

export class ChordUtils {
  static hasInversions = (id: NoteGroupingId): boolean => {
    const definition = NoteGroupingLibrary.getGroupingById(id);
    return definition?.offsets.length > 1;
  };

  static getDisplayInfoFromIndices(
    indices: ActualIndex[],
    chordDisplayMode: ChordDisplayMode,
    musicalKey: MusicalKey,
  ): DisplayInfo {
    const chordMatch = this.getMatchFromIndices(indices);
    const noteGrouping = NoteGrouping.getNoteGroupingTypeFromNumNotes(indices.length);
    const chordName = this.deriveChordName(chordMatch, chordDisplayMode, musicalKey);
    const noteGroupingString = noteGrouping.toString();
    return { noteGroupingString, chordName };
  }

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

    return this.createUnknownChord(indices);
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

    // Format the chord name based on the note grouping type
    switch (noteGroupingType) {
      case NoteGroupingType.None:
        return "Ø";
      case NoteGroupingType.Note:
        return chordNameRoot;
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

  static calculateUpdatedIndices(
    newIndex: ActualIndex,
    isToggle: boolean,
    selectedNoteIndices: ActualIndex[],
    chordType: NoteGroupingId,
    inversionIndex: InversionIndex,
  ): ActualIndex[] {
    if (isToggle) return IndexUtils.ToggleNewIndex(selectedNoteIndices, newIndex as ActualIndex);
    return this.calculateChordNotesFromIndex(newIndex, chordType, inversionIndex);
  }

  static calculateChordNotesFromIndex(
    rootIndex: ActualIndex,
    chordType: NoteGroupingId,
    inversionIndex: InversionIndex,
  ): ActualIndex[] {
    const chordOffsets = ChordUtils.getOffsetsFromIdAndInversion(chordType, inversionIndex);
    const newNotes = chordOffsets.map((offset: number) => (offset + rootIndex) as ActualIndex);
    return ixActualArray(IndexUtils.fitChordToAbsoluteRange(newNotes));
  }

  private static createUnknownChord(indices: ActualIndex[]): IChordMatch {
    const firstIndex = indices.length > 0 ? indices[0] : 0;
    const offsets = indices.map((index) => ixOffset(index - firstIndex));
    return {
      rootNote: ixActual(firstIndex),
      definition: new NoteGrouping(ChordType.Unknown, "", "", "", -1, offsets, false),
      inversionIndex: ixInversion(0),
    };
  }

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
}
