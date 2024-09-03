import { TWELVE } from "./NoteConstants";

type Branded<K, T> = K & { __brand: T };

export type ActualIndex = Branded<number, "ActualIndex">;
export type OffsetIndex = Branded<number, "OffsetIndex">;
export type ChromaticIndex = Branded<number, "ChromaticIndex">;
export type OctaveOffset = Branded<number, "OctaveOffset">;
export interface IndexAndOffset {
  chromaticIndex: ChromaticIndex;
  octaveOffset: OctaveOffset;
}

export function createActualIndex(n: number): ActualIndex {
  if (n < 0 || n > 2 * TWELVE || !Number.isInteger(n)) throw new Error("Invalid ActualIndex");
  return n as ActualIndex;
}

export function createActualIndexArray(numbers: number[]): ActualIndex[] {
  return numbers.map(createActualIndex);
}

export function createOffsetIndex(n: number): OffsetIndex {
  if (n < -TWELVE || n > 14 || !Number.isInteger(n)) throw new Error("Invalid OffsetIndex");
  return n as OffsetIndex;
}

export function createOffsetIndexArray(numbers: number[]): OffsetIndex[] {
  return numbers.map(createOffsetIndex);
}

export function createChromaticIndex(n: number): ChromaticIndex {
  if (n < 0 || n > TWELVE || !Number.isInteger(n)) throw new Error("Invalid ChromaticIndex");
  return n as ChromaticIndex;
}

export function createOctaveOffset(n: number): OctaveOffset {
  if (n < 0 || n > 1 || !Number.isInteger(n)) throw new Error("Invalid OctaveOffset");
  return n as OctaveOffset;
}

export function chromaticToActual(
  chromaticIndex: ChromaticIndex,
  octaveOffset: OctaveOffset,
): ActualIndex {
  const result = octaveOffset * TWELVE + chromaticIndex;
  return createActualIndex(result);
}

export function actualToChromatic(actualIndex: ActualIndex): IndexAndOffset {
  return {
    chromaticIndex: createChromaticIndex(actualIndex % TWELVE),
    octaveOffset: createOctaveOffset(Math.floor(actualIndex / TWELVE)),
  };
}
