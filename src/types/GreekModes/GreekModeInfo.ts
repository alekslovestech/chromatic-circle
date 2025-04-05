import { AccidentalType } from "../AccidentalType";
import { addChromatic } from "../ChromaticIndex";
import { ChromaticIndex } from "../ChromaticIndex";
import { ChordType } from "../NoteGroupingTypes";
import { RomanChord } from "../RomanChord";
import { GreekModeDictionary } from "./GreekModeDictionary";
import { GREEK_MODE_PATTERNS } from "./GreekModePatterns";
import { GreekModeType } from "./GreekModeType";
import { ScaleDegreeInfo } from "./ScaleDegreeInfo";
import { ixScaleDegree } from "./ScaleDegreeType";

export class GreekModeInfo {
  constructor(
    public readonly type: GreekModeType,
    public readonly pattern: number[], // The pattern of the mode, typically 7 notes. e.g. [0, 2, 4, 5, 7, 9, 10] for Mixolydian
    public readonly modeNumber: number, // The number of the mode, typically 1-7. e.g. 1 for Ionian, 2 for Dorian, etc.
  ) {}

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

  public getScaleDegreeDisplayStrings(): string[] {
    return this.pattern.map((_, index) =>
      this.getScaleDegreeInfoFromPosition(index).getDisplayString(),
    );
  }

  public getScaleDegreeInfoFromChromatic(
    chromaticIndex: ChromaticIndex,
    tonicIndex: ChromaticIndex,
  ): ScaleDegreeInfo | null {
    // Find which scale degree this note is
    const scaleDegreePosition = this.pattern.findIndex(
      (offset) => addChromatic(tonicIndex, offset) === chromaticIndex,
    );

    return scaleDegreePosition === -1
      ? null
      : this.getScaleDegreeInfoFromPosition(scaleDegreePosition);
  }

  public getRomanDisplayString(scaleDegreeIndex: number): string {
    const romanChord = GreekModeInfo.getRomanChordRoot35(this.type, scaleDegreeIndex);
    return romanChord.getString();
  }

  private static getRomanChordRoot35(
    greekMode: GreekModeType,
    scaleDegreeIndex: number,
  ): RomanChord {
    const greekModeInfo = GreekModeDictionary.getModeInfo(greekMode);
    const scaleDegreeInfo = greekModeInfo.getScaleDegreeInfoFromPosition(scaleDegreeIndex);

    const rootOffset = greekModeInfo.pattern[scaleDegreeIndex];
    const thirdOffset = greekModeInfo.pattern[(scaleDegreeIndex + 2) % 7];
    const fifthOffset = greekModeInfo.pattern[(scaleDegreeIndex + 4) % 7];

    const thirdInterval = (thirdOffset - rootOffset + 12) % 12;
    const fifthInterval = (fifthOffset - rootOffset + 12) % 12;

    let chordType: ChordType;
    if (thirdInterval === 4 && fifthInterval === 7) {
      chordType = ChordType.Major;
    } else if (thirdInterval === 3 && fifthInterval === 7) {
      chordType = ChordType.Minor;
    } else if (thirdInterval === 3 && fifthInterval === 6) {
      chordType = ChordType.Diminished;
      // Augmented
    } else {
      chordType = ChordType.Unknown;
    }

    const romanChord = new RomanChord(
      scaleDegreeInfo.scaleDegree,
      chordType,
      scaleDegreeInfo.accidentalPrefix,
    );
    return romanChord;
  }
}
