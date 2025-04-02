import { noteTextToIndex } from "../types/ChromaticIndex";
import { MAJOR_KEY_SIGNATURES, MINOR_KEY_SIGNATURES } from "../types/KeySignatures";
import { KeyType } from "../types/KeyType";

export class KeySignatureUtils {
  public static getKeyList(mode: KeyType): string[] {
    return Object.keys(this.getKeySignatures(mode)).sort(
      (a, b) => noteTextToIndex(a) - noteTextToIndex(b),
    );
  }

  public static getKeySignatures(mode: KeyType): Record<string, string[]> {
    return mode === KeyType.Major ? MAJOR_KEY_SIGNATURES : MINOR_KEY_SIGNATURES;
  }
}
