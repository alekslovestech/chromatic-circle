type Branded<K, T> = K & { __brand: T };

// For array indices (0-6), -1 for invalid values
export type ScaleDegreeIndex = Branded<number, "ScaleDegreeIndex">;

// For scale degrees (1-7), -1 for invalid values
export type ScaleDegree = Branded<number, "ScaleDegree">;

// Conversion functions
export function ixScaleDegreeIndex(n: number): ScaleDegreeIndex {
  if ((n < 0 && n !== -1) || n > 6 || !Number.isInteger(n))
    throw new Error("Invalid ScaleDegreeIndex=" + n);
  return n as ScaleDegreeIndex;
}

export function ixScaleDegree(n: number): ScaleDegree {
  if ((n < 1 && n !== -1) || n > 7 || !Number.isInteger(n))
    throw new Error("Invalid ScaleDegree=" + n);
  return n as ScaleDegree;
}
