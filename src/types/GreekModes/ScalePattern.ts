import { AccidentalType } from "../AccidentalType";
import { addChromatic, ChromaticIndex } from "../ChromaticIndex";
import { TWELVE } from "../NoteConstants";
import { ScaleDegreeInfo } from "./ScaleDegreeInfo";
import { ixScaleDegreeIndex, ScaleDegreeIndex } from "./ScaleDegreeType";
import { GREEK_MODE_PATTERNS } from "./GreekModePatterns";

export class ScalePattern {
  private readonly pattern: number[];
  private readonly SCALE_LENGTH = 7;

  constructor(pattern: number[]) {
    if (pattern.length !== this.SCALE_LENGTH) {
      throw new Error(`Scale pattern must have exactly ${this.SCALE_LENGTH} notes`);
    }
    this.pattern = [...pattern];
  }

  public getScaleDegreeInfoFromPosition(scaleDegreeIndex: ScaleDegreeIndex): ScaleDegreeInfo {
    const currentNote = this.pattern[scaleDegreeIndex];
    const ionianNote = GREEK_MODE_PATTERNS.IONIAN[scaleDegreeIndex];
    const accidental =
      currentNote > ionianNote
        ? AccidentalType.Sharp
        : currentNote < ionianNote
        ? AccidentalType.Flat
        : AccidentalType.None;
    return ScaleDegreeInfo.fromScaleDegreeIndex(scaleDegreeIndex, accidental);
  }

  public getRootOffset(scaleDegreeIndex: ScaleDegreeIndex): [number] {
    return [this.pattern[scaleDegreeIndex]];
  }

  public getOffsets135(scaleDegreeIndex: ScaleDegreeIndex): [number, number, number] {
    const rootOffset = this.pattern[scaleDegreeIndex];
    let thirdOffset = this.pattern[(scaleDegreeIndex + 2) % this.SCALE_LENGTH];
    let fifthOffset = this.pattern[(scaleDegreeIndex + 4) % this.SCALE_LENGTH];

    thirdOffset += thirdOffset < rootOffset ? TWELVE : 0;
    fifthOffset += fifthOffset < rootOffset ? TWELVE : 0;

    return [rootOffset, thirdOffset, fifthOffset];
  }

  public getOffsets1357(scaleDegreeIndex: ScaleDegreeIndex): [number, number, number, number] {
    const [rootOffset, thirdOffset, fifthOffset] = this.getOffsets135(scaleDegreeIndex);
    let seventhOffset = this.pattern[(scaleDegreeIndex + 6) % this.SCALE_LENGTH];
    seventhOffset += seventhOffset < rootOffset ? TWELVE : 0;
    return [rootOffset, thirdOffset, fifthOffset, seventhOffset];
  }

  public getLength(): number {
    return this.SCALE_LENGTH;
  }

  public getOffsetAtIndex(index: ScaleDegreeIndex): number {
    return this.pattern[index];
  }

  /**
   * Finds the position of a note in the scale based on its relative offset from the tonic.
   * @param relativeOffset The offset from the tonic (0-11)
   * @returns The position in the scale (0-6), or -1 if not found
   */
  public findPositionInScale(relativeOffset: number): ScaleDegreeIndex {
    // Normalize the offset to be within 0-11
    const normalizedOffset = ((relativeOffset % 12) + 12) % 12;
    return ixScaleDegreeIndex(this.pattern.findIndex((offset) => offset === normalizedOffset));
  }

  /**
   * Adds a base value to each offset in the pattern using addChromatic.
   * This is useful for converting relative offsets to absolute chromatic indices.
   * @param baseValue The base value to add to each offset
   * @returns An array of chromatic indices
   */
  public addOffsetsChromatic(chromaticIndex: ChromaticIndex): ChromaticIndex[] {
    return this.pattern.map((element) => addChromatic(chromaticIndex, element));
  }

  /**
   * Adds a base value to each offset in the pattern using simple addition.
   * This is useful for mathematical operations on the pattern.
   * @param baseValue The base value to add to each offset
   * @returns An array of numbers
   */
  public addOffsetsSimple(baseValue: number): number[] {
    return this.pattern.map((element) => element + baseValue);
  }
}
