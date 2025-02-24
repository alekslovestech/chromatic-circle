import { ChromaticIndex, ixChromatic } from "./ChromaticIndex";
import { TWELVE, TWENTY4 } from "./NoteConstants";

type Branded<K, T> = K & { __brand: T };

export type ActualIndex = Branded<number, "ActualIndex">;
export type OffsetIndex = Branded<number, "OffsetIndex">;
export type OctaveOffset = Branded<number, "OctaveOffset">;

export type InversionIndex = Branded<number, "InversionIndex">;

// a number between 1 and 7, or -1 for unknown. 1:1 with roman numerals, but the latter is a string
export type ScaleDegree = Branded<number, "ScaleDegree">;

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

export function ixOctaveOffset(n: number): OctaveOffset {
  if (n < 0 || n > 1 || !Number.isInteger(n)) throw new Error("Invalid OctaveOffset");
  return n as OctaveOffset;
}

export function ixScaleDegree(n: number): ScaleDegree {
  if ((n < 1 && n !== -1) || n > 7 || !Number.isInteger(n))
    throw new Error("Invalid ScaleDegree=" + n);
  return n as ScaleDegree;
}

export function chromaticToActual(
  chromaticIndex: ChromaticIndex,
  octaveOffset: OctaveOffset,
): ActualIndex {
  const result = octaveOffset * TWELVE + chromaticIndex;
  return ixActual(result);
}

export function actualIndexToChromaticAndOctave(actualIndex: ActualIndex) {
  return {
    chromaticIndex: ixChromatic(actualIndex % TWELVE),
    octaveOffset: ixOctaveOffset(actualIndex >= TWELVE ? 1 : 0),
  };
}
