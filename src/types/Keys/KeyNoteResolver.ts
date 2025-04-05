import { AccidentalType } from "../AccidentalType";
import { ChromaticIndex } from "../ChromaticIndex";
import { NOTES_WITH_SHARP, NOTES_WITH_FLAT } from "../NoteConstants";
import { NoteInfo } from "../NoteInfo";
import { MusicalKey } from "./MusicalKey";

export class KeyNoteResolver {
  static resolveNoteInKey(musicalKey: MusicalKey, chromaticIndex: ChromaticIndex): NoteInfo {
    const defaultAccidental = musicalKey.getDefaultAccidental();
    const absoluteNote = this.resolveAbsoluteNote(chromaticIndex, defaultAccidental);
    return new NoteInfo(
      absoluteNote.noteName,
      musicalKey.keySignature.applyToNote(absoluteNote.noteName, absoluteNote.accidental),
    );
  }

  static resolveAbsoluteNote(
    chromaticIndex: ChromaticIndex,
    accidentalPreference: AccidentalType,
  ): NoteInfo {
    const notesArray = this.getNotesArray(accidentalPreference);
    return notesArray[chromaticIndex];
  }

  private static getNotesArray = (preference: AccidentalType): NoteInfo[] =>
    preference === AccidentalType.Flat ? NOTES_WITH_FLAT : NOTES_WITH_SHARP;
}
