import { CHORD_OFFSET_PATTERNS } from "../ChordOffsetPatterns";
import { addChromatic, ChromaticIndex } from "../ChromaticIndex";
import { ChordType } from "../NoteGroupingTypes";
import { RomanChord } from "../RomanChord";
import { GreekModeType } from "./GreekModeType";
import { ScalePattern } from "./ScalePattern";
import { ScaleDegreeInfo } from "./ScaleDegreeInfo";

export class GreekModeInfo {
  /**
   * The scale pattern for this mode.
   * For most use cases, you can access this directly to use ScalePattern methods.
   * For common operations, consider using the domain-specific methods provided by GreekModeInfo.
   */
  public readonly scalePattern: ScalePattern;

  constructor(
    public readonly type: GreekModeType,
    pattern: number[], // The pattern of the mode, typically 7 notes. e.g. [0, 2, 4, 5, 7, 9, 10] for Mixolydian
    public readonly modeNumber: number, // The number of the mode, typically 1-7. e.g. 1 for Ionian, 2 for Dorian, etc.
  ) {
    this.scalePattern = new ScalePattern(pattern);
  }

  /**
   * Gets the scale degree info for a chromatic note in this mode with the given tonic.
   * @param chromaticIndex The chromatic index of the note
   * @param tonicIndex The chromatic index of the tonic
   * @returns The scale degree info, or null if the note is not in the scale
   */
  public getScaleDegreeInfoFromChromatic(
    chromaticIndex: ChromaticIndex,
    tonicIndex: ChromaticIndex,
  ): ScaleDegreeInfo | null {
    const relativeOffset = (chromaticIndex - tonicIndex + 12) % 12; // Normalize to 0-11
    const scaleDegreePosition = this.scalePattern.findPositionInScale(relativeOffset);

    return scaleDegreePosition === -1
      ? null
      : this.scalePattern.getScaleDegreeInfoFromPosition(scaleDegreePosition);
  }

  /**
   * Gets the absolute scale notes for this mode with the given tonic.
   * @param tonicIndex The chromatic index of the tonic
   * @returns An array of chromatic indices representing the scale notes
   */
  public getAbsoluteScaleNotes(tonicIndex: ChromaticIndex): ChromaticIndex[] {
    return this.scalePattern.addOffsetsChromatic(tonicIndex);
  }

  /**
   * Gets the display strings for all scale degrees in this mode.
   * This is useful for testing and display purposes.
   * @returns An array of scale degree display strings (e.g., ["1", "2", "♭3", "4", "5", "6", "♭7"])
   */
  public getScaleDegreeDisplayStrings(): string[] {
    return Array.from({ length: this.scalePattern.getLength() }, (_, i) => {
      const scaleDegreeInfo = this.scalePattern.getScaleDegreeInfoFromPosition(i);
      return scaleDegreeInfo.getDisplayString();
    });
  }

  public getIonianTonicIndex(tonicIndex: ChromaticIndex): ChromaticIndex {
    const offset = this.modeNumber - 1;

    const scaleLength = this.scalePattern.getLength();
    const ionianOffset = this.scalePattern.getOffsetAtIndex((scaleLength - offset) % scaleLength);

    // Apply the offset to the tonic to get the Ionian tonic
    return addChromatic(tonicIndex, ionianOffset);
  }

  /**
   * Determines if a note is diatonic in this mode with the given tonic.
   * @param chromaticIndex The chromatic index of the note
   * @param tonicIndex The chromatic index of the tonic
   * @returns True if the note is diatonic in this mode, false otherwise
   */
  public isDiatonicNote(chromaticIndex: ChromaticIndex, tonicIndex: ChromaticIndex): boolean {
    const scaleNotes = this.getAbsoluteScaleNotes(tonicIndex);
    return scaleNotes.includes(chromaticIndex);
  }

  public getRomanDisplayString(scaleDegreeIndex: number): string {
    const romanChord = this.getRomanChordRoot35(scaleDegreeIndex);
    return romanChord.getString();
  }

  //scaleDegreeIndex is the index of the scale degree in the pattern (0-6)
  private getRomanChordRoot35(scaleDegreeIndex: number): RomanChord {
    const scaleDegreeInfo = this.scalePattern.getScaleDegreeInfoFromPosition(scaleDegreeIndex);

    const offsets135 = this.scalePattern.getOffsets135(scaleDegreeIndex);

    const offsetsFromRoot = offsets135.map((offset) => offset - offsets135[0]);

    let chordType: ChordType;
    const patterns = {
      [ChordType.Major]: CHORD_OFFSET_PATTERNS.MAJOR,
      [ChordType.Minor]: CHORD_OFFSET_PATTERNS.MINOR,
      [ChordType.Diminished]: CHORD_OFFSET_PATTERNS.DIMINISHED,
      [ChordType.Augmented]: CHORD_OFFSET_PATTERNS.AUGMENTED,
    };

    // Find matching chord pattern
    const matchingPattern = Object.entries(patterns).find(([_, pattern]) => {
      return offsetsFromRoot.every((offset, index) => offset === pattern[index]);
    });

    chordType = (matchingPattern?.[0] as ChordType) || ChordType.Unknown;

    const romanChord = new RomanChord(
      scaleDegreeInfo.scaleDegree,
      chordType,
      scaleDegreeInfo.accidentalPrefix,
    );
    return romanChord;
  }
}
