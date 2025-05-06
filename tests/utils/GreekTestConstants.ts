import { GreekModeType } from "../../types/GreekModes/GreekModeType";
import { KeyType } from "../../types/Keys/KeyType";
import { MusicalKey } from "../../types/Keys/MusicalKey";

export class GreekTestConstants {
  private static instance: GreekTestConstants;

  readonly C_IONIAN_KEY = MusicalKey.fromGreekMode("C", GreekModeType.Ionian);
  readonly C_DORIAN_KEY = MusicalKey.fromGreekMode("C", GreekModeType.Dorian);
  readonly C_PHRYGIAN_KEY = MusicalKey.fromGreekMode("C", GreekModeType.Phrygian);
  readonly C_LYDIAN_KEY = MusicalKey.fromGreekMode("C", GreekModeType.Lydian);
  readonly C_MIXOLYDIAN_KEY = MusicalKey.fromGreekMode("C", GreekModeType.Mixolydian);
  readonly C_AEOLIAN_KEY = MusicalKey.fromGreekMode("C", GreekModeType.Aeolian);
  readonly C_LOCRIAN_KEY = MusicalKey.fromGreekMode("C", GreekModeType.Locrian);
  readonly E_MAJOR = MusicalKey.fromClassicalMode("E", KeyType.Major);
  readonly G_MAJOR = MusicalKey.fromClassicalMode("G", KeyType.Major);

  // Traditional starting positions for each mode
  readonly D_IONIAN_KEY = MusicalKey.fromGreekMode("D", GreekModeType.Ionian);
  readonly D_DORIAN_KEY = MusicalKey.fromGreekMode("D", GreekModeType.Dorian);
  readonly E_PHRYGIAN_KEY = MusicalKey.fromGreekMode("E", GreekModeType.Phrygian);
  readonly F_LYDIAN_KEY = MusicalKey.fromGreekMode("F", GreekModeType.Lydian);
  readonly G_MIXOLYDIAN_KEY = MusicalKey.fromGreekMode("G", GreekModeType.Mixolydian);
  readonly A_AEOLIAN_KEY = MusicalKey.fromGreekMode("A", GreekModeType.Aeolian);
  readonly B_LOCRIAN_KEY = MusicalKey.fromGreekMode("B", GreekModeType.Locrian);

  private constructor() {}

  static getInstance(): GreekTestConstants {
    if (!GreekTestConstants.instance) {
      GreekTestConstants.instance = new GreekTestConstants();
    }
    return GreekTestConstants.instance;
  }
}
