import { ChordMatch } from "../types/ChordMatch";
import {
  ActualIndex,
  InversionIndex,
  OffsetIndex,
  ixActual,
  ixActualArray,
  ixInversion,
} from "../types/IndexTypes";
import { MusicalKey, MusicalKeyUtil } from "../types/MusicalKey";
import { NoteGrouping } from "../types/NoteGrouping";
import { NoteGroupingLibrary } from "../types/NoteGroupingLibrary";
import { NoteGroupingId, SpecialType } from "../types/NoteGroupingTypes";
import { TWELVE } from "../types/NoteConstants";
import { ChordDisplayMode } from "../types/SettingModes";
import { IndexUtils } from "./IndexUtils";

export class ChordAndIntervalManager {
  static getDefinitionFromId = (id: NoteGroupingId): NoteGrouping =>
    // new NoteGrouping(id, NoteGroupingLibrary.getGroupingById(id).offsets, this.hasInversions(id) );
    NoteGroupingLibrary.getGroupingById(id);

  static hasInversions = (id: NoteGroupingId): boolean => {
    const definition = NoteGroupingLibrary.getGroupingById(id);
    return definition?.offsets.length > 1;
  };

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

  static getMatchFromIndices(indices: ActualIndex[]): ChordMatch | undefined {
    if (indices.length === 0) {
      return new ChordMatch(0 as ActualIndex, this.getDefinitionFromId(SpecialType.None));
    }

    const normalizedIndices = IndexUtils.normalizeIndices(indices);

    for (const id of NoteGroupingLibrary.getAllIds()) {
      const noteGroupingId = id as NoteGroupingId; // Ensure id is treated as NoteGroupingId
      const definition = this.getDefinitionFromId(noteGroupingId);

      // Check for root position (0th index) first
      const rootIndices = IndexUtils.normalizeIndices(definition.inversions[0]);
      if (!IndexUtils.areIndicesEqual(rootIndices, normalizedIndices)) continue;
      return this.getChordMatchFromIndices(indices, definition, ixInversion(0));
    }

    // Then check other inversions
    for (const id of NoteGroupingLibrary.getAllIds()) {
      const definition = this.getDefinitionFromId(id as NoteGroupingId);
      for (let i = 1 as InversionIndex; i < definition.inversions.length; i++) {
        const inversionIndices = IndexUtils.normalizeIndices(definition.inversions[i]);
        if (!IndexUtils.areIndicesEqual(inversionIndices, normalizedIndices)) continue;
        return this.getChordMatchFromIndices(indices, definition, ixInversion(i));
      }
    }
    return undefined;
  }

  static getChordNameFromIndices(
    indices: ActualIndex[],
    displayMode = ChordDisplayMode.Letters_Short,
    selectedMusicalKey: MusicalKey = MusicalKeyUtil.defaultMusicalKey,
    /* accidental = AccidentalType.Sharp,*/
  ): string {
    const chordMatch = this.getMatchFromIndices(indices);
    if (chordMatch) return chordMatch.deriveChordName(displayMode, selectedMusicalKey);

    return "Unknown";
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
}
