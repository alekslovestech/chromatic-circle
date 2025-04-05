import { ChromaticIndex } from "../ChromaticIndex";
import { KeyTextMode } from "../SettingModes";
import { KeyNoteResolver } from "./KeyNoteResolver";
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
        const noteInfo = KeyNoteResolver.resolveAbsoluteNote(
          chromaticIndex,
          musicalKey.getDefaultAccidental(),
        );
        return noteInfo.formatNoteNameForDisplay();
      case KeyTextMode.ScaleDegree:
        return this.getScaleDegreeDisplayString(musicalKey, chromaticIndex);
      case KeyTextMode.Roman:
        return this.getRomanDisplayString(musicalKey, chromaticIndex);
    }
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
