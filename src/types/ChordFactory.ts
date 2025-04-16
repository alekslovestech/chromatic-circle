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
import { IndexUtils } from "../utils/IndexUtils";
import { TWELVE } from "../types/NoteConstants";
import { ChordType, SpecialType, NoteGroupingId } from "./NoteGroupingTypes";
import { NoteGroupingLibrary } from "./NoteGroupingLibrary";

export class ChordFactory {
  static createChordMatch(
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
  static createUnknownChordMatch(indices: ActualIndex[]): ChordMatch {
    const firstIndex = indices.length > 0 ? indices[0] : 0;
    const offsets = indices.map((index) => ixOffset(index - firstIndex));
    const noteGrouping = new NoteGrouping(ChordType.Unknown, "", "", "", -1, offsets, false);
    return new ChordMatch(ixActual(firstIndex), noteGrouping, ixInversion(0));
  }

  //empty chord (aka [], aka Ø)
  static createEmptyChordMatch(): ChordMatch {
    return new ChordMatch(
      ixActual(0),
      NoteGroupingLibrary.getGroupingById(SpecialType.None),
      ixInversion(0),
    );
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

  static checkForMatchingInversion(
    indices: ActualIndex[],
    normalizedIndices: number[],
    definition: NoteGrouping,
    inversionIndex: InversionIndex,
  ): ChordMatch | null {
    const inversionIndices = IndexUtils.normalizeIndices(definition.inversions[inversionIndex]);
    if (!IndexUtils.areIndicesEqual(inversionIndices, normalizedIndices)) return null;
    return this.createChordMatch(indices, definition, inversionIndex);
  }

  static findRootPositionMatch(
    indices: ActualIndex[],
    normalizedIndices: number[],
  ): ChordMatch | null {
    const allIds = NoteGroupingLibrary.getAllIds();

    // Check all note grouping types in root position
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

    return null;
  }

  static findInversionMatch(
    indices: ActualIndex[],
    normalizedIndices: number[],
  ): ChordMatch | null {
    const allIds = NoteGroupingLibrary.getAllIds();

    // Check all inversions for each type
    for (const id of allIds) {
      const definition = NoteGroupingLibrary.getGroupingById(id);
      for (let i = 1 as InversionIndex; i < definition.inversions.length; i++) {
        const match = this.checkForMatchingInversion(indices, normalizedIndices, definition, i);
        if (match) return match;
      }
    }

    return null;
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
}
