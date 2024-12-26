import { ChordDisplayMode } from "./ChordDisplayMode";
import { ixOffsetArray, OffsetIndex } from "./IndexTypes";
import { ChordType, IntervalType, NoteGroupingId, SpecialType } from "./NoteGroupingTypes";

export enum NoteGroupingType {
  None = "None",
  Note = "Note",
  Interval = "Interval",
  Chord = "Chord",
}

export class NoteGroupingInfo {
  constructor(
    public readonly lettersId: string,
    public readonly symbolsId: string,
    public readonly displayName: string,
    public readonly orderId: number,
    public readonly offsets: OffsetIndex[],
  ) {}

  static createInterval(
    orderId: number,
    shortName: string,
    displayName: string,
    semitones: number,
  ): NoteGroupingInfo {
    return new NoteGroupingInfo(
      shortName,
      shortName,
      displayName,
      orderId,
      ixOffsetArray([0, semitones]),
    );
  }

  static createChord(
    orderId: number,
    lettersId: string,
    symbolsId: string,
    displayName: string,
    offsets: number[],
  ): NoteGroupingInfo {
    return new NoteGroupingInfo(lettersId, symbolsId, displayName, orderId, ixOffsetArray(offsets));
  }
}

export const NoteGroupings: { [key in NoteGroupingId]: NoteGroupingInfo } = {
  [SpecialType.None]: new NoteGroupingInfo("Ø", "Ø", "None", 0, []),
  [SpecialType.Note]: new NoteGroupingInfo("", "", "Single Note", 1, ixOffsetArray([0])),

  // Intervals
  [IntervalType.Minor2]: NoteGroupingInfo.createInterval(2, "m2", "Minor 2nd", 1),
  [IntervalType.Major2]: NoteGroupingInfo.createInterval(3, "M2", "Major 2nd", 2),
  [IntervalType.Minor3]: NoteGroupingInfo.createInterval(4, "m3", "Minor 3rd", 3),
  [IntervalType.Major3]: NoteGroupingInfo.createInterval(5, "M3", "Major 3rd", 4),
  [IntervalType.Fourth]: NoteGroupingInfo.createInterval(6, "P4", "Perfect 4th", 5),
  [IntervalType.Tritone]: NoteGroupingInfo.createInterval(7, "TT", "Tritone", 6),
  [IntervalType.Fifth]: NoteGroupingInfo.createInterval(8, "P5", "Perfect 5th", 7),
  [IntervalType.Minor6]: NoteGroupingInfo.createInterval(9, "m6", "Minor 6th", 8),
  [IntervalType.Major6]: NoteGroupingInfo.createInterval(10, "M6", "Major 6th", 9),
  [IntervalType.Minor7]: NoteGroupingInfo.createInterval(11, "m7", "Minor 7th", 10),
  [IntervalType.Major7]: NoteGroupingInfo.createInterval(12, "M7", "Major 7th", 11),
  [IntervalType.Octave]: NoteGroupingInfo.createInterval(13, "Oct", "Octave", 12),

  // Triads
  [ChordType.Major]: NoteGroupingInfo.createChord(14, "maj", "", "Major Chord", [0, 4, 7]),
  [ChordType.Minor]: NoteGroupingInfo.createChord(15, "min", "m", "Minor Chord", [0, 3, 7]),
  [ChordType.Diminished]: NoteGroupingInfo.createChord(
    16,
    "dim",
    "°",
    "Diminished Chord",
    [0, 3, 6],
  ),
  [ChordType.Augmented]: NoteGroupingInfo.createChord(17, "aug", "+", "Augmented Chord", [0, 4, 8]),
  [ChordType.Sus4]: NoteGroupingInfo.createChord(
    18,
    "sus4",
    "sus",
    "Suspended 4th Chord",
    [0, 5, 7],
  ),
  [ChordType.Sus2]: NoteGroupingInfo.createChord(
    19,
    "sus2",
    "sus2",
    "Suspended 2nd Chord",
    [0, 2, 7],
  ),

  // Seventh Chords
  [ChordType.Dominant7]: NoteGroupingInfo.createChord(
    20,
    "7",
    "7",
    "7th (Dominant) Chord",
    [0, 4, 7, 10],
  ),
  [ChordType.Major7]: NoteGroupingInfo.createChord(
    21,
    "maj7",
    "Δ7",
    "Major 7th Chord",
    [0, 4, 7, 11],
  ),
  [ChordType.Minor7]: NoteGroupingInfo.createChord(
    22,
    "min7",
    "m7",
    "Minor 7th Chord",
    [0, 3, 7, 10],
  ),
  [ChordType.MinorMajor7]: NoteGroupingInfo.createChord(
    23,
    "mMaj7",
    "mΔ7",
    "Minor Major 7th Chord",
    [0, 3, 7, 11],
  ),
  [ChordType.Minor7b5]: NoteGroupingInfo.createChord(
    24,
    "maj7b5",
    "Δ7b5",
    "Major 7th Flat 5 Chord",
    [0, 4, 6, 11],
  ),
  [ChordType.Diminished7]: NoteGroupingInfo.createChord(
    25,
    "dim7",
    "°7",
    "Diminished 7th Chord",
    [0, 3, 6, 9],
  ),
  [ChordType.Six]: NoteGroupingInfo.createChord(26, "6", "6", "Major 6th Chord", [0, 4, 7, 9]),
  [ChordType.Minor6]: NoteGroupingInfo.createChord(
    27,
    "min6",
    "m6",
    "Minor 6th Chord",
    [0, 3, 7, 9],
  ),

  // Extended Chords
  [ChordType.Add9]: NoteGroupingInfo.createChord(
    28,
    "add9",
    "add9",
    "Add 9th Chord",
    [0, 4, 7, 14],
  ),
  [ChordType.Seven13]: NoteGroupingInfo.createChord(
    29,
    "7add13",
    "7add13",
    "Dominant 7th Add 13th Chord",
    [0, 4, 7, 10, 13],
  ),
  // ... other chords follow the same pattern
};

export const getId = (key: NoteGroupingId, chordDisplayMode: ChordDisplayMode): string => {
  switch (chordDisplayMode) {
    case ChordDisplayMode.Letters_Long:
      return NoteGroupings[key]?.lettersId || "";
    case ChordDisplayMode.Symbols:
      return NoteGroupings[key]?.symbolsId || "";
    case ChordDisplayMode.Letters_Short:
      const lettersId = NoteGroupings[key]?.lettersId || "";
      const displayId = lettersId === "min" ? "m" : lettersId === "maj" ? "" : lettersId;
      return displayId;
    case ChordDisplayMode.DisplayName:
      return NoteGroupings[key]?.displayName || "";
  }
};
