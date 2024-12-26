import { ChordDisplayMode } from "./ChordDisplayMode";
import { ixOffsetArray } from "./IndexTypes";
import { NoteGrouping } from "./NoteGrouping";
import { ChordType, IntervalType, NoteGroupingId, SpecialType } from "./NoteGroupingTypes";

export const NoteGroupingLibrary: { [key in NoteGroupingId]: NoteGrouping } = {
  [SpecialType.None]: new NoteGrouping("Ø", "Ø", "None", 0, []),
  [SpecialType.Note]: new NoteGrouping("", "", "Single Note", 1, ixOffsetArray([0])),

  // Intervals
  [IntervalType.Minor2]: NoteGrouping.createInterval(2, "m2", "Minor 2nd", 1),
  [IntervalType.Major2]: NoteGrouping.createInterval(3, "M2", "Major 2nd", 2),
  [IntervalType.Minor3]: NoteGrouping.createInterval(4, "m3", "Minor 3rd", 3),
  [IntervalType.Major3]: NoteGrouping.createInterval(5, "M3", "Major 3rd", 4),
  [IntervalType.Fourth]: NoteGrouping.createInterval(6, "P4", "Perfect 4th", 5),
  [IntervalType.Tritone]: NoteGrouping.createInterval(7, "TT", "Tritone", 6),
  [IntervalType.Fifth]: NoteGrouping.createInterval(8, "P5", "Perfect 5th", 7),
  [IntervalType.Minor6]: NoteGrouping.createInterval(9, "m6", "Minor 6th", 8),
  [IntervalType.Major6]: NoteGrouping.createInterval(10, "M6", "Major 6th", 9),
  [IntervalType.Minor7]: NoteGrouping.createInterval(11, "m7", "Minor 7th", 10),
  [IntervalType.Major7]: NoteGrouping.createInterval(12, "M7", "Major 7th", 11),
  [IntervalType.Octave]: NoteGrouping.createInterval(13, "Oct", "Octave", 12),

  // Triads
  [ChordType.Major]: NoteGrouping.createChord(14, "maj", "", "Major Chord", [0, 4, 7]),
  [ChordType.Minor]: NoteGrouping.createChord(15, "min", "m", "Minor Chord", [0, 3, 7]),
  [ChordType.Diminished]: NoteGrouping.createChord(16, "dim", "°", "Diminished Chord", [0, 3, 6]),
  [ChordType.Augmented]: NoteGrouping.createChord(17, "aug", "+", "Augmented Chord", [0, 4, 8]),
  [ChordType.Sus4]: NoteGrouping.createChord(18, "sus4", "sus", "Suspended 4th Chord", [0, 5, 7]),
  [ChordType.Sus2]: NoteGrouping.createChord(19, "sus2", "sus2", "Suspended 2nd Chord", [0, 2, 7]),

  // Seventh Chords
  [ChordType.Dominant7]: NoteGrouping.createChord(
    20,
    "7",
    "7",
    "7th (Dominant) Chord",
    [0, 4, 7, 10],
  ),
  [ChordType.Major7]: NoteGrouping.createChord(21, "maj7", "Δ7", "Major 7th Chord", [0, 4, 7, 11]),
  [ChordType.Minor7]: NoteGrouping.createChord(22, "min7", "m7", "Minor 7th Chord", [0, 3, 7, 10]),
  [ChordType.MinorMajor7]: NoteGrouping.createChord(
    23,
    "mMaj7",
    "mΔ7",
    "Minor Major 7th Chord",
    [0, 3, 7, 11],
  ),
  [ChordType.HalfDiminished]: NoteGrouping.createChord(
    24,
    "m7b5",
    "ø",
    "Major 7th Flat 5 Chord",
    [0, 4, 6, 11],
  ),
  [ChordType.Diminished7]: NoteGrouping.createChord(
    25,
    "dim7",
    "°7",
    "Diminished 7th Chord",
    [0, 3, 6, 9],
  ),
  [ChordType.Six]: NoteGrouping.createChord(26, "6", "6", "Major 6th Chord", [0, 4, 7, 9]),
  [ChordType.Minor6]: NoteGrouping.createChord(27, "min6", "m6", "Minor 6th Chord", [0, 3, 7, 9]),

  // Extended Chords
  [ChordType.Add9]: NoteGrouping.createChord(28, "add9", "add9", "Add 9th Chord", [0, 4, 7, 14]),
  [ChordType.Seven13]: NoteGrouping.createChord(
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
      return NoteGroupingLibrary[key]?.lettersId || "";
    case ChordDisplayMode.Symbols:
      return NoteGroupingLibrary[key]?.symbolsId || "";
    case ChordDisplayMode.Letters_Short:
      const lettersId = NoteGroupingLibrary[key]?.lettersId || "";
      const displayId = lettersId === "min" ? "m" : lettersId === "maj" ? "" : lettersId;
      return displayId;
    case ChordDisplayMode.DisplayName:
      return NoteGroupingLibrary[key]?.displayName || "";
  }
};
