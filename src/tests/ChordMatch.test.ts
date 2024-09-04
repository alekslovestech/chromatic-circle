import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { NoteGroupingId } from "../types/NoteGrouping";
import {
  ActualIndex,
  ixActual,
  ixActualArray,
  ixInversion,
  InversionIndex,
} from "../types/IndexTypes";
import { ChordMatch } from "../types/ChordMatch";
import { Accidental } from "../types/Accidental";

function expectChordMatch(
  actual: ChordMatch | undefined,
  expected: {
    rootNote: ActualIndex;
    noteGroupingId: NoteGroupingId;
    inversionIndex: InversionIndex;
  },
) {
  expect(actual).toBeDefined();
  if (actual) {
    expect({
      rootNote: actual.rootNote,
      noteGroupingId: actual.definition.id,
      inversionIndex: actual.inversionIndex,
    }).toEqual(expected);
  } else {
    fail("ChordMatch is undefined");
  }
}

describe("ChordMatch tests", () => {
  describe("getMatchFromIndices", () => {
    it("should correctly identify a major chord in root position", () => {
      const indices: ActualIndex[] = ixActualArray([0, 4, 7]);
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();
      expectChordMatch(actualChordMatch, {
        rootNote: ixActual(0),
        noteGroupingId: NoteGroupingId.Chord_Maj,
        inversionIndex: ixInversion(0),
      });

      const actualChordName = actualChordMatch?.deriveChordName();
      expect(actualChordName).toBe("C");
    });

    it("should correctly identify a minor chord in root position", () => {
      const indices: ActualIndex[] = ixActualArray([0, 3, 7]);
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();
      expectChordMatch(actualChordMatch, {
        rootNote: ixActual(0),
        noteGroupingId: NoteGroupingId.Chord_Min,
        inversionIndex: ixInversion(0),
      });
      const actualChordName = actualChordMatch?.deriveChordName();

      expect(actualChordName).toBe("Cm");
    });

    it("should correctly identify Dm", () => {
      const indices: ActualIndex[] = ixActualArray([2, 5, 9]);
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();
      expectChordMatch(actualChordMatch, {
        rootNote: ixActual(2),
        noteGroupingId: NoteGroupingId.Chord_Min,
        inversionIndex: ixInversion(0),
      });
      const actualChordName = actualChordMatch?.deriveChordName();

      expect(actualChordName).toBe("Dm");
    });

    it("should correctly identify a flat major ", () => {
      const indices: ActualIndex[] = ixActualArray([1, 5, 8]);
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();
      expectChordMatch(actualChordMatch, {
        rootNote: ixActual(1),
        noteGroupingId: NoteGroupingId.Chord_Maj,
        inversionIndex: ixInversion(0),
      });
      const sharpChordName = actualChordMatch?.deriveChordName(Accidental.Sharp);
      expect(sharpChordName).toBe("C♯");
      const flatChordName = actualChordMatch?.deriveChordName(Accidental.Flat);
      expect(flatChordName).toBe("D♭");
    });

    it("should correctly identify a major chord in first inversion [1]", () => {
      const indices: ActualIndex[] = ixActualArray([4, 7, 12]);
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();

      expectChordMatch(actualChordMatch, {
        rootNote: ixActual(0),
        noteGroupingId: NoteGroupingId.Chord_Maj,
        inversionIndex: ixInversion(1),
      });
      const actualChordName = actualChordMatch?.deriveChordName();
      expect(actualChordName).toBe("C/E");
    });

    it("should correctly identify a major chord in second inversion [2]", () => {
      const indices: ActualIndex[] = ixActualArray([7, 12, 16]);
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();

      expectChordMatch(actualChordMatch, {
        rootNote: ixActual(0),
        noteGroupingId: NoteGroupingId.Chord_Maj,
        inversionIndex: ixInversion(2),
      });
      const actualChordName = actualChordMatch?.deriveChordName();
      expect(actualChordName).toBe("C/G");
    });

    it("should correctly identify a dominant seventh chord in root position", () => {
      const indices: ActualIndex[] = ixActualArray([0, 4, 7, 10]);
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();

      expectChordMatch(actualChordMatch, {
        rootNote: ixActual(0),
        noteGroupingId: NoteGroupingId.Chord_Dom7,
        inversionIndex: ixInversion(0),
      });
      const actualChordName = actualChordMatch?.deriveChordName();
      expect(actualChordName).toBe("Cdom7");
    });
    /*
    it("should correctly identify a major seventh chord in third inversion", () => {
      const indices: ActualIndex[] = [11, 12, 16, 19];
      const result = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(result).toEqual({
        definition: expect.objectContaining({ id: NoteGroupingId.Chord_Maj7 }),
        inversionIndex: 3,
      });
    });
*/
    it("should return undefined for an unrecognized chord", () => {
      const indices: ActualIndex[] = ixActualArray([0, 1, 2]);
      const result = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(result).toBeUndefined();
    });

    it("should correctly identify a diminished chord", () => {
      const indices: ActualIndex[] = ixActualArray([0, 3, 6]);
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();

      expectChordMatch(actualChordMatch, {
        rootNote: ixActual(0),
        noteGroupingId: NoteGroupingId.Chord_Dim,
        inversionIndex: ixInversion(0),
      });
      const actualChordName = actualChordMatch?.deriveChordName();
      expect(actualChordName).toBe("Cdim");
    });

    it("should correctly identify an augmented chord", () => {
      const indices: ActualIndex[] = ixActualArray([0, 4, 8]);
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();
      expectChordMatch(actualChordMatch, {
        rootNote: ixActual(0),
        noteGroupingId: NoteGroupingId.Chord_Aug,
        inversionIndex: ixInversion(0),
      });
      const actualChordName = actualChordMatch?.deriveChordName();
      expect(actualChordName).toBe("Caug");
    });

    it("should correctly identify a suspended fourth chord", () => {
      const indices: ActualIndex[] = ixActualArray([0, 5, 7]);
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();
      expectChordMatch(actualChordMatch, {
        rootNote: ixActual(0),
        noteGroupingId: NoteGroupingId.Chord_Sus4,
        inversionIndex: ixInversion(0),
      });
      const actualChordName = actualChordMatch?.deriveChordName();
      expect(actualChordName).toBe("Csus4");
    });
    /*

    it("should handle octave equivalence", () => {
      const indices: ActualIndex[] = [0, 4, 19]; // C, E, G (but G is two octaves higher)
      const result = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(result).toEqual({
        definition: expect.objectContaining({ id: NoteGroupingId.Chord_Maj }),
        inversionIndex: 0,
      });
    }); */

    it("should return None for an empty array", () => {
      const indices: ActualIndex[] = ixActualArray([]);
      const result = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(result).toBeDefined();
      expectChordMatch(result, {
        rootNote: ixActual(0),
        noteGroupingId: NoteGroupingId.None,
        inversionIndex: ixInversion(0),
      });
    });

    it("should correctly identify a single note", () => {
      const indices: ActualIndex[] = ixActualArray([0]);
      const result = ChordAndIntervalManager.getMatchFromIndices(indices);
      expectChordMatch(result, {
        rootNote: ixActual(0),
        noteGroupingId: NoteGroupingId.Note,
        inversionIndex: ixInversion(0),
      });
      const actualChordName = result?.deriveChordName();
      //TODO: deal with distinguishing single note C vs. C major chord later
      // expect(actualChordName).toBe("C");
    });

    it("should correctly identify an interval", () => {
      const indices: ActualIndex[] = ixActualArray([0, 7]);
      const result = ChordAndIntervalManager.getMatchFromIndices(indices);
      expectChordMatch(result, {
        rootNote: ixActual(0),
        noteGroupingId: NoteGroupingId.Interval_Fifth,
        inversionIndex: ixInversion(0),
      });
      const actualChordName = result?.deriveChordName();
      //TODO: better text for intervals
      expect(actualChordName).toBe("CPerfect Fifth");
    });
  });
});
