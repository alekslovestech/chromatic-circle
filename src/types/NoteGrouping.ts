import { ChordDisplayMode } from "./ChordDisplayMode";
import { ixOffsetArray, OffsetIndex } from "./IndexTypes";
import { ChordType, IntervalType, NoteGroupingId, SpecialType } from "./NoteGroupingTypes";

export enum NoteGroupingType {
  None = "None",
  Note = "Note",
  Interval = "Interval",
  Chord = "Chord",
}

export interface NoteGroupingInfo {
  lettersId: string;
  symbolsId: string;
  displayName: string;
  orderId: number;
  offsets: OffsetIndex[];
  hasInversions?: boolean;
}

export const NoteGroupings: { [key in NoteGroupingId]: NoteGroupingInfo } = {
  [SpecialType.None]: {
    lettersId: "Ø",
    symbolsId: "Ø",
    displayName: "None",
    orderId: 0,
    offsets: [],
  },

  [SpecialType.Note]: {
    lettersId: "",
    symbolsId: "",
    displayName: "Single Note",
    orderId: 1,
    offsets: ixOffsetArray([0]),
  },

  //2 note intervals
  [IntervalType.Minor2]: {
    lettersId: "m2",
    symbolsId: "m2",
    displayName: "Minor 2nd",
    orderId: 2,
    offsets: ixOffsetArray([0, 1]),
  },
  [IntervalType.Major2]: {
    lettersId: "M2",
    symbolsId: "M2",
    displayName: "Major 2nd",
    orderId: 3,
    offsets: ixOffsetArray([0, 2]),
  },
  [IntervalType.Minor3]: {
    lettersId: "m3",
    symbolsId: "m3",
    displayName: "Minor 3rd",
    orderId: 4,
    offsets: ixOffsetArray([0, 3]),
  },
  [IntervalType.Major3]: {
    lettersId: "M3",
    symbolsId: "M3",
    displayName: "Major 3rd",
    orderId: 5,
    offsets: ixOffsetArray([0, 4]),
  },
  [IntervalType.Fourth]: {
    lettersId: "P4",
    symbolsId: "P4",
    displayName: "Perfect 4th",
    orderId: 6,
    offsets: ixOffsetArray([0, 5]),
  },
  [IntervalType.Tritone]: {
    lettersId: "Tritone",
    symbolsId: "TT",
    displayName: "Tritone",
    orderId: 7,
    offsets: ixOffsetArray([0, 6]),
  },
  [IntervalType.Fifth]: {
    lettersId: "P5",
    symbolsId: "P5",
    displayName: "Perfect 5th",
    orderId: 8,
    offsets: ixOffsetArray([0, 7]),
  },
  [IntervalType.Minor6]: {
    lettersId: "m6",
    symbolsId: "m6",
    displayName: "Minor 6th",
    orderId: 9,
    offsets: ixOffsetArray([0, 8]),
  },
  [IntervalType.Major6]: {
    lettersId: "M6",
    symbolsId: "M6",
    displayName: "Major 6th",
    orderId: 10,
    offsets: ixOffsetArray([0, 9]),
  },
  [IntervalType.Minor7]: {
    lettersId: "m7",
    symbolsId: "m7",
    displayName: "Minor 7th",
    orderId: 11,
    offsets: ixOffsetArray([0, 10]),
  },
  [IntervalType.Major7]: {
    lettersId: "M7",
    symbolsId: "M7",
    displayName: "Major 7th",
    orderId: 12,
    offsets: ixOffsetArray([0, 11]),
  },
  [IntervalType.Octave]: {
    lettersId: "Octave",
    symbolsId: "Oct",
    displayName: "Octave",
    orderId: 13,
    offsets: ixOffsetArray([0, 12]),
  },

  //3 note chords
  [ChordType.Major]: {
    lettersId: "maj",
    symbolsId: "",
    displayName: "Major Chord",
    orderId: 14,
    offsets: ixOffsetArray([0, 4, 7]),
  },

  [ChordType.Minor]: {
    lettersId: "min",
    symbolsId: "m",
    displayName: "Minor Chord",
    orderId: 15,
    offsets: ixOffsetArray([0, 3, 7]),
  },
  [ChordType.Diminished]: {
    lettersId: "dim",
    symbolsId: "°",
    displayName: "Diminished Chord",
    orderId: 16,
    offsets: ixOffsetArray([0, 3, 6]),
  },
  [ChordType.Augmented]: {
    lettersId: "aug",
    symbolsId: "+",
    displayName: "Augmented Chord",
    orderId: 17,
    offsets: ixOffsetArray([0, 4, 8]),
  },
  [ChordType.Sus4]: {
    lettersId: "sus4",
    symbolsId: "sus",
    displayName: "Suspended 4th Chord",
    orderId: 18,
    offsets: ixOffsetArray([0, 5, 7]),
  },
  [ChordType.Sus2]: {
    lettersId: "sus2",
    symbolsId: "sus2",
    displayName: "Suspended 2nd Chord",
    orderId: 19,
    offsets: ixOffsetArray([0, 2, 7]),
  },
  [ChordType.Six]: {
    lettersId: "6",
    symbolsId: "6",
    displayName: "Major 6th Chord",
    orderId: 20,
    offsets: ixOffsetArray([0, 4, 7, 9]),
  },
  [ChordType.Minor6]: {
    lettersId: "m6",
    symbolsId: "m6",
    displayName: "Minor 6th Chord",
    orderId: 21,
    offsets: ixOffsetArray([0, 3, 7, 9]),
  },

  //4 note chords
  [ChordType.Dominant7]: {
    lettersId: "7",
    symbolsId: "7",
    displayName: "7th (Dominant) Chord",
    orderId: 22,
    offsets: ixOffsetArray([0, 4, 7, 10]),
  },
  [ChordType.Major7]: {
    lettersId: "maj7",
    symbolsId: "Δ7",
    displayName: "Major 7th Chord",
    orderId: 23,
    offsets: ixOffsetArray([0, 4, 7, 11]),
  },
  [ChordType.Minor7]: {
    lettersId: "min7",
    symbolsId: "m7",
    displayName: "Minor 7th Chord",
    orderId: 24,
    offsets: ixOffsetArray([0, 3, 7, 10]),
  },

  [ChordType.MinorMajor7]: {
    lettersId: "mMaj",
    symbolsId: "mΔ7",
    displayName: "Minor Major 7th Chord",
    orderId: 25,
    offsets: ixOffsetArray([0, 3, 7, 11]),
  },
  [ChordType.Diminished7]: {
    lettersId: "dim7",
    symbolsId: "°7",
    displayName: "Diminished 7th Chord",
    orderId: 26,
    offsets: ixOffsetArray([0, 3, 6, 10]),
  },
  [ChordType.Minor7b5]: {
    lettersId: "m7b5",
    symbolsId: "ø7",
    displayName: "Half Diminished 7th Chord",
    orderId: 27,
    offsets: ixOffsetArray([0, 3, 6, 10]),
  },

  [ChordType.Add9]: {
    lettersId: "add9",
    symbolsId: "add9",
    displayName: "Add 9th Chord",
    orderId: 28,
    offsets: ixOffsetArray([0, 4, 7, 14]),
  },
  [ChordType.Seven13]: {
    lettersId: "7add13",
    symbolsId: "7add13",
    displayName: "Dominant 7thAdd 13th Chord",
    orderId: 29,
    offsets: ixOffsetArray([0, 4, 7, 10, 13]),
  },
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
