import { CHORD_OFFSET_PATTERNS } from "../ChordOffsetPatterns";
import { addChromatic, ChromaticIndex } from "../ChromaticIndex";
import { ChordType } from "../NoteGroupingTypes";
import { RomanChord } from "../RomanChord";
import { GreekModeType } from "./GreekModeType";
import { ScalePattern } from "./ScalePattern";
import { ScaleDegreeInfo } from "./ScaleDegreeInfo";
import { ScaleDegreeIndex } from "./ScaleDegreeType";
import { ixScaleDegreeIndex } from "./ScaleDegreeType";
import { IScalePatternForRomanChords } from "../IScalePatternForRomanChords";
import { KeyDisplayMode } from "../SettingModes";

export class GreekModeInfo implements IScalePatternForRomanChords {
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
    const scaleDegreePosition: ScaleDegreeIndex =
      this.scalePattern.findPositionInScale(relativeOffset);

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

  public getDisplayStrings(keyTextMode: KeyDisplayMode): string[] {
    return Array.from({ length: this.scalePattern.getLength() }, (_, i) => {
      const scaleDegreeInfo = this.scalePattern.getScaleDegreeInfoFromPosition(
        ixScaleDegreeIndex(i),
      );
      return this.getDisplayString(scaleDegreeInfo, keyTextMode);
    });
  }

  public getIonianTonicIndex(tonicIndex: ChromaticIndex): ChromaticIndex {
    const offset = this.modeNumber - 1;

    const scaleLength = this.scalePattern.getLength();
    const ionianOffset = this.scalePattern.getOffsetAtIndex(
      ixScaleDegreeIndex((scaleLength - offset) % scaleLength),
    );

    // Apply the offset to the tonic to get the Ionian tonic
    return addChromatic(tonicIndex, ionianOffset);
  }

  public isDiatonicNote(chromaticIndex: ChromaticIndex, tonicIndex: ChromaticIndex): boolean {
    const scaleNotes = this.getAbsoluteScaleNotes(tonicIndex);
    return scaleNotes.includes(chromaticIndex);
  }

  public getDisplayString(scaleDegreeInfo: ScaleDegreeInfo, keyTextMode: KeyDisplayMode): string {
    if (keyTextMode === KeyDisplayMode.ScaleDegree) {
      return scaleDegreeInfo.getDisplayString();
    }
    if (keyTextMode === KeyDisplayMode.Roman) {
      const romanChord = RomanChord.fromScaleDegreeInfo(scaleDegreeInfo, this);
      return romanChord.getString();
    }
    throw new Error("Unexpected key text mode");
  }

  //scaleDegreeIndex is the index of the scale degree in the pattern (0-6)
  public determineChordType(offsetsFromRoot: number[]): ChordType {
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

    return (matchingPattern?.[0] as ChordType) || ChordType.Unknown;
  }

  public getTriadOffsets(scaleDegreeInfo: ScaleDegreeInfo): number[] {
    const scaleDegreeIndex = scaleDegreeInfo.scaleDegreeIndex;
    const offsets135 = this.scalePattern.getOffsets135(scaleDegreeIndex);
    return offsets135.map((offset) => offset - offsets135[0]);
  }
}
