import { TWELVE, TWENTY4 } from "./NoteConstants";

type Branded<K, T> = K & { __brand: T };

export type ActualIndex = Branded<number, "ActualIndex">;
export type OffsetIndex = Branded<number, "OffsetIndex">;
export type ChromaticIndex = Branded<number, "ChromaticIndex">;
export type OctaveOffset = Branded<number, "OctaveOffset">;

export type InversionIndex = Branded<number, "InversionIndex">;

export interface IndexAndOffset {
  chromaticIndex: ChromaticIndex;
  octaveOffset: OctaveOffset;
}

export function ixInversion(n: number): InversionIndex {
  if (n < 0 || n > 4 || !Number.isInteger(n)) throw new Error("Invalid InversionIndex");
  return n as InversionIndex;
}

export function ixActual(n: number): ActualIndex {
  if (n < 0 || n > TWENTY4 || !Number.isInteger(n)) throw new Error("Invalid ActualIndex=" + n);
  return n as ActualIndex;
}

export function ixActualArray(numbers: number[]): ActualIndex[] {
  return numbers.map(ixActual);
}

export function ixOffset(n: number): OffsetIndex {
  if (n < -TWELVE || n > 14 || !Number.isInteger(n)) throw new Error("Invalid OffsetIndex");
  return n as OffsetIndex;
}

export function ixOffsetArray(numbers: number[]): OffsetIndex[] {
  return numbers.map(ixOffset);
}

export function ixChromaticArray(numbers: number[]): ChromaticIndex[] {
  return numbers.map(ixChromatic);
}

export function ixChromatic(n: number): ChromaticIndex {
  if (n < 0 || n > TWELVE || !Number.isInteger(n)) throw new Error("Invalid ChromaticIndex");
  return n as ChromaticIndex;
}

export function ixOctaveOffset(n: number): OctaveOffset {
  if (n < 0 || n > 1 || !Number.isInteger(n)) throw new Error("Invalid OctaveOffset");
  return n as OctaveOffset;
}

export function chromaticToActual(
  chromaticIndex: ChromaticIndex,
  octaveOffset: OctaveOffset,
): ActualIndex {
  const result = octaveOffset * TWELVE + chromaticIndex;
  return ixActual(result);
}

export function actualToChromatic(actualIndex: ActualIndex): IndexAndOffset {
  return {
    chromaticIndex: ixChromatic(actualIndex % TWELVE),
    octaveOffset: ixOctaveOffset(actualIndex >= TWELVE ? 1 : 0),
  };
}

export type RomanNumeralString =
  | "I"
  | "II"
  | "III"
  | "IV"
  | "V"
  | "VI"
  | "VII"
  | "i"
  | "ii"
  | "iii"
  | "iv"
  | "v"
  | "vi"
  | "vii";

export function ixRomanString(numeral: string): RomanNumeralString {
  if (getOrdinal(numeral) <= 0) {
    throw new Error("Invalid Roman Numeral");
  }
  return numeral as RomanNumeralString;
}

export function getOrdinal(numeral: string): number {
  switch (numeral) {
    case "I":
    case "i":
      return 1;
    case "II":
    case "ii":
      return 2;
    case "III":
    case "iii":
      return 3;
    case "IV":
    case "iv":
      return 4;
    case "V":
    case "v":
      return 5;
    case "VI":
    case "vi":
      return 6;
    case "VII":
    case "vii":
      return 7;
    default:
      return -1;
  }
}

export function isLowercaseRomanNumeral(numeral: RomanNumeralString): boolean {
  return numeral.toLowerCase() === numeral;
}
