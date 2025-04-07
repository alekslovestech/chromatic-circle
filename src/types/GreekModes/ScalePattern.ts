import { AccidentalType } from "../AccidentalType";
import { addChromatic, ChromaticIndex } from "../ChromaticIndex";
import { TWELVE } from "../NoteConstants";
import { ScaleDegreeInfo } from "./ScaleDegreeInfo";
import { ixScaleDegree } from "./ScaleDegreeType";
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

  public getScaleDegreeInfoFromChromatic(
    chromaticIndex: ChromaticIndex,
    tonicIndex: ChromaticIndex,
  ): ScaleDegreeInfo | null {
    const scaleDegreePosition = this.pattern.findIndex(
      (offset) => addChromatic(tonicIndex, offset) === chromaticIndex,
    );

    return scaleDegreePosition === -1
      ? null
      : this.getScaleDegreeInfoFromPosition(scaleDegreePosition);
  }

  public getScaleDegreeInfoFromPosition(scaleDegreeIndex: number): ScaleDegreeInfo {
    const currentNote = this.pattern[scaleDegreeIndex];
    const ionianNote = GREEK_MODE_PATTERNS.IONIAN[scaleDegreeIndex];
    const accidental =
      currentNote > ionianNote
        ? AccidentalType.Sharp
        : currentNote < ionianNote
        ? AccidentalType.Flat
        : AccidentalType.None;
    return new ScaleDegreeInfo(ixScaleDegree(scaleDegreeIndex + 1), accidental);
  }

  public getRootOffset(scaleDegreeIndex: number): [number] {
    return [this.pattern[scaleDegreeIndex]];
  }

  public getOffsets135(scaleDegreeIndex: number): [number, number, number] {
    const rootOffset = this.pattern[scaleDegreeIndex];
    let thirdOffset = this.pattern[(scaleDegreeIndex + 2) % this.SCALE_LENGTH];
    let fifthOffset = this.pattern[(scaleDegreeIndex + 4) % this.SCALE_LENGTH];

    thirdOffset += thirdOffset < rootOffset ? TWELVE : 0;
    fifthOffset += fifthOffset < rootOffset ? TWELVE : 0;

    return [rootOffset, thirdOffset, fifthOffset];
  }

  public getAbsoluteScaleNotes(tonicIndex: ChromaticIndex): ChromaticIndex[] {
    return this.pattern.map((offsetIndex) => addChromatic(tonicIndex, offsetIndex));
  }

  public getLength(): number {
    return this.SCALE_LENGTH;
  }

  public getOffsetAtIndex(index: number): number {
    return this.pattern[index];
  }

  public toArray(): number[] {
    return [...this.pattern];
  }
}
