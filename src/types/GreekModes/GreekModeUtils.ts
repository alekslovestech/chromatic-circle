import { getNoteTextFromChromaticIndex } from "../../utils/NoteNameUtils";
import { AccidentalType } from "../AccidentalType";
import { addChromatic, ChromaticIndex, noteTextToIndex } from "../ChromaticIndex";
import { MAJOR_KEY_SIGNATURES } from "../KeySignatures";
import { GreekModeDictionary } from "./GreekModeDictionary";
import { GreekModeInfo } from "./GreekModeInfo";
import { GreekModeType } from "./GreekModeType";
import { ScaleDegreeInfo } from "./ScaleDegreeInfo";

export class GreekModeUtils {
  public static getScaleDegreeInfoFromChromatic(
    greekModeInfo: GreekModeInfo,
    chromaticIndex: ChromaticIndex,
    tonicIndex: ChromaticIndex,
  ): ScaleDegreeInfo | null {
    // Find which scale degree this note is
    const scaleDegreePosition = greekModeInfo.pattern.findIndex(
      (offset) => addChromatic(tonicIndex, offset) === chromaticIndex,
    );

    return scaleDegreePosition === -1
      ? null
      : greekModeInfo.getScaleDegreeInfoFromPosition(scaleDegreePosition);
  }

  // Get the relative Ionian (major) key for a given Greek mode
  // For example: D Dorian -> C Ionian, E Phrygian -> C Ionian
  public static getKeySignatureFromGreekMode(tonicString: string, mode: GreekModeType): string[] {
    const relativeIonian = this.getRelativeIonian(tonicString, mode);
    return MAJOR_KEY_SIGNATURES[relativeIonian] || [];
  }

  private static getRelativeIonian(tonicString: string, mode: GreekModeType): string {
    const greekModeInfo = GreekModeDictionary.getModeInfo(mode);
    const modeIndex = greekModeInfo.modeNumber;
    const modePattern = greekModeInfo.pattern;
    const relativeIonianIndex = modePattern.length - modeIndex;
    const tonicIndex = noteTextToIndex(tonicString);
    const relativeIonianChromaticIndex = addChromatic(tonicIndex, modePattern[relativeIonianIndex]);
    return getNoteTextFromChromaticIndex(relativeIonianChromaticIndex, AccidentalType.Sharp);
  }
}
