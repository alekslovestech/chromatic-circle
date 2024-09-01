import { ChordAndIntervalManager } from "../utils/ChordAndIntervalManager";
import { NoteGroupingId } from "../types/NoteGrouping";
import { ActualIndex } from "../types/IndexTypes";
import { ChordMatch } from "../types/ChordMatch";

function expectChordMatch(
  actual: ChordMatch | undefined,
  expected: {
    rootNote: ActualIndex;
    noteGroupingId: NoteGroupingId;
    inversionIndex: number | undefined;
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
      const indices: ActualIndex[] = [0, 4, 7];
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();
      expectChordMatch(actualChordMatch, {
        rootNote: 0,
        noteGroupingId: NoteGroupingId.Chord_Maj,
        inversionIndex: undefined,
      });
    });

    it("should correctly identify a minor chord in root position", () => {
      const indices: ActualIndex[] = [0, 3, 7];
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();
      expectChordMatch(actualChordMatch, {
        rootNote: 0,
        noteGroupingId: NoteGroupingId.Chord_Min,
        inversionIndex: undefined,
      });
      //expect(actualChordMatch?.isEqualTo(0, NoteGroupingId.Chord_Min, undefined)).toBe(true);
    });

    it("should correctly identify a major chord in first inversion [0]", () => {
      const indices: ActualIndex[] = [4, 7, 12];
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();

      expectChordMatch(actualChordMatch, {
        rootNote: 0,
        noteGroupingId: NoteGroupingId.Chord_Maj,
        inversionIndex: 0,
      });
    });

    it("should correctly identify a major chord in second inversion [1]", () => {
      const indices: ActualIndex[] = [7, 12, 16];
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();

      expectChordMatch(actualChordMatch, {
        rootNote: 0,
        noteGroupingId: NoteGroupingId.Chord_Maj,
        inversionIndex: 1,
      });
    });

    it("should correctly identify a dominant seventh chord in root position", () => {
      const indices: ActualIndex[] = [0, 4, 7, 10];
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();

      expectChordMatch(actualChordMatch, {
        rootNote: 0,
        noteGroupingId: NoteGroupingId.Chord_Dom7,
        inversionIndex: undefined,
      });
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
      const indices: ActualIndex[] = [0, 1, 2];
      const result = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(result).toBeUndefined();
    });

    it("should correctly identify a diminished chord", () => {
      const indices: ActualIndex[] = [0, 3, 6];
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();

      expectChordMatch(actualChordMatch, {
        rootNote: 0,
        noteGroupingId: NoteGroupingId.Chord_Dim,
        inversionIndex: undefined,
      });
    });

    it("should correctly identify an augmented chord", () => {
      const indices: ActualIndex[] = [0, 4, 8];
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();
      expectChordMatch(actualChordMatch, {
        rootNote: 0,
        noteGroupingId: NoteGroupingId.Chord_Aug,
        inversionIndex: undefined,
      });
    });

    it("should correctly identify a suspended fourth chord", () => {
      const indices: ActualIndex[] = [0, 5, 7];
      const actualChordMatch = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(actualChordMatch).toBeDefined();
      expectChordMatch(actualChordMatch, {
        rootNote: 0,
        noteGroupingId: NoteGroupingId.Chord_Sus4,
        inversionIndex: undefined,
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

    it("should return undefined for an empty array", () => {
      const indices: ActualIndex[] = [];
      const result = ChordAndIntervalManager.getMatchFromIndices(indices);
      expect(result).toBeUndefined();
    });

    it("should correctly identify a single note", () => {
      const indices: ActualIndex[] = [0];
      const result = ChordAndIntervalManager.getMatchFromIndices(indices);
      expectChordMatch(result, {
        rootNote: 0,
        noteGroupingId: NoteGroupingId.Note,
        inversionIndex: undefined,
      });
    });

    it("should correctly identify an interval", () => {
      const indices: ActualIndex[] = [0, 7];
      const result = ChordAndIntervalManager.getMatchFromIndices(indices);
      expectChordMatch(result, {
        rootNote: 0,
        noteGroupingId: NoteGroupingId.Interval_Fifth,
        inversionIndex: undefined,
      });
    });
  });
});
