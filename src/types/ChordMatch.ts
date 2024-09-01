import { getNoteTextFromIndex, SimplifyMinMaj } from "../utils/NoteNameUtils";
import { Accidental } from "./Accidental";
import { ChordDefinition } from "./ChordDefinition";
import { ActualIndex } from "./IndexTypes";

export class ChordMatch {
  rootNote: ActualIndex;
  definition: ChordDefinition;
  inversionIndex?: number; //0 is the first inversion (add 1 for display index)

  constructor(rootNote: ActualIndex, definition: ChordDefinition, inversionIndex?: number) {
    this.rootNote = rootNote;
    this.definition = definition;
    this.inversionIndex = inversionIndex;
  }

  deriveChordName(
    selectedNoteIndices: ActualIndex[],
    selectedAccidental: Accidental = Accidental.Sharp,
  ): string {
    const bassNoteIndex = selectedNoteIndices[0];
    const rootNoteName = getNoteTextFromIndex(this.rootNote, selectedAccidental);
    const chordNameRoot = `${rootNoteName}${SimplifyMinMaj(this.definition.id)}`;
    if (bassNoteIndex !== this.rootNote) {
      const bassNoteName = getNoteTextFromIndex(bassNoteIndex, selectedAccidental);
      return `${chordNameRoot}/${bassNoteName}`;
    }
    return chordNameRoot;
  }
}
