import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { getNoteTextFromIndex } from "../utils/NoteUtils";
import { Accidental } from "./Accidental";
import { ChordDefinition } from "./ChordDefinition";
import { ChordDisplayMode } from "./ChordDisplayMode";
import { ActualIndex, ixInversion, InversionIndex } from "./IndexTypes";
import { TWELVE } from "./NoteConstants";
import { getId } from "./NoteGrouping";

export class ChordMatch {
  rootNote: ActualIndex;
  definition: ChordDefinition;
  inversionIndex: InversionIndex; //0 is the first inversion (add 1 for display index)

  constructor(rootNote: ActualIndex, definition: ChordDefinition, inversionIndex: number = 0) {
    this.rootNote = rootNote;
    this.definition = definition;
    this.inversionIndex = ixInversion(inversionIndex);
  }

  getRootNoteChordName = (displayMode: ChordDisplayMode, accidental: Accidental) => {
    const rootNoteName = getNoteTextFromIndex(this.rootNote, accidental, false);
    const idWithoutRoot = getId(this.definition.id, displayMode);
    const chordNameRoot = `${rootNoteName}${idWithoutRoot || ""}`;
    return chordNameRoot;
  };

  deriveChordName(
    displayMode: ChordDisplayMode,
    selectedAccidental: Accidental = Accidental.Sharp,
  ): string {
    const offsets = ChordAndIntervalManager.getOffsetsFromIdAndInversion(
      this.definition.id,
      this.inversionIndex,
    );
    const bassNoteIndex = ((this.rootNote + offsets[0] + TWELVE) % TWELVE) as ActualIndex;
    const chordNameRoot = this.getRootNoteChordName(displayMode, selectedAccidental);
    if (offsets.length === 0) return "Ø";

    if (offsets.length === 1) return `${chordNameRoot}`;

    if (bassNoteIndex !== this.rootNote) {
      const bassNoteName = getNoteTextFromIndex(bassNoteIndex, selectedAccidental);
      return `${chordNameRoot}/${bassNoteName}`;
    }
    return chordNameRoot;
  }
}
