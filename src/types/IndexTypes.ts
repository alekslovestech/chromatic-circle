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
    octaveOffset: ixOctaveOffset(Math.floor(actualIndex / TWELVE)),
  };
}
