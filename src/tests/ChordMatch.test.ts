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
    it('should return "No notes selected" for empty array', () => {
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices([]);
      expect(actualChordMatch).toBeDefined();
      expectChordMatch(actualChordMatch, {
        rootNote: ixActual(0),
        noteGroupingId: "None",
        inversionIndex: ixInversion(0),
      });
    });

    it("should correctly identify a major chord in root position", () => {
      const indices = ixActualArray([0, 4, 7]);
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();
      expectChordMatch(actualChordMatch, {
        rootNote: ixActual(0),
        noteGroupingId: "Chord_Maj",
        inversionIndex: ixInversion(0),
      });
    });

    it("should correctly identify a minor chord in root position", () => {
      const indices = ixActualArray([0, 3, 7]);
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();
      expectChordMatch(actualChordMatch, {
        rootNote: ixActual(0),
        noteGroupingId: "Chord_Min",
        inversionIndex: ixInversion(0),
      });
    });

    it("should correctly identify Dm", () => {
      const indices = ixActualArray([2, 5, 9]);
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();
      expectChordMatch(actualChordMatch, {
        rootNote: ixActual(2),
        noteGroupingId: "Chord_Min",
        inversionIndex: ixInversion(0),
      });
    });

    it("should correctly identify a C♯/D♭ major ", () => {
      const indices = ixActualArray([1, 5, 8]);
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();
      expectChordMatch(actualChordMatch, {
        rootNote: ixActual(1),
        noteGroupingId: "Chord_Maj",
        inversionIndex: ixInversion(0),
      });
    });

    it("should correctly identify a major chord in first inversion [1]", () => {
      const indices = ixActualArray([4, 7, 12]);
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();

      expectChordMatch(actualChordMatch, {
        rootNote: ixActual(0),
        noteGroupingId: "Chord_Maj",
        inversionIndex: ixInversion(1),
      });
    });

    it("should correctly identify a major chord in second inversion [2]", () => {
      const indices = ixActualArray([7, 12, 16]);
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();

      expectChordMatch(actualChordMatch, {
        rootNote: ixActual(0),
        noteGroupingId: "Chord_Maj",
        inversionIndex: ixInversion(2),
      });
    });

    it("should correctly identify a dominant seventh chord in root position", () => {
      const indices = ixActualArray([0, 4, 7, 10]);
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();

      expectChordMatch(actualChordMatch, {
        rootNote: ixActual(0),
        noteGroupingId: "Chord_Dom7",
        inversionIndex: ixInversion(0),
      });
    });

    it("should correctly identify a major seventh chord in third inversion", () => {
      const indices = ixActualArray([11, 12, 16, 19]);
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();

      expectChordMatch(actualChordMatch, {
        rootNote: ixActual(0),
        noteGroupingId: "Chord_Maj7",
        inversionIndex: ixInversion(3),
      });
    });

    it("should return undefined for an unrecognized chord", () => {
      const indices = ixActualArray([0, 1, 2]);
      const result = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(result).toBeUndefined();
    });

    it("should correctly identify a diminished chord", () => {
      const indices = ixActualArray([0, 3, 6]);
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();

      expectChordMatch(actualChordMatch, {
        rootNote: ixActual(0),
        noteGroupingId: "Chord_Dim",
        inversionIndex: ixInversion(0),
      });
    });

    it("should correctly identify an augmented chord", () => {
      const indices = ixActualArray([0, 4, 8]);
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();
      expectChordMatch(actualChordMatch, {
        rootNote: ixActual(0),
        noteGroupingId: "Chord_Aug",
        inversionIndex: ixInversion(0),
      });
    });

    it("should correctly identify a suspended fourth chord", () => {
      const indices = ixActualArray([0, 5, 7]);
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();
      expectChordMatch(actualChordMatch, {
        rootNote: ixActual(0),
        noteGroupingId: "Chord_Sus4",
        inversionIndex: ixInversion(0),
      });
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
      const indices = ixActualArray([]);
      const result = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(result).toBeDefined();
      expectChordMatch(result, {
        rootNote: ixActual(0),
        noteGroupingId: "None",
        inversionIndex: ixInversion(0),
      });
    });

    it("should correctly identify a single note", () => {
      const indices: ActualIndex[] = ixActualArray([0]);
      const result = ChordAndIntervalManager.getMatchFromIndices(indices);
      expectChordMatch(result, {
        rootNote: ixActual(0),
        noteGroupingId: "Note",
        inversionIndex: ixInversion(0),
      });
    });

    it("should correctly identify an interval", () => {
      const indices = ixActualArray([0, 7]);
      const result = ChordAndIntervalManager.getMatchFromIndices(indices);
      expectChordMatch(result, {
        rootNote: ixActual(0),
        noteGroupingId: "Interval_Fifth",
        inversionIndex: ixInversion(0),
      });
    });
  });
});
