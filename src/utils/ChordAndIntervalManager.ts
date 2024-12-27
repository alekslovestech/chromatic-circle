import { ActualIndex, ixInversion, InversionIndex, OffsetIndex } from "../types/IndexTypes";
import { TWELVE } from "../types/NoteConstants";
import { IndexUtils } from "./IndexUtils";
import { ChordMatch } from "../types/ChordMatch";
import { NoteGroupingId, SpecialType } from "../types/NoteGroupingTypes";
import { ChordDisplayMode } from "../types/ChordDisplayMode";
import { AccidentalType } from "../types/AccidentalType";
import { NoteGroupingLibrary } from "../types/NoteGroupingLibrary";
import { NoteGrouping } from "../types/NoteGrouping";

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

  static getMatchFromIndices(indices: ActualIndex[]): ChordMatch | undefined {
    if (indices.length === 0) {
      return new ChordMatch(0 as ActualIndex, this.getDefinitionFromId(SpecialType.None));
    }

    const normalizedIndices = IndexUtils.normalizeIndices(indices);

    for (const id of NoteGroupingLibrary.getIds()) {
      const noteGroupingId = id as NoteGroupingId; // Ensure id is treated as NoteGroupingId
      const definition = this.getDefinitionFromId(noteGroupingId);

      // Check for root position (0th index) first
      const rootIndices = IndexUtils.normalizeIndices(definition.inversions[0]);
      if (IndexUtils.areIndicesEqual(rootIndices, normalizedIndices)) {
        const rootNoteIndex = IndexUtils.rootNoteAtInversion(indices, ixInversion(0)) % TWELVE;
        return new ChordMatch(rootNoteIndex as ActualIndex, definition, ixInversion(0));
      }
    }

    // Then check other inversions
    for (const id of NoteGroupingLibrary.getIds()) {
      const definition = this.getDefinitionFromId(id as NoteGroupingId);
      for (let i = 1 as InversionIndex; i < definition.inversions.length; i++) {
        const inversionIndices = IndexUtils.normalizeIndices(definition.inversions[i]);
        if (!IndexUtils.areIndicesEqual(inversionIndices, normalizedIndices)) continue;
        const rootNoteIndex = IndexUtils.rootNoteAtInversion(indices, i) % TWELVE;
        return new ChordMatch(rootNoteIndex as ActualIndex, definition, ixInversion(i));
      }
    }
    return undefined;
  }

  static getChordNameFromIndices(
    indices: ActualIndex[],
    displayMode = ChordDisplayMode.Letters_Short,
    accidental = AccidentalType.Sharp,
  ): string {
    const chordMatch = this.getMatchFromIndices(indices);
    if (chordMatch) return chordMatch.deriveChordName(displayMode, accidental);

    return "Unknown";
  }

  static calculateChordNotesFromIndex = (
    rootIndex: ActualIndex,
    chordType: NoteGroupingId,
    inversionIndex: InversionIndex = ixInversion(0),
  ): ActualIndex[] => {
    const chordOffsets = this.getOffsetsFromIdAndInversion(chordType, inversionIndex);
    const newNotes = chordOffsets.map((offset: number) => (offset + rootIndex) as ActualIndex);
    return IndexUtils.fitChordToAbsoluteRange(newNotes);
  };
}
