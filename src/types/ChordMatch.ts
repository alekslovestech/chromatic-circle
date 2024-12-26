import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { getNoteTextFromIndex } from "../utils/NoteUtils";
import { AccidentalType } from "./AccidentalType";
import { ChordDefinition } from "./ChordDefinition";
import { ChordDisplayMode } from "./ChordDisplayMode";
import { ActualIndex, ixInversion, InversionIndex } from "./IndexTypes";
import { TWELVE } from "./NoteConstants";
import { NoteGroupingType } from "./NoteGrouping";
import { getId } from "./NoteGroupingLibrary";

export class ChordMatch {
  constructor(
    public rootNote: ActualIndex,
    public definition: ChordDefinition,
    public inversionIndex: InversionIndex = ixInversion(0),
  ) {}

  getRootNoteChordName = (displayMode: ChordDisplayMode, accidental: AccidentalType) => {
    const rootNoteName = getNoteTextFromIndex(this.rootNote, accidental, false);
    const idWithoutRoot = getId(this.definition.id, displayMode);
    const chordNameRoot = `${rootNoteName}${idWithoutRoot || ""}`;
    return chordNameRoot;
  };

  deriveChordName(
    displayMode: ChordDisplayMode,
    selectedAccidental = AccidentalType.Sharp,
  ): string {
    const offsets = ChordAndIntervalManager.getOffsetsFromIdAndInversion(
      this.definition.id,
      this.inversionIndex,
    );
    const bassNoteIndex = ((this.rootNote + offsets[0] + TWELVE) % TWELVE) as ActualIndex;
    const chordNameRoot = this.getRootNoteChordName(displayMode, selectedAccidental);

    const noteGroupingType = this.definition.getNoteGroupingType();
    switch (noteGroupingType) {
      case NoteGroupingType.None:
        return "Ø";
      case NoteGroupingType.Note:
        return `${chordNameRoot}`;
      case NoteGroupingType.Interval:
        return getId(this.definition.id, displayMode);
      default:
        if (bassNoteIndex !== this.rootNote) {
          const bassNoteName = getNoteTextFromIndex(bassNoteIndex, selectedAccidental);
          return `${chordNameRoot}/${bassNoteName}`;
        }
        return chordNameRoot;
    }
  }
}
