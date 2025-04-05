import { ChromaticIndex } from "../ChromaticIndex";
import { NoteConverter } from "../NoteConverter";
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
        return this.getNoteNameDisplayString(musicalKey, chromaticIndex);
      case KeyTextMode.ScaleDegree:
        return this.getScaleDegreeDisplayString(musicalKey, chromaticIndex);
      case KeyTextMode.Roman:
        return this.getRomanDisplayString(musicalKey, chromaticIndex);
    }
  }

  private static getNoteNameDisplayString(
    musicalKey: MusicalKey,
    chromaticIndex: ChromaticIndex,
  ): string {
    const accidentalPreference = musicalKey.getDefaultAccidental();
    const noteAtIndex = NoteConverter.getBasicNoteInfo(chromaticIndex, accidentalPreference);
    return noteAtIndex.formatNoteNameForDisplay();
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
