import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { getNoteTextFromActualIndex } from "../utils/NoteUtils";

import { AccidentalType } from "./AccidentalType";
import { ActualIndex, InversionIndex, ixInversion } from "./IndexTypes";
import { MusicalKey } from "./MusicalKey";
import { NoteGrouping } from "./NoteGrouping";
import { NoteGroupingLibrary } from "./NoteGroupingLibrary";
import { TWELVE } from "./NoteConstants";
import { NoteGroupingType } from "./NoteGroupingTypes";
import { ChordDisplayMode } from "./SettingModes";
export class ChordMatch {
  constructor(
    public rootNote: ActualIndex,
    public definition: NoteGrouping,
    public inversionIndex: InversionIndex = ixInversion(0),
  ) {}

  getRootNoteChordName = (displayMode: ChordDisplayMode, accidental: AccidentalType) => {
    const rootNoteName = getNoteTextFromActualIndex(this.rootNote, accidental);
    const idWithoutRoot = NoteGroupingLibrary.getId(this.definition.id, displayMode);
    const chordNameRoot = `${rootNoteName}${idWithoutRoot || ""}`;
    return chordNameRoot;
  };

  deriveChordName(displayMode: ChordDisplayMode, selectedMusicalKey: MusicalKey): string {
    const selectedAccidental = selectedMusicalKey.getDefaultAccidental();
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
        return NoteGroupingLibrary.getId(this.definition.id, displayMode);
      default:
        if (bassNoteIndex !== this.rootNote) {
          const bassNoteName = getNoteTextFromActualIndex(bassNoteIndex, selectedAccidental);
          return `${chordNameRoot}/${bassNoteName}`;
        }
        return chordNameRoot;
    }
  }
}
