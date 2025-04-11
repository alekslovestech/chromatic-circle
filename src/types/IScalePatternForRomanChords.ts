import { ChordType } from "./NoteGroupingTypes";
import { ScaleDegreeInfo } from "./GreekModes/ScaleDegreeInfo";

/**
 * Interface for creating Roman chords based on scale patterns.
 * This allows RomanChord to be created without direct dependency on GreekModeInfo.
 */
export interface IScalePatternForRomanChords {
  /**
   * Gets the offsets for the 1-3-5 triad at the given scale degree.
   * @param scaleDegreeInfo The scale degree info containing the scale degree
   * @returns An array of three offsets representing the root, third, and fifth of the triad
   */
  getTriadOffsets(scaleDegreeInfo: ScaleDegreeInfo): number[];

  determineChordType(offsetsFromRoot: number[]): ChordType;
}
