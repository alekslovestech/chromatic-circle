import { getNoteTextFromIndex } from "../utils/NoteUtils";
import { AccidentalType } from "./AccidentalType";
import {
  ChromaticIndex,
  chromaticToActual,
  getOrdinal,
  isLowercaseRomanNumeral,
  ixOctaveOffset,
  RomanNumeralString,
} from "./IndexTypes";

// Represents a Roman numeral in a progression
export enum ChordQuality {
  Major = "major",
  Minor = "minor",
  Diminished = "diminished",
  Augmented = "augmented",
  Seventh = "7",
  Major_Seventh = "maj7",
}

export type OrdinalChordQuality = {
  ordinal: number;
  quality: ChordQuality;
};

export class ChromaticChordQuality {
  chromaticIndex: ChromaticIndex;
  quality: ChordQuality;
  constructor(chromaticIndex: ChromaticIndex, quality: ChordQuality) {
    this.chromaticIndex = chromaticIndex;
    this.quality = quality;
  }

  getString(): string {
    const noteName = getNoteTextFromIndex(
      chromaticToActual(this.chromaticIndex, ixOctaveOffset(0)),
      AccidentalType.Sharp,
    );
    return `${noteName} (${this.quality})`;
  }
}

export class RomanNumeral {
  numeral: RomanNumeralString;

  constructor(numeral: RomanNumeralString) {
    this.numeral = numeral;
  }

  getOrdinalChordQuality(): OrdinalChordQuality {
    return {
      ordinal: getOrdinal(this.numeral),
      quality: isLowercaseRomanNumeral(this.numeral) ? ChordQuality.Minor : ChordQuality.Major,
    };
  }
}
