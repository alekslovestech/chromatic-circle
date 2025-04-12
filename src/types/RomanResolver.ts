import { MusicalKey } from "./Keys/MusicalKey";
import { ChordType } from "./NoteGroupingTypes";
import { RomanChord } from "./RomanChord";
import { AccidentalType } from "./AccidentalType";
import { splitRomanString } from "./RomanParser";
import { AbsoluteChord } from "./AbsoluteChord";
import { addChromatic } from "./ChromaticIndex";
import { NoteConverter } from "./NoteConverter";

/**
 * Resolves Roman numeral chords to absolute chords in a given musical key.
 * This class provides functionality to convert Roman numeral notation (e.g., "I", "ii7", "♭III")
 * to actual chords in the context of a specific musical key.
 */
export class RomanResolver {
  /**
   * Resolves a Roman numeral string to an absolute chord in the context of a musical key.
   *
   * @param romanString - The Roman numeral string to resolve (e.g., "I", "ii7", "♭III")
   * @param musicalKey - The musical key to resolve the chord in
   * @returns An absolute chord representing the resolved Roman numeral
   * @throws Error if the Roman numeral string is invalid
   */
  static resolveAsAbsoluteChord(romanString: string, musicalKey: MusicalKey): AbsoluteChord {
    const romanChord = RomanResolver.createRomanChordFromString(romanString);
    const scale = musicalKey.greekModeInfo.getAbsoluteScaleNotes(musicalKey.tonicIndex);

    // Get the base chromatic index from the scale
    let chromaticIndex = scale[romanChord.scaleDegreeIndex];

    // Apply any accidentals
    const accidentalOffset =
      romanChord.accidental === AccidentalType.Flat
        ? -1
        : romanChord.accidental === AccidentalType.Sharp
        ? 1
        : 0;
    chromaticIndex = addChromatic(chromaticIndex, accidentalOffset);

    return new AbsoluteChord(chromaticIndex, romanChord.chordType);
  }

  /**
   * Creates a RomanChord object from a Roman numeral string.
   *
   * @param romanString - The Roman numeral string to parse (e.g., "I", "ii7", "♭III")
   * @returns A RomanChord object representing the parsed Roman numeral
   * @throws Error if the Roman numeral string is invalid
   */
  static createRomanChordFromString(romanString: string): RomanChord {
    const parsedRoman = splitRomanString(romanString);
    const accidental: AccidentalType = NoteConverter.getAccidentalType(
      parsedRoman.accidentalPrefix,
    );

    const ordinal = RomanChord.fromRoman(parsedRoman.pureRoman);
    const isLowercase = RomanChord.isLowercaseRomanNumeral(parsedRoman.pureRoman);
    const chordType = RomanChord.determineChordType(isLowercase, parsedRoman.chordSuffix);
    const bassDegree = parsedRoman.bassRoman
      ? RomanChord.fromRoman(parsedRoman.bassRoman)
      : undefined;

    if (chordType === ChordType.Unknown) {
      throw new Error(`Invalid roman notation ${romanString}`);
    }

    return new RomanChord(ordinal, chordType, accidental, bassDegree);
  }
}
