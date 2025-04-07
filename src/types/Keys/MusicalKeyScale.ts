import { addChromatic, ChromaticIndex } from "../ChromaticIndex";
import { ScaleDegreeInfo } from "../GreekModes/ScaleDegreeInfo";
import { MusicalKey } from "./MusicalKey";

export class MusicalKeyScale {
  static getScaleDegreeInfo(
    musicalKey: MusicalKey,
    chromaticIndex: ChromaticIndex,
  ): ScaleDegreeInfo | null {
    return musicalKey.getScaleDegreeInfoFromChromatic(chromaticIndex);
  }

  static getAbsoluteScaleNotes(musicalKey: MusicalKey): ChromaticIndex[] {
    return musicalKey.greekModeInfo.scalePattern.getAbsoluteScaleNotes(musicalKey.tonicIndex);
  }

  static isDiatonicNote(musicalKey: MusicalKey, chromaticIndex: ChromaticIndex): boolean {
    const indexArray = this.getAbsoluteScaleNotes(musicalKey);
    return indexArray.includes(chromaticIndex);
  }
}
