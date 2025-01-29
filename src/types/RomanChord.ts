import { getNoteTextFromIndex, noteTextToIndex } from "../utils/NoteUtils";
import { RomanNumeralUtils } from "../utils/RomanNumeralUtils";
import { AccidentalType, getAccidentalSignForDisplay } from "./AccidentalType";
import { ChromaticIndex, chromaticToActual, ixOctaveOffset } from "./IndexTypes";
import { ChordType } from "./NoteGroupingTypes";

export class RomanChord {
  scaleDegree: number;
  chordType: ChordType;
  accidental: AccidentalType;
  bassDegree: number | undefined;
  constructor(
    scaleDegree: number,
    chordType: ChordType,
    accidental: AccidentalType = AccidentalType.None,
    bassDegree: number | undefined = undefined,
  ) {
    this.scaleDegree = scaleDegree;
    this.chordType = chordType;
    this.accidental = accidental;
    this.bassDegree = bassDegree;
  }

  getString(): string {
    const accidentalString = getAccidentalSignForDisplay(this.accidental);
    const romanNumeralString = RomanNumeralUtils.getScaleDegreeAsRomanString(
      this.scaleDegree,
      true,
    );
    return `${accidentalString}${romanNumeralString} (${this.chordType})`;
  }
}

export class AbsoluteChord {
  chromaticIndex: ChromaticIndex;
  chordType: ChordType;

  constructor(note: string | ChromaticIndex, quality: ChordType) {
    this.chromaticIndex = typeof note === "string" ? noteTextToIndex(note) : note;
    this.chordType = quality;
  }

  getString(): string {
    const noteName = getNoteTextFromIndex(
      chromaticToActual(this.chromaticIndex, ixOctaveOffset(0)),
      AccidentalType.Sharp,
    );
    return `${noteName} (${this.chordType})`;
  }
}
