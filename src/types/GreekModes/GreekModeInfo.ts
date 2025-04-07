import { AccidentalType } from "../AccidentalType";
import { CHORD_OFFSET_PATTERNS } from "../ChordOffsetPatterns";
import { addChromatic, ixChromatic } from "../ChromaticIndex";
import { ChromaticIndex } from "../ChromaticIndex";
import { TWELVE } from "../NoteConstants";
import { ChordType } from "../NoteGroupingTypes";
import { RomanChord } from "../RomanChord";
import { GREEK_MODE_PATTERNS } from "./GreekModePatterns";
import { GreekModeType } from "./GreekModeType";
import { ScaleDegreeInfo } from "./ScaleDegreeInfo";
import { ixScaleDegree } from "./ScaleDegreeType";
import { ScalePattern } from "./ScalePattern";

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

  public getScaleDegreeInfoFromChromatic(
    chromaticIndex: ChromaticIndex,
    tonicIndex: ChromaticIndex,
  ): ScaleDegreeInfo | null {
    return this.scalePattern.getScaleDegreeInfoFromChromatic(chromaticIndex, tonicIndex);
  }

  public getRomanDisplayString(scaleDegreeIndex: number): string {
    const romanChord = this.getRomanChordRoot35(scaleDegreeIndex);
    return romanChord.getString();
  }

  public getScaleDegreeInfoFromPosition(scaleDegreeIndex: number): ScaleDegreeInfo {
    return this.scalePattern.getScaleDegreeInfoFromPosition(scaleDegreeIndex);
  }

  public getRootOffset(scaleDegreeIndex: number): [number] {
    return this.scalePattern.getRootOffset(scaleDegreeIndex);
  }

  public getOffsets135(scaleDegreeIndex: number): [number, number, number] {
    return this.scalePattern.getOffsets135(scaleDegreeIndex);
  }

  //scaleDegreeIndex is the index of the scale degree in the pattern (0-6)
  private getRomanChordRoot35(scaleDegreeIndex: number): RomanChord {
    const scaleDegreeInfo = this.getScaleDegreeInfoFromPosition(scaleDegreeIndex);

    const offsets135 = this.getOffsets135(scaleDegreeIndex);

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
