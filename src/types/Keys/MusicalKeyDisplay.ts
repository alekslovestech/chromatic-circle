import { ChromaticIndex } from "../ChromaticIndex";
import { NoteConverter } from "../NoteConverter";
import { NoteInfo } from "../NoteInfo";
import { KeyTextMode } from "../SettingModes";
import { MusicalKey } from "./MusicalKey";
import { MusicalKeyScale } from "./MusicalKeyScale";

export class MusicalKeyDisplay {
  static getDisplayString(
    musicalKey: MusicalKey,
    chromaticIndex: ChromaticIndex,
    displayMode: KeyTextMode,
  ): string {
    switch (displayMode) {
      case KeyTextMode.NoteNames:
        const noteInfo = this.resolveNoteInKey(musicalKey, chromaticIndex);
        return noteInfo.formatNoteNameForDisplay();
      case KeyTextMode.ScaleDegree:
        return this.getScaleDegreeDisplayString(musicalKey, chromaticIndex);
      case KeyTextMode.Roman:
        return this.getRomanDisplayString(musicalKey, chromaticIndex);
    }
  }

  static resolveNoteInKey(musicalKey: MusicalKey, chromaticIndex: ChromaticIndex): NoteInfo {
    const defaultAccidental = musicalKey.getDefaultAccidental();
    const noteAtIndex = NoteConverter.getBasicNoteInfo(chromaticIndex, defaultAccidental);
    return new NoteInfo(
      noteAtIndex.noteName,
      musicalKey.keySignature.applyToNote(noteAtIndex.noteName, noteAtIndex.accidental),
    );
  }

  private static getScaleDegreeDisplayString(
    musicalKey: MusicalKey,
    chromaticIndex: ChromaticIndex,
  ): string {
    const scaleDegreeInfo = MusicalKeyScale.getScaleDegreeInfo(musicalKey, chromaticIndex);
    return scaleDegreeInfo ? scaleDegreeInfo.getDisplayString() : "";
  }

  private static getRomanDisplayString(
    musicalKey: MusicalKey,
    chromaticIndex: ChromaticIndex,
  ): string {
    const scaleDegreeInfo = MusicalKeyScale.getScaleDegreeInfo(musicalKey, chromaticIndex);
    if (!scaleDegreeInfo) {
      return "";
    }
    const romanChordDisplayString = musicalKey.greekModeInfo.getRomanDisplayString(
      scaleDegreeInfo.scaleDegree - 1,
    );
    return romanChordDisplayString;
  }
}
