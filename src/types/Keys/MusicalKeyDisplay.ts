import { MusicalKey } from "./MusicalKey";
import { ChromaticIndex } from "../ChromaticIndex";
import { KeyTextMode } from "../SettingModes";
import { KeyNoteResolver } from "./KeyNoteResolver";

export class MusicalKeyDisplay {
  static getDisplayString(
    musicalKey: MusicalKey,
    chromaticIndex: ChromaticIndex,
    keyTextMode: KeyTextMode,
  ): string {
    switch (keyTextMode) {
      case KeyTextMode.NoteNames:
        const noteInfo = KeyNoteResolver.resolveAbsoluteNote(
          chromaticIndex,
          musicalKey.getDefaultAccidental(),
        );
        return noteInfo.formatNoteNameForDisplay();
      case KeyTextMode.ScaleDegree:
        const scaleDegreeInfo = musicalKey.getScaleDegreeInfoFromChromatic(chromaticIndex);
        return scaleDegreeInfo ? scaleDegreeInfo.getDisplayString() : "";
      case KeyTextMode.Roman:
        const romanScaleDegreeInfo = musicalKey.getScaleDegreeInfoFromChromatic(chromaticIndex);
        if (!romanScaleDegreeInfo) return "";
        return musicalKey.greekModeInfo.getRomanDisplayString(romanScaleDegreeInfo.scaleDegree - 1);
      default:
        return "";
    }
  }
}
