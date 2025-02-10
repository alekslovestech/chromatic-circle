import { TWELVE } from "./NoteConstants";
type Branded<K, T> = K & { __brand: T };

export type ChromaticIndex = Branded<number, "ChromaticIndex">;

export const ixChromatic = (n: number): ChromaticIndex => {
  if (n < 0 || n > TWELVE || !Number.isInteger(n)) throw new Error("Invalid ChromaticIndex");
  return n as ChromaticIndex;
};

export const addChromatic = (a: ChromaticIndex, b: number): ChromaticIndex => {
  const mod = (((a + b) % TWELVE) + TWELVE) % TWELVE; // Handles negative numbers correctly
  return ixChromatic(mod);
};

export const noteTextToIndex = (note: string): ChromaticIndex => {
  const noteMap: { [key: string]: number } = {
    C: 0,
    "C#": 1,
    Db: 1,
    D: 2,
    "D#": 3,
    Eb: 3,
    E: 4,
    F: 5,
    "F#": 6,
    Gb: 6,
    G: 7,
    "G#": 8,
    Ab: 8,
    A: 9,
    "A#": 10,
    Bb: 10,
    B: 11,
  };

  return ixChromatic(noteMap[note] ?? -1);
};
