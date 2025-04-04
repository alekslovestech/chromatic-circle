import { addChromatic, ChromaticIndex } from "../ChromaticIndex";
import { GreekModeInfo } from "./GreekModeInfo";
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
}
