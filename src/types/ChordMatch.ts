import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { getNoteTextFromIndex } from "../utils/NoteNameUtils";
import { Accidental } from "./Accidental";
import { ChordDefinition } from "./ChordDefinition";
import { ActualIndex, ixInversion, InversionIndex } from "./IndexTypes";
import { TWELVE } from "./NoteConstants";
import { NoteGroupingId } from "./NoteGrouping";

export class ChordMatch {
  rootNote: ActualIndex;
  definition: ChordDefinition;
  inversionIndex: InversionIndex; //0 is the first inversion (add 1 for display index)

  constructor(rootNote: ActualIndex, definition: ChordDefinition, inversionIndex: number = 0) {
    this.rootNote = rootNote;
    this.definition = definition;
    this.inversionIndex = ixInversion(inversionIndex);
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

  deriveChordName(selectedAccidental: Accidental = Accidental.Sharp): string {
    const offsets = ChordAndIntervalManager.getOffsetsFromIdAndInversion(
      this.definition.id,
      this.inversionIndex,
    );
    const bassNoteIndex = ((this.rootNote + offsets[0] + TWELVE) % TWELVE) as ActualIndex;
    const rootNoteName = getNoteTextFromIndex(this.rootNote, selectedAccidental);
    const chordNameRoot = `${rootNoteName}${this.SimplifyMinMaj(this.definition.id)}`;
    if (offsets.length === 0) return "Ø";

    if (offsets.length === 1) return `${chordNameRoot}`;

    if (bassNoteIndex !== this.rootNote) {
      const bassNoteName = getNoteTextFromIndex(bassNoteIndex, selectedAccidental);
      return `${chordNameRoot}/${bassNoteName}`;
    }
    return chordNameRoot;
  }
}
