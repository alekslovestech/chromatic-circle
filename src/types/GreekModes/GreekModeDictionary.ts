import { GreekModeType } from "./GreekModeType";
import { GreekModeInfo } from "./GreekModeInfo";
import { GREEK_MODE_PATTERNS } from "./GreekModePatterns";

export class GreekModeDictionary {
  private static instance: GreekModeDictionary;
  private readonly modes: Record<GreekModeType, GreekModeInfo>;

  private constructor() {
    this.modes = {
      [GreekModeType.Ionian]: new GreekModeInfo(
        GreekModeType.Ionian,
        GREEK_MODE_PATTERNS.IONIAN,
        1,
      ), // Major scale
      [GreekModeType.Dorian]: new GreekModeInfo(
        GreekModeType.Dorian,
        GREEK_MODE_PATTERNS.DORIAN,
        2,
      ), // Minor with raised 6th
      [GreekModeType.UkrainianDorian]: new GreekModeInfo(
        GreekModeType.UkrainianDorian,
        GREEK_MODE_PATTERNS.UKRAINIAN_DORIAN,
        2,
      ), // Dorian with #4
      [GreekModeType.Phrygian]: new GreekModeInfo(
        GreekModeType.Phrygian,
        GREEK_MODE_PATTERNS.PHRYGIAN,
        3,
      ), // Minor with lowered 2nd
      [GreekModeType.Spanish]: new GreekModeInfo(
        GreekModeType.Spanish,
        GREEK_MODE_PATTERNS.SPANISH,
        3,
      ),
      [GreekModeType.Arabic]: new GreekModeInfo(
        GreekModeType.Arabic,
        GREEK_MODE_PATTERNS.ARABIC,
        3,
      ),
      [GreekModeType.Lydian]: new GreekModeInfo(
        GreekModeType.Lydian,
        GREEK_MODE_PATTERNS.LYDIAN,
        4,
      ), // Major with raised 4th
      [GreekModeType.Mixolydian]: new GreekModeInfo(
        GreekModeType.Mixolydian,
        GREEK_MODE_PATTERNS.MIXOLYDIAN,
        5,
      ), // Major with lowered 7th
      [GreekModeType.Aeolian]: new GreekModeInfo(
        GreekModeType.Aeolian,
        GREEK_MODE_PATTERNS.AEOLIAN,
        6,
      ), // Natural minor scale
      [GreekModeType.HarmonicMinor]: new GreekModeInfo(
        GreekModeType.HarmonicMinor,
        GREEK_MODE_PATTERNS.HARMONIC_MINOR,
        6,
      ), // Harmonic minor scale
      [GreekModeType.HungarianMinor]: new GreekModeInfo(
        GreekModeType.HungarianMinor,
        GREEK_MODE_PATTERNS.HUNGARIAN_MINOR,
        6,
      ), // Hungarian minor scale
      [GreekModeType.Locrian]: new GreekModeInfo(
        GreekModeType.Locrian,
        GREEK_MODE_PATTERNS.LOCRIAN,
        7,
      ), // Minor with lowered 2nd and 5th
    };
  }

  public static getInstance(): GreekModeDictionary {
    if (!GreekModeDictionary.instance) {
      GreekModeDictionary.instance = new GreekModeDictionary();
    }
    return GreekModeDictionary.instance;
  }

  public static getModeInfo(type: GreekModeType): GreekModeInfo {
    return GreekModeDictionary.getInstance().modes[type];
  }
}
