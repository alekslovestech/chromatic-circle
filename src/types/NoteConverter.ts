import { ChromaticIndex, ixChromatic } from "../types/ChromaticIndex";
import { AccidentalType } from "./AccidentalType";
import { actualIndexToChromaticAndOctave } from "./IndexTypes";
import { ActualIndex } from "./IndexTypes";
import { KeyNoteResolver } from "./Keys/KeyNoteResolver";

export class NoteConverter {
  // For testing and input - converts text to index
  static toChromaticIndex(note: string): ChromaticIndex {
    const noteMap: { [key: string]: number } = {
      C: 0,
      "C#": 1,
      Db: 1,
      D: 2,
      "D#": 3,
      Eb: 3,
      E: 4,
      F: 5,
      "F#": 6,
      Gb: 6,
      G: 7,
      "G#": 8,
      Ab: 8,
      A: 9,
      "A#": 10,
      Bb: 10,
      B: 11,
    };
    const sanitizedNote = this.sanitizeNoteString(note);
    return ixChromatic(noteMap[sanitizedNote] ?? -1);
  }

  static sanitizeNoteString(noteString: string): string {
    // Convert display symbols to text format
    return noteString.replace(/[♯#]/g, "#").replace(/[♭b]/g, "b").replace(/[♮n]/g, "n");
  }

  // For display - converts index to text
  static fromChromaticIndex(index: ChromaticIndex, preferSharps: boolean = true): string {
    const sharpMap: { [key: number]: string } = {
      0: "C",
      1: "C#",
      2: "D",
      3: "D#",
      4: "E",
      5: "F",
      6: "F#",
      7: "G",
      8: "G#",
      9: "A",
      10: "A#",
      11: "B",
    };
    const flatMap: { [key: number]: string } = {
      0: "C",
      1: "Db",
      2: "D",
      3: "Eb",
      4: "E",
      5: "F",
      6: "Gb",
      7: "G",
      8: "Ab",
      9: "A",
      10: "Bb",
      11: "B",
    };
    return preferSharps ? sharpMap[index] : flatMap[index];
  }

  // Helper for testing - converts array of note names to indices
  static noteArrayToIndices(notes: string[]): ChromaticIndex[] {
    return notes.map((note) => this.toChromaticIndex(note));
  }

  // Helper for testing - converts array of indices to note names
  static indicesToNoteArray(indices: ChromaticIndex[], preferSharps: boolean = true): string[] {
    return indices.map((index) => this.fromChromaticIndex(index, preferSharps));
  }

  static stripAccidentals(note: string): string {
    return note.replace(/[#b]/g, "");
  }

  //accidental string can be in display format, or debug format
  static getAccidentalType(accidentalString: string): AccidentalType {
    switch (accidentalString) {
      case "#":
      case "♯":
        return AccidentalType.Sharp;
      case "b":
      case "♭":
        return AccidentalType.Flat;
      case "n":
      case "♮":
        return AccidentalType.Natural;
      default:
        return AccidentalType.None;
    }
  }

  static getNoteTextFromActualIndex = (
    actualIndex: ActualIndex,
    accidentalPreference: AccidentalType,
  ): string => {
    const { chromaticIndex } = actualIndexToChromaticAndOctave(actualIndex);
    const noteInfo = KeyNoteResolver.resolveAbsoluteNote(chromaticIndex, accidentalPreference);
    return noteInfo.formatNoteNameForDisplay();
  };
}
