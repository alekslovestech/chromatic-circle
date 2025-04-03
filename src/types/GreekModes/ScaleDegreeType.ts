type Branded<K, T> = K & { __brand: T };
// a number between 1 and 7, or -1 for unknown. 1:1 with roman numerals, but the latter is a string
export type ScaleDegree = Branded<number, "ScaleDegree">;

export function ixScaleDegree(n: number): ScaleDegree {
  if ((n < 1 && n !== -1) || n > 7 || !Number.isInteger(n))
    throw new Error("Invalid ScaleDegree=" + n);
  return n as ScaleDegree;
}
