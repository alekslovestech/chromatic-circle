import {
  ActualIndex,
  InversionIndex,
  ixOffset,
  ixActual,
  ixInversion,
  OffsetIndex,
} from "../types/IndexTypes";
import { NoteGrouping } from "../types/NoteGrouping";
import { ChordMatch } from "../types/ChordMatch";
import { TWELVE } from "../types/NoteConstants";
import { ChordType, SpecialType, NoteGroupingId } from "../types/NoteGroupingTypes";
import { NoteGroupingLibrary } from "../types/NoteGroupingLibrary";
import { IndexUtils } from "./IndexUtils";

export class ChordFactory {
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

  static getMatchFromIndices(indices: ActualIndex[]): ChordMatch {
    if (indices.length === 0) return this.createEmptyChordMatch();

    const normalizedIndices = IndexUtils.normalizeIndices(indices);

    const allIds = NoteGroupingLibrary.getAllIds();
    // First check all note grouping types in root position
    for (const id of allIds) {
      const definition = NoteGroupingLibrary.getGroupingById(id);
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
      const definition = NoteGroupingLibrary.getGroupingById(id);
      for (let i = 1 as InversionIndex; i < definition.inversions.length; i++) {
        const match = this.checkForMatchingInversion(indices, normalizedIndices, definition, i);
        if (match) return match;
      }
    }

    return this.createUnknownChordMatch(indices);
  }

  private static checkForMatchingInversion(
    indices: ActualIndex[],
    normalizedIndices: number[],
    definition: NoteGrouping,
    inversionIndex: InversionIndex,
  ): ChordMatch | null {
    const inversionIndices = IndexUtils.normalizeIndices(definition.inversions[inversionIndex]);
    if (!IndexUtils.areIndicesEqual(inversionIndices, normalizedIndices)) return null;
    return this.createChordMatch(indices, definition, inversionIndex);
  }

  private static createChordMatch(
    indices: ActualIndex[],
    definition: NoteGrouping,
    inversionIndex: InversionIndex,
  ): ChordMatch {
    const rootNoteIndex =
      indices.length > 0
        ? ixActual(IndexUtils.rootNoteAtInversion(indices, inversionIndex) % TWELVE)
        : ixActual(0);
    return new ChordMatch(rootNoteIndex, definition, inversionIndex);
  }

  //unknown chord (e.g. [C, D, E])
  private static createUnknownChordMatch(indices: ActualIndex[]): ChordMatch {
    const firstIndex = indices.length > 0 ? indices[0] : 0;
    const offsets = indices.map((index) => ixOffset(index - firstIndex));
    const noteGrouping = new NoteGrouping(ChordType.Unknown, "", "", "", -1, offsets, false);
    return new ChordMatch(ixActual(firstIndex), noteGrouping, ixInversion(0));
  }

  //empty chord (aka [], aka Ø)
  private static createEmptyChordMatch(): ChordMatch {
    return new ChordMatch(
      ixActual(0),
      NoteGroupingLibrary.getGroupingById(SpecialType.None),
      ixInversion(0),
    );
  }
}
