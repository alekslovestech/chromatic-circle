import { AccidentalType } from "../types/AccidentalType";
import { NoteGroupings } from "../types/NoteGrouping";
import { ChordDefinition } from "../types/ChordDefinition";
import {
  ActualIndex,
  ixInversion,
  ixOffsetArray,
  InversionIndex,
  OffsetIndex,
} from "../types/IndexTypes";
import { TWELVE } from "../types/NoteConstants";
import { IndexUtils } from "./IndexUtils";
import { ChordMatch } from "../types/ChordMatch";
import { ChordDisplayMode } from "../types/ChordDisplayMode";
import { ChordType, IntervalType, NoteGroupingId, SpecialType } from "../types/NoteGroupingTypes";

export class ChordAndIntervalManager {
  private static readonly OFFSETS: ChordDefinition[] = [
    new ChordDefinition(SpecialType.None, ixOffsetArray([])),
    new ChordDefinition(SpecialType.Note, ixOffsetArray([0])),

    new ChordDefinition(IntervalType.Minor2, ixOffsetArray([0, 1])),
    new ChordDefinition(IntervalType.Major2, ixOffsetArray([0, 2])),
    new ChordDefinition(IntervalType.Minor3, ixOffsetArray([0, 3])),
    new ChordDefinition(IntervalType.Major3, ixOffsetArray([0, 4])),
    new ChordDefinition(IntervalType.Fourth, ixOffsetArray([0, 5])),
    new ChordDefinition(IntervalType.Tritone, ixOffsetArray([0, 6])),
    new ChordDefinition(IntervalType.Fifth, ixOffsetArray([0, 7])),
    new ChordDefinition(IntervalType.Minor6, ixOffsetArray([0, 8])),
    new ChordDefinition(IntervalType.Major6, ixOffsetArray([0, 9])),
    new ChordDefinition(IntervalType.Minor7, ixOffsetArray([0, 10])),
    new ChordDefinition(IntervalType.Major7, ixOffsetArray([0, 11])),
    new ChordDefinition(IntervalType.Octave, ixOffsetArray([0, 12])),

    // Triads
    new ChordDefinition(ChordType.Major, ixOffsetArray([0, 4, 7]), true),
    new ChordDefinition(ChordType.Minor, ixOffsetArray([0, 3, 7]), true),
    new ChordDefinition(ChordType.Diminished, ixOffsetArray([0, 3, 6]), true),
    new ChordDefinition(ChordType.Augmented, ixOffsetArray([0, 4, 8]), true),

    // Seventh chords
    new ChordDefinition(ChordType.Major7, ixOffsetArray([0, 4, 7, 11]), true),
    new ChordDefinition(ChordType.Minor7, ixOffsetArray([0, 3, 7, 10]), false),
    new ChordDefinition(ChordType.Dominant7, ixOffsetArray([0, 4, 7, 10]), true),
    new ChordDefinition(ChordType.MinorMajor7, ixOffsetArray([0, 3, 7, 11]), true),
    new ChordDefinition(ChordType.Minor7b5, ixOffsetArray([0, 3, 6, 10])),
    new ChordDefinition(ChordType.Diminished7, ixOffsetArray([0, 3, 6, 9])),

    // Other chord types
    new ChordDefinition(ChordType.Sus4, ixOffsetArray([0, 5, 7]), true),
    new ChordDefinition(ChordType.Sus2, ixOffsetArray([0, 2, 7]), true),
    new ChordDefinition(ChordType.Add9, ixOffsetArray([0, 4, 7, 14])),
    new ChordDefinition(ChordType.Six, ixOffsetArray([0, 4, 7, 9])),
    new ChordDefinition(ChordType.Minor6, ixOffsetArray([0, 3, 7, 9])),
    new ChordDefinition(ChordType.Seven13, ixOffsetArray([0, 4, 7, 10, 13])),
  ];

  static getDefinitionFromId = (id: NoteGroupingId): ChordDefinition | undefined =>
    this.OFFSETS.find((def) => def.id === id);

  static hasInversions = (id: NoteGroupingId): boolean => {
    const definition = this.getDefinitionFromId(id);
    return definition ? definition.inversions.length > 1 : false;
  };

  static getOffsetsFromIdAndInversion(
    id: NoteGroupingId,
    inversionIndex: InversionIndex = ixInversion(0),
  ): OffsetIndex[] {
    const chordDefinition = this.getDefinitionFromId(id);
    if (chordDefinition) return chordDefinition.inversions[inversionIndex];

    console.warn(`No chord definition found for type: ${id}`);
    throw new Error(`Invalid chord type: ${id}`);
  }

  static IntervalOrChordDefinitions = (isInterval: boolean) => {
    const filteredResult = this.OFFSETS.filter((chordDef) =>
      isInterval ? chordDef.numNotes === 2 : chordDef.numNotes > 2,
    );
    return filteredResult.sort((a, b) => NoteGroupings[a.id].orderId - NoteGroupings[b.id].orderId);
  };

  static getMatchFromIndices(indices: ActualIndex[]): ChordMatch | undefined {
    if (indices.length === 0)
      return new ChordMatch(0 as ActualIndex, new ChordDefinition(SpecialType.None, []));

    const normalizedIndices = IndexUtils.normalizeIndices(indices);

    for (const def of this.OFFSETS) {
      for (let i = 0 as InversionIndex; i < def.inversions.length; i++) {
        const inversionIndices = IndexUtils.normalizeIndices(def.inversions[i]);
        if (!IndexUtils.areIndicesEqual(inversionIndices, normalizedIndices)) continue;
        const rootNoteIndex = IndexUtils.rootNoteAtInversion(indices, i) % TWELVE;
        return new ChordMatch(rootNoteIndex as ActualIndex, def, i);
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
