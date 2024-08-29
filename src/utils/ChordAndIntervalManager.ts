import { Accidental } from "../types/Accidental";
import { NoteGroupingId } from "../types/ChordConstants";
import { ChordDefinition } from "../types/ChordDefinition";
import { ActualIndex } from "../types/IndexTypes";
import { TWELVE } from "../types/NoteConstants";
import { NoteGroupingName, NoteGroupingType } from "../types/NoteGrouping";
import { getNoteTextFromIndex } from "./ChromaticUtils";

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
    new ChordDefinition(NoteGroupingId.Chord_Maj, [0, 4, 7]),
    new ChordDefinition(NoteGroupingId.Chord_Min, [0, 3, 7]),
    new ChordDefinition(NoteGroupingId.Chord_Dim, [0, 3, 6]),
    new ChordDefinition(NoteGroupingId.Chord_Aug, [0, 4, 8]),

    // Seventh chords
    new ChordDefinition(NoteGroupingId.Chord_Maj7, [0, 4, 7, 11]),
    new ChordDefinition(NoteGroupingId.Chord_Min7, [0, 3, 7, 10]),
    new ChordDefinition(NoteGroupingId.Chord_Dom7, [0, 4, 7, 10]),
    new ChordDefinition(NoteGroupingId.Chord_Dim7, [0, 3, 6, 9]),
    new ChordDefinition(NoteGroupingId.Chord_MMaj7, [0, 3, 7, 11]),
    new ChordDefinition(NoteGroupingId.Chord_M7b5, [0, 3, 6, 10]),

    // Other chord types
    new ChordDefinition(NoteGroupingId.Chord_Sus4, [0, 5, 7]),
    new ChordDefinition(NoteGroupingId.Chord_Sus2, [0, 2, 7]),
    new ChordDefinition(NoteGroupingId.Chord_Add9, [0, 4, 7, 14]),
    new ChordDefinition(NoteGroupingId.Chord_Six, [0, 4, 7, 9]),
    new ChordDefinition(NoteGroupingId.Chord_Min6, [0, 3, 7, 9]),
  ];

  static getOffsetsFromName(name: string): number[] {
    const chordDefinition = this.OFFSETS.find((def) => def.id.toString() === name);
    if (chordDefinition) {
      return chordDefinition.rootChord;
    } else {
      console.warn(`No chord definition found for type: ${name}`);
      throw new Error(`Invalid chord type: ${name}`);
    }
  }

  static getAllNames(): string[] {
    return Object.values(this.OFFSETS).map((def) => def.id.toString());
  }

  static getDefinitionByName(name: string): ChordDefinition {
    const chordDefinition = this.OFFSETS.find((def) => def.id.toString() === name);
    if (chordDefinition) {
      return chordDefinition;
    } else {
      console.warn(`No chord definition found for type: ${name}`);
      throw new Error(`Invalid chord type: ${name}`);
    }
  }

  static getAllChordDefinitions(): ChordDefinition[] {
    return this.OFFSETS.filter((chordDef) => chordDef.isChord());
  }

  static getAllIntervalDefinitions(): ChordDefinition[] {
    return this.OFFSETS.filter((chordDef) => chordDef.isInterval());
  }

  private static getAllIntervalTypes(): NoteGroupingId[] {
    return Object.keys(this.OFFSETS)
      .filter((key) => key.startsWith("Interval_"))
      .map((key) => NoteGroupingId[key as keyof typeof NoteGroupingId]);
  }

  static detectChordName(
    selectedNoteIndices: ActualIndex[],
    selectedAccidental: Accidental,
  ): NoteGroupingName {
    if (selectedNoteIndices.length === 0)
      return { noteGrouping: NoteGroupingType.None, name: "No notes selected" };
    if (selectedNoteIndices.length === 1)
      return {
        noteGrouping: NoteGroupingType.Note,
        name: getNoteTextFromIndex(selectedNoteIndices[0], selectedAccidental),
      };

    const rootNote = selectedNoteIndices[0];
    const chordsAndIntervals = selectedNoteIndices.map(
      (note) => (note - rootNote + TWELVE) % TWELVE,
    );

    const isInterval = selectedNoteIndices.length === 2;
    const definitions = isInterval
      ? this.getAllIntervalDefinitions()
      : this.getAllChordDefinitions();

    for (const def of definitions) {
      if (
        chordsAndIntervals.length === def.rootChord.length &&
        chordsAndIntervals.every((interval) => def.rootChord.includes(interval))
      ) {
        const name = isInterval
          ? def.id.toString()
          : `${getNoteTextFromIndex(rootNote, selectedAccidental)} ${def.id.toString()}`;
        return {
          noteGrouping: def.getNoteGroupingType(),
          name,
        };
      }
    }

    return {
      noteGrouping: ChordDefinition.getNoteGroupingTypeWithArg(selectedNoteIndices),
      name: "Unknown",
    };
  }
}
