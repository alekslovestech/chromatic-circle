import { Accidental } from "../types/Accidental";
import { NoteGroupingId } from "../types/NoteGrouping";
import { ChordDefinition } from "../types/ChordDefinition";
import { ActualIndex, createOffsetIndexArray } from "../types/IndexTypes";
import { TWELVE } from "../types/NoteConstants";
import { IndexUtils } from "./IndexUtils";
import { ChordMatch } from "../types/ChordMatch";

export class ChordAndIntervalManager {
  private static readonly OFFSETS: ChordDefinition[] = [
    new ChordDefinition(NoteGroupingId.Note, createOffsetIndexArray([0])),
    new ChordDefinition(NoteGroupingId.Interval_Min2, createOffsetIndexArray([0, 1])),
    new ChordDefinition(NoteGroupingId.Interval_Maj2, createOffsetIndexArray([0, 2])),
    new ChordDefinition(NoteGroupingId.Interval_Min3, createOffsetIndexArray([0, 3])),
    new ChordDefinition(NoteGroupingId.Interval_Maj3, createOffsetIndexArray([0, 4])),
    new ChordDefinition(NoteGroupingId.Interval_Fourth, createOffsetIndexArray([0, 5])),
    new ChordDefinition(NoteGroupingId.Interval_Tritone, createOffsetIndexArray([0, 6])),
    new ChordDefinition(NoteGroupingId.Interval_Fifth, createOffsetIndexArray([0, 7])),
    new ChordDefinition(NoteGroupingId.Interval_Min6, createOffsetIndexArray([0, 8])),
    new ChordDefinition(NoteGroupingId.Interval_Maj6, createOffsetIndexArray([0, 9])),
    new ChordDefinition(NoteGroupingId.Interval_Min7, createOffsetIndexArray([0, 10])),
    new ChordDefinition(NoteGroupingId.Interval_Maj7, createOffsetIndexArray([0, 11])),
    new ChordDefinition(NoteGroupingId.Interval_Oct, createOffsetIndexArray([0, 12])),

    // Triads
    new ChordDefinition(NoteGroupingId.Chord_Maj, createOffsetIndexArray([0, 4, 7]), true),
    new ChordDefinition(NoteGroupingId.Chord_Min, createOffsetIndexArray([0, 3, 7]), true),
    new ChordDefinition(NoteGroupingId.Chord_Dim, createOffsetIndexArray([0, 3, 6])),
    new ChordDefinition(NoteGroupingId.Chord_Aug, createOffsetIndexArray([0, 4, 8])),

    // Seventh chords
    new ChordDefinition(NoteGroupingId.Chord_Maj7, createOffsetIndexArray([0, 4, 7, 11]), true),
    new ChordDefinition(NoteGroupingId.Chord_Min7, createOffsetIndexArray([0, 3, 7, 10]), true),
    new ChordDefinition(NoteGroupingId.Chord_Dom7, createOffsetIndexArray([0, 4, 7, 10]), true),
    new ChordDefinition(NoteGroupingId.Chord_MMaj7, createOffsetIndexArray([0, 3, 7, 11]), true),
    new ChordDefinition(NoteGroupingId.Chord_M7b5, createOffsetIndexArray([0, 3, 6, 10]), true),
    new ChordDefinition(NoteGroupingId.Chord_Dim7, createOffsetIndexArray([0, 3, 6, 9])),

    // Other chord types
    new ChordDefinition(NoteGroupingId.Chord_Sus4, createOffsetIndexArray([0, 5, 7])),
    new ChordDefinition(NoteGroupingId.Chord_Sus2, createOffsetIndexArray([0, 2, 7])),
    new ChordDefinition(NoteGroupingId.Chord_Add9, createOffsetIndexArray([0, 4, 7, 14])),
    new ChordDefinition(NoteGroupingId.Chord_Six, createOffsetIndexArray([0, 4, 7, 9])),
    new ChordDefinition(NoteGroupingId.Chord_Min6, createOffsetIndexArray([0, 3, 7, 9])),
  ];

  static getDefinitionFromId = (id: NoteGroupingId): ChordDefinition | undefined =>
    this.OFFSETS.find((def) => def.id === id);

  static getOffsetsFromIdAndInversion(
    id: NoteGroupingId,
    inversionIndex: number | undefined = undefined,
  ): number[] {
    const chordDefinition = this.getDefinitionFromId(id);
    if (chordDefinition) {
      if (inversionIndex !== undefined) {
        if (chordDefinition.hasInversions()) {
          return chordDefinition.inversions[inversionIndex];
        } else {
          throw new Error("Chord definition has no inversions, but index was provided");
        }
      }
      return chordDefinition.rootChord;
    } else {
      console.warn(`No chord definition found for type: ${id}`);
      throw new Error(`Invalid chord type: ${id}`);
    }
  }

  static IntervalOrChordDefinitions = (isInterval: boolean) => {
    return isInterval
      ? this.OFFSETS.filter((chordDef) => chordDef.isInterval())
      : this.OFFSETS.filter((chordDef) => chordDef.isChord());
  };

  static getMatchFromIndices(indices: ActualIndex[]): ChordMatch | undefined {
    if (indices.length === 0) {
      //we distinguish "no notes specified" from "no match found" (unknown chord)
      return new ChordMatch(0 as ActualIndex, new ChordDefinition(NoteGroupingId.None, []));
    }
    const rootNoteIndex = indices[0]; //this is the absolute index of the root note
    const normalizedIndices = IndexUtils.normalizeIndices(indices);
    const foundRootChord = this.OFFSETS.find((def) =>
      IndexUtils.areIndicesEqual(normalizedIndices, def.rootChord),
    );
    if (foundRootChord) return new ChordMatch(rootNoteIndex, foundRootChord);

    //root chord not found, try inversions
    for (const def of this.OFFSETS) {
      if (def.hasInversions()) {
        for (let i = 0; i < def.inversions.length; i++) {
          const inversion = def.inversions[i];
          const inversionIndices = IndexUtils.normalizeIndices(inversion);
          const rootNoteAtInversion = (IndexUtils.rootNoteAtInversion(indices, i) %
            TWELVE) as ActualIndex;
          if (IndexUtils.areIndicesEqual(inversionIndices, normalizedIndices)) {
            return new ChordMatch(rootNoteAtInversion, def, i);
          }
        }
      }
    }
    return undefined;
  }

  static calculateChordNotesFromIndex = (
    rootIndex: ActualIndex,
    chordType: NoteGroupingId,
  ): ActualIndex[] => {
    const chordOffsets = this.getOffsetsFromIdAndInversion(chordType);
    const newNotes = chordOffsets.map((offset: number) => (offset + rootIndex) as ActualIndex);
    return newNotes;
  };

  static getChordNameFromPreset = (
    rootIndex: ActualIndex,
    chordType: NoteGroupingId,
    accidental: Accidental,
  ): string => {
    const chordNotes = this.calculateChordNotesFromIndex(rootIndex, chordType);
    const chordMatch = this.getMatchFromIndices(chordNotes);
    return chordMatch ? chordMatch.deriveChordName(accidental) : "Unknown";
  };
}
