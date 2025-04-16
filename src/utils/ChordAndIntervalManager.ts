import { ChordMatch } from "../types/ChordMatch";
import {
  ActualIndex,
  InversionIndex,
  OffsetIndex,
  ixActual,
  ixActualArray,
  ixInversion,
} from "../types/IndexTypes";
import { DEFAULT_MUSICAL_KEY, MusicalKey } from "../types/Keys/MusicalKey";
import { NoteGrouping } from "../types/NoteGrouping";
import { NoteGroupingLibrary } from "../types/NoteGroupingLibrary";
import { NoteGroupingId, SpecialType } from "../types/NoteGroupingTypes";
import { TWELVE } from "../types/NoteConstants";
import { ChordDisplayMode } from "../types/SettingModes";
import { IndexUtils } from "./IndexUtils";

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
    const chordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
    const noteGrouping = NoteGrouping.getNoteGroupingTypeFromNumNotes(indices.length);
    const chordName = chordMatch.deriveChordName(chordDisplayMode, musicalKey);
    const noteGroupingString = noteGrouping.toString();
    return { noteGroupingString, chordName };
  }

  static getOffsetsFromIdAndInversion(
    id: NoteGroupingId,
    inversionIndex: InversionIndex = ixInversion(0),
  ): OffsetIndex[] {
    const definition = this.getDefinitionFromId(id);
    if (!definition) {
      console.warn(`No chord definition found for type: ${id}`);
      throw new Error(`Invalid chord type: ${id}`);
    }

    if (inversionIndex === 0) return definition.offsets;
    return definition.inversions[inversionIndex];
  }

  static getMatchFromIndices(indices: ActualIndex[]): ChordMatch {
    if (indices.length === 0)
      return new ChordMatch(0 as ActualIndex, this.getDefinitionFromId(SpecialType.None));

    const normalizedIndices = IndexUtils.normalizeIndices(indices);

    const allIds = NoteGroupingLibrary.getAllIds();
    // First check all note grouping types in root position
    for (const id of allIds) {
      const definition = this.getDefinitionFromId(id);
      const rootMatch = this.checkForMatchingInversion(
        indices,
        normalizedIndices,
        definition,
        ixInversion(0),
      );
      if (rootMatch) return rootMatch;
    }

    // Then check all inversions for each type
    for (const id of allIds) {
      const definition = this.getDefinitionFromId(id);
      for (let i = 1 as InversionIndex; i < definition.inversions.length; i++) {
        const match = this.checkForMatchingInversion(indices, normalizedIndices, definition, i);
        if (match) return match;
      }
    }

    return this.getChordMatchUnknown(indices);
  }

  static getChordNameFromIndices(
    indices: ActualIndex[],
    displayMode = ChordDisplayMode.Letters_Short,
    selectedMusicalKey: MusicalKey = DEFAULT_MUSICAL_KEY,
  ): string {
    const chordMatch = this.getMatchFromIndices(indices);
    return chordMatch.deriveChordName(displayMode, selectedMusicalKey);
  }

  static calculateChordNotesFromIndex = (
    rootIndex: ActualIndex,
    chordType: NoteGroupingId,
    inversionIndex: InversionIndex = ixInversion(0),
  ): ActualIndex[] => {
    const chordOffsets = this.getOffsetsFromIdAndInversion(chordType, inversionIndex);
    const newNotes = chordOffsets.map((offset: number) => (offset + rootIndex) as ActualIndex);
    return ixActualArray(IndexUtils.fitChordToAbsoluteRange(newNotes));
  };

  private static getChordMatchFromIndices(
    indices: ActualIndex[],
    definition: NoteGrouping,
    inversionIndex: InversionIndex,
  ): ChordMatch {
    const rootNoteIndex = ixActual(
      IndexUtils.rootNoteAtInversion(indices, inversionIndex) % TWELVE,
    );
    return new ChordMatch(rootNoteIndex, definition, inversionIndex);
  }

  private static getChordMatchUnknown(indices: ActualIndex[]): ChordMatch {
    const definition = NoteGrouping.createUnknownChord(indices);
    return new ChordMatch(ixActual(indices[0]), definition, ixInversion(0));
  }

  private static checkForMatchingInversion(
    indices: ActualIndex[],
    normalizedIndices: number[],
    definition: NoteGrouping,
    inversionIndex: InversionIndex,
  ): ChordMatch | null {
    const inversionIndices = IndexUtils.normalizeIndices(definition.inversions[inversionIndex]);
    if (!IndexUtils.areIndicesEqual(inversionIndices, normalizedIndices)) return null;
    return this.getChordMatchFromIndices(indices, definition, inversionIndex);
  }
}
