import { getNoteTextFromIndex } from "../utils/NoteNameUtils";
import { Accidental } from "./Accidental";
import { ChordDefinition } from "./ChordDefinition";
import { ActualIndex } from "./IndexTypes";
import { NoteGroupingId } from "./NoteGrouping";

export class ChordMatch {
  rootNote: ActualIndex;
  definition: ChordDefinition;
  inversionIndex?: number; //0 is the first inversion (add 1 for display index)

  constructor(rootNote: ActualIndex, definition: ChordDefinition, inversionIndex?: number) {
    this.rootNote = rootNote;
    this.definition = definition;
    this.inversionIndex = inversionIndex;
  }

  private SimplifyMinMaj(groupingId: NoteGroupingId): string {
    if (groupingId === NoteGroupingId.Chord_Maj) {
      return "";
    } else if (groupingId === NoteGroupingId.Chord_Min) {
      return "m";
    } else if (groupingId === NoteGroupingId.Note) {
      return "(note)";
    }
    return groupingId.toString();
  }

  deriveChordName(
    selectedNoteIndices: ActualIndex[],
    selectedAccidental: Accidental = Accidental.Sharp,
  ): string {
    const bassNoteIndex = selectedNoteIndices[0];
    const rootNoteName = getNoteTextFromIndex(this.rootNote, selectedAccidental);
    const chordNameRoot = `${rootNoteName}${this.SimplifyMinMaj(this.definition.id)}`;
    if (selectedNoteIndices.length === 0) {
      return "Ø";
    }
    if (selectedNoteIndices.length === 1) {
      return `${chordNameRoot}`;
    }
    if (bassNoteIndex !== this.rootNote) {
      const bassNoteName = getNoteTextFromIndex(bassNoteIndex, selectedAccidental);
      return `${chordNameRoot}/${bassNoteName}`;
    }
    return chordNameRoot;
  }
}
