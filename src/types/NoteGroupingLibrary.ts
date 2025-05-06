import { CHORD_OFFSET_PATTERNS } from "./ChordOffsetPatterns";
import { ixOffsetArray } from "./IndexTypes";
import { NoteGrouping } from "./NoteGrouping";
import { ChordType, IntervalType, NoteGroupingId, SpecialType } from "./NoteGroupingTypes";
import { ChordDisplayMode } from "./SettingModes";
class NoteGroupingLibrarySingleton {
  public getGroupingById(id: NoteGroupingId): NoteGrouping {
    const found = NoteGroupingLibrarySingleton.library.find((grouping) => grouping.id === id);
    if (!found) {
      throw new Error(`NoteGrouping not found for id: ${id}`);
    }
    return found;
  }

  public getId(key: NoteGroupingId, chordDisplayMode: ChordDisplayMode): string {
    const grouping = this.getGroupingById(key);
    switch (chordDisplayMode) {
      case ChordDisplayMode.Letters_Long:
        return grouping.lettersId;
      case ChordDisplayMode.Symbols:
        return grouping.symbolsId;
      case ChordDisplayMode.Letters_Short:
        const lettersId = grouping.lettersId;
        const displayId =
          lettersId.toLowerCase() === "min"
            ? "m"
            : lettersId.toLowerCase() === "maj"
            ? ""
            : lettersId;
        return displayId;
      case ChordDisplayMode.DisplayName:
        return grouping.displayName;
      case ChordDisplayMode.ElementId:
        return `${grouping.id}`;
      default:
        return "";
    }
  }

  public getAllIds(): NoteGroupingId[] {
    return NoteGroupingLibrarySingleton.library.map((grouping) => grouping.id) as NoteGroupingId[];
  }

  public IntervalOrChordIds(isInterval: boolean): NoteGroupingId[] {
    return NoteGroupingLibrarySingleton.library
      .filter((grouping) => (isInterval ? grouping.numNotes === 2 : grouping.numNotes > 2))
      .sort((a, b) => a.orderId - b.orderId)
      .map((grouping) => grouping.id);
  }

  private static instance: NoteGroupingLibrarySingleton;

  private constructor() {}

  private static library: NoteGrouping[] = [
    new NoteGrouping(SpecialType.None, "Ø", "Ø", "None", 0, []),
    new NoteGrouping(SpecialType.Note, "", "", "Single Note", 1, ixOffsetArray([0])),

    // Intervals
    NoteGrouping.createInterval(IntervalType.Minor2, 2, "m2", "Minor 2nd", 1),
    NoteGrouping.createInterval(IntervalType.Major2, 3, "M2", "Major 2nd", 2),
    NoteGrouping.createInterval(IntervalType.Minor3, 4, "m3", "Minor 3rd", 3),
    NoteGrouping.createInterval(IntervalType.Major3, 5, "M3", "Major 3rd", 4),
    NoteGrouping.createInterval(IntervalType.Fourth, 6, "P4", "Perfect 4th", 5),
    NoteGrouping.createInterval(IntervalType.Tritone, 7, "TT", "Tritone", 6),
    NoteGrouping.createInterval(IntervalType.Fifth, 8, "P5", "Perfect 5th", 7),
    NoteGrouping.createInterval(IntervalType.Minor6, 9, "m6", "Minor 6th", 8),
    NoteGrouping.createInterval(IntervalType.Major6, 10, "M6", "Major 6th", 9),
    NoteGrouping.createInterval(IntervalType.Minor7, 11, "m7", "Minor 7th", 10),
    NoteGrouping.createInterval(IntervalType.Major7, 12, "M7", "Major 7th", 11),
    NoteGrouping.createInterval(IntervalType.Octave, 13, "Oct", "Octave", 12),

    // Triads
    NoteGrouping.createChord(
      ChordType.Major,
      14,
      "Maj",
      "",
      "Major Chord",
      CHORD_OFFSET_PATTERNS.MAJOR,
    ),
    NoteGrouping.createChord(
      ChordType.Minor,
      15,
      "min",
      "m",
      "Minor Chord",
      CHORD_OFFSET_PATTERNS.MINOR,
    ),
    NoteGrouping.createChord(
      ChordType.Diminished,
      16,
      "dim",
      "°",
      "Diminished Chord",
      CHORD_OFFSET_PATTERNS.DIMINISHED,
    ),
    NoteGrouping.createChord(
      ChordType.Augmented,
      17,
      "Aug",
      "+",
      "Augmented Chord",
      CHORD_OFFSET_PATTERNS.AUGMENTED,
    ),
    NoteGrouping.createChord(
      ChordType.Sus4,
      18,
      "sus4",
      "sus",
      "Suspended 4th Chord",
      CHORD_OFFSET_PATTERNS.SUS4,
    ),
    NoteGrouping.createChord(
      ChordType.Sus2,
      19,
      "sus2",
      "sus2",
      "Suspended 2nd Chord",
      CHORD_OFFSET_PATTERNS.SUS2,
    ),

    // Seventh Chords
    NoteGrouping.createChord(
      ChordType.Dominant7,
      20,
      "7",
      "7",
      "7th (Dominant) Chord",
      [0, 4, 7, 10],
    ),
    NoteGrouping.createChord(ChordType.Major7, 21, "Maj7", "Δ7", "Major 7th Chord", [0, 4, 7, 11]),
    NoteGrouping.createChord(ChordType.Minor7, 22, "min7", "m7", "Minor 7th Chord", [0, 3, 7, 10]),
    NoteGrouping.createChord(
      ChordType.HalfDiminished,
      23,
      "m7♭5",
      "ø7",
      "Half Diminished Chord",
      [0, 3, 6, 10],
    ),
    NoteGrouping.createChord(
      ChordType.MinorMajor7,
      24,
      "mMaj7",
      "mΔ7",
      "Minor Major 7th Chord",
      [0, 3, 7, 11],
    ),

    NoteGrouping.createChord(
      ChordType.Diminished7,
      25,
      "dim7",
      "°7",
      "Diminished 7th Chord",
      [0, 3, 6, 9],
    ),
    NoteGrouping.createChord(ChordType.Six, 26, "6", "6", "Major 6th Chord", [0, 4, 7, 9]),
    NoteGrouping.createChord(ChordType.Minor6, 27, "min6", "m6", "Minor 6th Chord", [0, 3, 7, 9]),
    NoteGrouping.createChord(
      ChordType.AugMajor7,
      28,
      "+Maj7",
      "+Δ7",
      "Augmented Major 7th Chord",
      [0, 4, 8, 11],
    ),

    // Extended Chords
    NoteGrouping.createChord(ChordType.Add9, 29, "add9", "add9", "Add 9th Chord", [0, 4, 7, 14]),

    //"hidden" chords (not visible in the presets list, but can be detected by the app)
    NoteGrouping.createChord(
      ChordType.Seven13,
      30,
      "7add13",
      "7add13",
      "Dominant 7th Add 13th Chord",
      [0, 4, 7, 10, 13],
      false,
      false,
    ),
    NoteGrouping.createChord(
      ChordType.SpreadMajor,
      31,
      "maj",
      "",
      "Spread Major Chord",
      [0, 7, 16],
      false,
      false,
    ),
    NoteGrouping.createChord(
      ChordType.SpreadMinor,
      32,
      "min",
      "m",
      "Spread Minor Chord",
      [0, 7, 15],
      false,
      false,
    ),
    NoteGrouping.createChord(
      ChordType.SpreadAugmented,
      33,
      "aug",
      "+",
      "Spread Augmented Chord",
      [0, 8, 16],
      false,
      false,
    ),
    NoteGrouping.createChord(
      ChordType.SpreadDiminished,
      34,
      "dim",
      "°",
      "Spread Diminished Chord",
      [0, 6, 15],
      false,
      false,
    ),

    //Narrow Chords

    NoteGrouping.createChord(
      ChordType.Narrow23,
      35,
      "23",
      "23",
      "Narrow 23 Chord",
      [0, 2, 4], //C D E
      false,
      false,
    ),
    NoteGrouping.createChord(
      ChordType.Narrow24,
      36,
      "24",
      "24",
      "Narrow 24 Chord",
      [0, 2, 5], //C D F
      false,
      false,
    ),
    NoteGrouping.createChord(
      ChordType.Narrow34,
      37,
      "34",
      "34",
      "Narrow 34 Chord",
      [0, 4, 5], //C E F
      false,
      false,
    ),

    NoteGrouping.createChord(
      ChordType.Narrow24sharp,
      38,
      "2♯4",
      "2♯4",
      "Narrow 24 Sharp Chord",
      [0, 2, 6], //C D F#
      false,
      false,
    ),
    NoteGrouping.createChord(
      ChordType.Narrow34sharp,
      39,
      "♭5",
      "♭5",
      "Major chord with ♭5",
      [0, 4, 6], //C E G♭
      false,
      false,
    ),
    NoteGrouping.createChord(
      ChordType.Narrow3flat4,
      40,
      "♭34",
      "♭34",
      "Narrow 3 Flat 4 Chord",
      [0, 3, 5], //C Eb F
      false,
      false,
    ),
  ];

  public static getInstance(): NoteGroupingLibrarySingleton {
    if (!this.instance) {
      this.instance = new NoteGroupingLibrarySingleton();
    }
    return this.instance;
  }
}

export const NoteGroupingLibrary = NoteGroupingLibrarySingleton.getInstance();
