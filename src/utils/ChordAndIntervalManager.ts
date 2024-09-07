import { Accidental } from "../types/Accidental";
import { NoteGroupingId } from "../types/NoteGrouping";
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

export class ChordAndIntervalManager {
  private static readonly OFFSETS: ChordDefinition[] = [
    new ChordDefinition(NoteGroupingId.None, ixOffsetArray([])),
    new ChordDefinition(NoteGroupingId.Note, ixOffsetArray([0])),
    new ChordDefinition(NoteGroupingId.Interval_Min2, ixOffsetArray([0, 1])),
    new ChordDefinition(NoteGroupingId.Interval_Maj2, ixOffsetArray([0, 2])),
    new ChordDefinition(NoteGroupingId.Interval_Min3, ixOffsetArray([0, 3])),
    new ChordDefinition(NoteGroupingId.Interval_Maj3, ixOffsetArray([0, 4])),
    new ChordDefinition(NoteGroupingId.Interval_Fourth, ixOffsetArray([0, 5])),
    new ChordDefinition(NoteGroupingId.Interval_Tritone, ixOffsetArray([0, 6])),
    new ChordDefinition(NoteGroupingId.Interval_Fifth, ixOffsetArray([0, 7])),
    new ChordDefinition(NoteGroupingId.Interval_Min6, ixOffsetArray([0, 8])),
    new ChordDefinition(NoteGroupingId.Interval_Maj6, ixOffsetArray([0, 9])),
    new ChordDefinition(NoteGroupingId.Interval_Min7, ixOffsetArray([0, 10])),
    new ChordDefinition(NoteGroupingId.Interval_Maj7, ixOffsetArray([0, 11])),
    new ChordDefinition(NoteGroupingId.Interval_Oct, ixOffsetArray([0, 12])),

    // Triads
    new ChordDefinition(NoteGroupingId.Chord_Maj, ixOffsetArray([0, 4, 7]), true),
    new ChordDefinition(NoteGroupingId.Chord_Min, ixOffsetArray([0, 3, 7]), true),
    new ChordDefinition(NoteGroupingId.Chord_Dim, ixOffsetArray([0, 3, 6])),
    new ChordDefinition(NoteGroupingId.Chord_Aug, ixOffsetArray([0, 4, 8])),

    // Seventh chords
    new ChordDefinition(NoteGroupingId.Chord_Maj7, ixOffsetArray([0, 4, 7, 11]), true),
    new ChordDefinition(NoteGroupingId.Chord_Min7, ixOffsetArray([0, 3, 7, 10]), true),
    new ChordDefinition(NoteGroupingId.Chord_Dom7, ixOffsetArray([0, 4, 7, 10]), true),
    new ChordDefinition(NoteGroupingId.Chord_MMaj7, ixOffsetArray([0, 3, 7, 11]), true),
    new ChordDefinition(NoteGroupingId.Chord_M7b5, ixOffsetArray([0, 3, 6, 10]), true),
    new ChordDefinition(NoteGroupingId.Chord_Dim7, ixOffsetArray([0, 3, 6, 9])),

    // Other chord types
    new ChordDefinition(NoteGroupingId.Chord_Sus4, ixOffsetArray([0, 5, 7])),
    new ChordDefinition(NoteGroupingId.Chord_Sus2, ixOffsetArray([0, 2, 7])),
    new ChordDefinition(NoteGroupingId.Chord_Add9, ixOffsetArray([0, 4, 7, 14])),
    new ChordDefinition(NoteGroupingId.Chord_Six, ixOffsetArray([0, 4, 7, 9])),
    new ChordDefinition(NoteGroupingId.Chord_Min6, ixOffsetArray([0, 3, 7, 9])),
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
    return this.OFFSETS.filter((chordDef) =>
      isInterval ? chordDef.numNotes === 2 : chordDef.numNotes > 2,
    );
  };

  static getMatchFromIndices(indices: ActualIndex[]): ChordMatch | undefined {
    if (indices.length === 0)
      return new ChordMatch(0 as ActualIndex, new ChordDefinition(NoteGroupingId.None, []));

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
    accidental: Accidental = Accidental.Sharp,
  ): string {
    const chordMatch = this.getMatchFromIndices(indices);
    if (chordMatch) return chordMatch.deriveChordName(accidental);

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
