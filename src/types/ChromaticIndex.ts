import { TWELVE } from "./NoteConstants";
type Branded<K, T> = K & { __brand: T };

export type ChromaticIndex = Branded<number, "ChromaticIndex">;

export const ixChromatic = (n: number): ChromaticIndex => {
  if (n < 0 || n > TWELVE || !Number.isInteger(n)) {
    throw new Error("Invalid ChromaticIndex " + n);
  }
  return n as ChromaticIndex;
};

export const addChromatic = (a: ChromaticIndex, b: number): ChromaticIndex => {
  const mod = (a + b + TWELVE) % TWELVE; // Handles negative numbers correctly
  return ixChromatic(mod);
};
