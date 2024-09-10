import { ChordDisplayMode } from "./ChordDisplayMode";

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
}

export const NoteGroupings: { [key: string]: NoteGroupingInfo } = {
  None: { lettersId: "Ø", symbolsId: "Ø", displayName: "None", orderId: 0 },

  Note: { lettersId: "", symbolsId: "", displayName: "Single Note", orderId: 1 },

  //2 note intervals
  Interval_Min2: { lettersId: "m2", symbolsId: "m2", displayName: "Minor 2nd", orderId: 2 },
  Interval_Maj2: { lettersId: "M2", symbolsId: "M2", displayName: "Major 2nd", orderId: 3 },
  Interval_Min3: { lettersId: "m3", symbolsId: "m3", displayName: "Minor 3rd", orderId: 4 },
  Interval_Maj3: { lettersId: "M3", symbolsId: "M3", displayName: "Major 3rd", orderId: 5 },
  Interval_Fourth: { lettersId: "P4", symbolsId: "P4", displayName: "Perfect 4th", orderId: 6 },
  Interval_Tritone: { lettersId: "Tritone", symbolsId: "TT", displayName: "Tritone", orderId: 7 },
  Interval_Fifth: { lettersId: "P5", symbolsId: "P5", displayName: "Perfect 5th", orderId: 8 },
  Interval_Min6: { lettersId: "m6", symbolsId: "m6", displayName: "Minor 6th", orderId: 9 },
  Interval_Maj6: { lettersId: "M6", symbolsId: "M6", displayName: "Major 6th", orderId: 10 },
  Interval_Min7: { lettersId: "m7", symbolsId: "m7", displayName: "Minor 7th", orderId: 11 },
  Interval_Maj7: { lettersId: "M7", symbolsId: "M7", displayName: "Major 7th", orderId: 12 },
  Interval_Octave: { lettersId: "Octave", symbolsId: "Oct", displayName: "Octave", orderId: 13 },

  //3 note chords
  Chord_Maj: { lettersId: "maj", symbolsId: "", displayName: "Major Chord", orderId: 14 },
  Chord_Min: { lettersId: "min", symbolsId: "m", displayName: "Minor Chord", orderId: 15 },
  Chord_Dim: { lettersId: "dim", symbolsId: "°", displayName: "Diminished Chord", orderId: 16 },
  Chord_Aug: { lettersId: "aug", symbolsId: "+", displayName: "Augmented Chord", orderId: 17 },
  Chord_Sus4: {
    lettersId: "sus4",
    symbolsId: "sus4",
    displayName: "Suspended 4th Chord",
    orderId: 18,
  },
  Chord_Sus2: {
    lettersId: "sus2",
    symbolsId: "sus2",
    displayName: "Suspended 2nd Chord",
    orderId: 19,
  },
  Chord_Six: { lettersId: "6", symbolsId: "6", displayName: "Major 6th Chord", orderId: 20 },
  Chord_Min6: { lettersId: "m6", symbolsId: "m6", displayName: "Minor 6th Chord", orderId: 21 },

  //4 note chords
  Chord_Dom7: { lettersId: "dom7", symbolsId: "7", displayName: "Dominant 7th Chord", orderId: 22 },
  Chord_Maj7: { lettersId: "maj7", symbolsId: "Δ7", displayName: "Major 7th Chord", orderId: 23 },

  Chord_Min7: { lettersId: "min7", symbolsId: "m7", displayName: "Minor 7th Chord", orderId: 24 },

  Chord_MMaj7: {
    lettersId: "mMaj",
    symbolsId: "mΔ7",
    displayName: "Minor Major 7th Chord",
    orderId: 25,
  },
  Chord_Dim7: {
    lettersId: "dim7",
    symbolsId: "°7",
    displayName: "Diminished 7th Chord",
    orderId: 26,
  },
  Chord_M7b5: {
    lettersId: "m7b5",
    symbolsId: "ø7",
    displayName: "Half Diminished 7th Chord",
    orderId: 27,
  },

  Chord_Add9: { lettersId: "add9", symbolsId: "add9", displayName: "Add 9th Chord", orderId: 28 },
};

export type NoteGroupingId = string;

export const getId = (key: string, chordDisplayMode: ChordDisplayMode): string => {
  switch (chordDisplayMode) {
    case ChordDisplayMode.Letters_Long:
      return NoteGroupings[key]?.lettersId || "";
    case ChordDisplayMode.Symbols:
      return NoteGroupings[key]?.symbolsId || "";
    case ChordDisplayMode.Letters_Short:
      const lettersId = NoteGroupings[key]?.lettersId || "";
      const displayId = lettersId === "min" ? "m" : lettersId === "maj" ? "" : lettersId;
      console.log("lettersId", lettersId, "displayId", displayId);
      return displayId;
    case ChordDisplayMode.DisplayName:
      return NoteGroupings[key]?.displayName || "";
  }
};
/*
export const getDisplayName = (key: string): string => {
  return NoteGroupings[key]?.displayName || "";
}; */
