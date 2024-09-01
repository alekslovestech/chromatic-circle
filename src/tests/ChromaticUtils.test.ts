import {
  chromaticToActual,
  actualToChromatic,
  isBlackKey,
  updateIndices,
  calculateChordNotesFromIndex,
  getChordNameFromPreset,
} from "../utils/ChromaticUtils";
import { InputMode } from "../types/InputMode";
import { NoteGroupingId } from "../types/NoteGrouping";
import { Accidental } from "../types/Accidental";
import { ActualIndex, ChromaticIndex, OctaveOffset } from "../types/IndexTypes";
import { getNoteTextFromIndex } from "../utils/NoteNameUtils";

describe("ChromaticUtils", () => {
  describe("chromaticToActual", () => {
    it("should convert chromatic index and octave offset to actual index", () => {
      expect(chromaticToActual(0 as ChromaticIndex, 0 as OctaveOffset)).toBe(0);
      expect(chromaticToActual(11 as ChromaticIndex, 0 as OctaveOffset)).toBe(11);
      expect(chromaticToActual(0 as ChromaticIndex, 1 as OctaveOffset)).toBe(12);
      expect(chromaticToActual(11 as ChromaticIndex, 1 as OctaveOffset)).toBe(23);
    });
  });

  describe("actualToChromatic", () => {
    it("should convert actual index to chromatic index and octave offset", () => {
      expect(actualToChromatic(0 as ActualIndex)).toEqual({ chromaticIndex: 0, octaveOffset: 0 });
      expect(actualToChromatic(11 as ActualIndex)).toEqual({ chromaticIndex: 11, octaveOffset: 0 });
      expect(actualToChromatic(12 as ActualIndex)).toEqual({ chromaticIndex: 0, octaveOffset: 1 });
      expect(actualToChromatic(23 as ActualIndex)).toEqual({ chromaticIndex: 11, octaveOffset: 1 });
    });
  });

  describe("isBlackKey", () => {
    it("should return true for black keys", () => {
      expect(isBlackKey(1 as ActualIndex)).toBe(true);
      expect(isBlackKey(3 as ActualIndex)).toBe(true);
      expect(isBlackKey(6 as ActualIndex)).toBe(true);
      expect(isBlackKey(8 as ActualIndex)).toBe(true);
      expect(isBlackKey(10 as ActualIndex)).toBe(true);
    });

    it("should return false for white keys", () => {
      expect(isBlackKey(0 as ActualIndex)).toBe(false);
      expect(isBlackKey(2 as ActualIndex)).toBe(false);
      expect(isBlackKey(4 as ActualIndex)).toBe(false);
      expect(isBlackKey(5 as ActualIndex)).toBe(false);
      expect(isBlackKey(7 as ActualIndex)).toBe(false);
      expect(isBlackKey(9 as ActualIndex)).toBe(false);
      expect(isBlackKey(11 as ActualIndex)).toBe(false);
    });
  });

  describe("updateIndices", () => {
    it("should toggle notes in Toggle mode", () => {
      const result = updateIndices(
        InputMode.Toggle,
        NoteGroupingId.Note,
        [0, 4, 7] as ActualIndex[],
        4 as ActualIndex,
      );
      expect(result).toEqual([0, 7]);
    });

    it("should return single note in SingleNote mode", () => {
      const result = updateIndices(
        InputMode.SingleNote,
        NoteGroupingId.Note,
        [0, 4, 7] as ActualIndex[],
        2 as ActualIndex,
      );
      expect(result).toEqual([2]);
    });

    it("should return chord notes in ChordPresets mode", () => {
      const result = updateIndices(
        InputMode.ChordPresets,
        NoteGroupingId.Chord_Maj,
        [0, 4, 7] as ActualIndex[],
        2 as ActualIndex,
      );
      expect(result).toEqual([2, 6, 9]);
    });
  });

  describe("calculateChordNotesFromIndex", () => {
    it("should calculate correct notes for major chord", () => {
      const result = calculateChordNotesFromIndex(0 as ActualIndex, NoteGroupingId.Chord_Maj);
      expect(result).toEqual([0, 4, 7]);
    });

    it("should calculate correct notes for minor chord", () => {
      const result = calculateChordNotesFromIndex(0 as ActualIndex, NoteGroupingId.Chord_Min);
      expect(result).toEqual([0, 3, 7]);
    });
  });

  describe("getNoteTextFromIndex", () => {
    it("should return correct note text for C", () => {
      expect(getNoteTextFromIndex(0 as ActualIndex, Accidental.Sharp)).toBe("C");
    });

    it("should return correct note text for C# with sharp preference", () => {
      expect(getNoteTextFromIndex(1 as ActualIndex, Accidental.Sharp)).toBe("C♯");
    });

    it("should return correct note text for Db with flat preference", () => {
      expect(getNoteTextFromIndex(1 as ActualIndex, Accidental.Flat)).toBe("D♭");
    });
  });

  describe("getChordName", () => {
    it("should return correct chord name for major chord", () => {
      expect(
        getChordNameFromPreset(0 as ActualIndex, NoteGroupingId.Chord_Maj, Accidental.Sharp),
      ).toBe("C");
    });

    it("should return correct chord name for minor chord", () => {
      expect(
        getChordNameFromPreset(2 as ActualIndex, NoteGroupingId.Chord_Min, Accidental.Sharp),
      ).toBe("Dm");
    });

    it("should return only note name for single note", () => {
      expect(getChordNameFromPreset(4 as ActualIndex, NoteGroupingId.Note, Accidental.Sharp)).toBe(
        "E",
      );
    });

    it("should return correct chord for diminished chord", () => {
      expect(
        getChordNameFromPreset(4 as ActualIndex, NoteGroupingId.Chord_Dim, Accidental.Sharp),
      ).toBe("Edim");
    });
  });
});
