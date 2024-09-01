import { Accidental } from "../types/Accidental";
import { NoteGroupingId } from "../types/NoteGrouping";
import { ChordDefinition } from "../types/ChordDefinition";
import { ActualIndex } from "../types/IndexTypes";
import { TWELVE } from "../types/NoteConstants";
import { NoteGroupingName, NoteGroupingType } from "../types/NoteGrouping";
import { IndexUtils } from "./IndexUtils";
import { ChordMatch } from "../types/ChordMatch";
import { computeChordName, getNoteTextFromIndex } from "./NoteNameUtils";

export class ChordAndIntervalManager {
  private static readonly OFFSETS: ChordDefinition[] = [
    new ChordDefinition(NoteGroupingId.Note, [0]),
    new ChordDefinition(NoteGroupingId.Interval_Min2, [0, 1]),
    new ChordDefinition(NoteGroupingId.Interval_Maj2, [0, 2]),
    new ChordDefinition(NoteGroupingId.Interval_Min3, [0, 3]),
    new ChordDefinition(NoteGroupingId.Interval_Maj3, [0, 4]),
    new ChordDefinition(NoteGroupingId.Interval_Fourth, [0, 5]),
    new ChordDefinition(NoteGroupingId.Interval_Tritone, [0, 6]),
    new ChordDefinition(NoteGroupingId.Interval_Fifth, [0, 7]),
    new ChordDefinition(NoteGroupingId.Interval_Min6, [0, 8]),
    new ChordDefinition(NoteGroupingId.Interval_Maj6, [0, 9]),
    new ChordDefinition(NoteGroupingId.Interval_Min7, [0, 10]),
    new ChordDefinition(NoteGroupingId.Interval_Maj7, [0, 11]),
    new ChordDefinition(NoteGroupingId.Interval_Oct, [0, 12]),

    // Triads
    new ChordDefinition(NoteGroupingId.Chord_Maj, [0, 4, 7], true),
    new ChordDefinition(NoteGroupingId.Chord_Min, [0, 3, 7], true),
    new ChordDefinition(NoteGroupingId.Chord_Dim, [0, 3, 6]),
    new ChordDefinition(NoteGroupingId.Chord_Aug, [0, 4, 8]),

    // Seventh chords
    new ChordDefinition(NoteGroupingId.Chord_Maj7, [0, 4, 7, 11], true),
    new ChordDefinition(NoteGroupingId.Chord_Min7, [0, 3, 7, 10], true),
    new ChordDefinition(NoteGroupingId.Chord_Dom7, [0, 4, 7, 10], true),
    new ChordDefinition(NoteGroupingId.Chord_MMaj7, [0, 3, 7, 11], true),
    new ChordDefinition(NoteGroupingId.Chord_M7b5, [0, 3, 6, 10], true),
    new ChordDefinition(NoteGroupingId.Chord_Dim7, [0, 3, 6, 9]),

    // Other chord types
    new ChordDefinition(NoteGroupingId.Chord_Sus4, [0, 5, 7]),
    new ChordDefinition(NoteGroupingId.Chord_Sus2, [0, 2, 7]),
    new ChordDefinition(NoteGroupingId.Chord_Add9, [0, 4, 7, 14]),
    new ChordDefinition(NoteGroupingId.Chord_Six, [0, 4, 7, 9]),
    new ChordDefinition(NoteGroupingId.Chord_Min6, [0, 3, 7, 9]),
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
    return isInterval ? this.getAllIntervalDefinitions() : this.getAllChordDefinitions();
  };

  static detectChordName(
    selectedNoteIndices: ActualIndex[],
    selectedAccidental: Accidental,
  ): NoteGroupingName {
    return this.getChordName(selectedNoteIndices, selectedAccidental);
  }

  static getChordName(
    selectedNoteIndices: ActualIndex[],
    selectedAccidental: Accidental,
  ): NoteGroupingName {
    if (selectedNoteIndices.length === 0) {
      return { noteGrouping: NoteGroupingType.None, name: "No notes selected" };
    }
    if (selectedNoteIndices.length === 1) {
      return {
        noteGrouping: NoteGroupingType.Note,
        name: getNoteTextFromIndex(selectedNoteIndices[0], selectedAccidental),
      };
    }

    const normalizedIndices = IndexUtils.normalizeIndices(selectedNoteIndices);
    let chordMatch =
      this.getDefinitionFromOffsets(normalizedIndices) ||
      this.getDefinitionWithInversion(normalizedIndices);

    if (chordMatch) {
      const rootNoteIndex = IndexUtils.rootNoteAtInversion(
        selectedNoteIndices,
        chordMatch.inversionIndex,
      );
      const bassNoteIndex = selectedNoteIndices[0];
      const chordName = computeChordName(
        chordMatch.definition.id,
        rootNoteIndex,
        bassNoteIndex,
        selectedAccidental,
      );

      return {
        noteGrouping: chordMatch.definition.getNoteGroupingType(),
        name: chordName,
      };
    }

    return {
      noteGrouping: ChordDefinition.getNoteGroupingTypeWithArg(selectedNoteIndices),
      name: "Unknown",
    };
  }

  private static getAllChordDefinitions(): ChordDefinition[] {
    return this.OFFSETS.filter((chordDef) => chordDef.isChord());
  }

  private static getAllIntervalDefinitions(): ChordDefinition[] {
    return this.OFFSETS.filter((chordDef) => chordDef.isInterval());
  }

  //find the definition that matches the offsets
  private static getDefinitionFromOffsets(offsets: number[]): ChordMatch | undefined {
    const indexOffsets = offsets.map((index) => (index + TWELVE) % TWELVE);
    const def = this.OFFSETS.find((def) => IndexUtils.areIndicesEqual(indexOffsets, def.rootChord));
    return def ? { definition: def, inversionIndex: undefined } : undefined;
  }

  private static getDefinitionWithInversion(normalizedIndices: number[]): ChordMatch | undefined {
    for (const def of this.OFFSETS) {
      if (def.hasInversions()) {
        for (let i = 0; i < def.inversions.length; i++) {
          const inversion = def.inversions[i];
          const inversionIndices = IndexUtils.normalizeIndices(inversion);
          if (IndexUtils.areIndicesEqual(inversionIndices, normalizedIndices)) {
            return {
              definition: def,
              inversionIndex: i,
            };
          }
        }
      }
    }
    return undefined;
  }
}
