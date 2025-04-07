import { ChromaticIndex } from "../ChromaticIndex";
import { MusicalKey } from "./MusicalKey";

export class MusicalKeyScale {
  static isDiatonicNote(musicalKey: MusicalKey, chromaticIndex: ChromaticIndex): boolean {
    const indexArray = musicalKey.greekModeInfo.getAbsoluteScaleNotes(musicalKey.tonicIndex);
    return indexArray.includes(chromaticIndex);
  }
}
