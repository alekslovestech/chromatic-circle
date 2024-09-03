type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

//convention: chromaticIndex is purely from 0 to 11, usually accompanied by an octave marker
//convention: actualIndex is an index 0 to 23, which can be converted into (chromaticIndex,octave)
export type ChromaticIndex = IntRange<0, 12>; // 0..11
export type ActualIndex = IntRange<0, 24>; //0..23
export type OffsetIndex =
  | -12
  | -11
  | -10
  | -9
  | -8
  | -7
  | -6
  | -5
  | -4
  | -3
  | -2
  | -1
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14;
export type OctaveOffset = IntRange<0, 1>; //0..1, relative
export interface IndexAndOffset {
  chromaticIndex: ChromaticIndex;
  octaveOffset: OctaveOffset;
}
