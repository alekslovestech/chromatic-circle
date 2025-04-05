import { addChromatic, ChromaticIndex } from "../ChromaticIndex";
import { ScaleDegreeInfo } from "../GreekModes/ScaleDegreeInfo";
import { MusicalKey } from "./MusicalKey";

export class MusicalKeyScale {
  static getScaleDegreeInfo(
    musicalKey: MusicalKey,
    chromaticIndex: ChromaticIndex,
  ): ScaleDegreeInfo | null {
    const scaleDegreeInfo = musicalKey.greekModeInfo.getScaleDegreeInfoFromChromatic(
      chromaticIndex,
      musicalKey.tonicIndex,
    );
    return scaleDegreeInfo;
  }

  static getAbsoluteScaleNotes(musicalKey: MusicalKey): ChromaticIndex[] {
    const tonicIndex = musicalKey.tonicIndex;
    const offsetScale = musicalKey.greekModeInfo.pattern;
    return offsetScale.map((offsetIndex) => addChromatic(tonicIndex, offsetIndex));
  }

  static isDiatonicNote(musicalKey: MusicalKey, chromaticIndex: ChromaticIndex): boolean {
    const indexArray = this.getAbsoluteScaleNotes(musicalKey);
    return indexArray.includes(chromaticIndex);
  }
}
