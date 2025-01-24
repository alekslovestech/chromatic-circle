import { ChromaticIndex, getOrdinal } from "./IndexTypes";
import { MusicalKey } from "./MusicalKey";
import { ChromaticChordQuality, RomanNumeral } from "./RomanNumeral";

export class RomanResolver {
  static resolveAsNote(roman: RomanNumeral, key: MusicalKey): ChromaticIndex {
    const scale = key.generateIndexArray();
    const index = (getOrdinal(roman.numeral) - 1) % scale.length;
    return scale[index];
  }

  static resolveAsChord(roman: RomanNumeral, key: MusicalKey): ChromaticChordQuality {
    const chromaticIndex = RomanResolver.resolveAsNote(roman, key);
    return new ChromaticChordQuality(chromaticIndex, roman.getOrdinalChordQuality().quality);
  }
}
