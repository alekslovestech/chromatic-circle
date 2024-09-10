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
}

const NoteGroupings: { [key: string]: NoteGroupingInfo } = {
  None: { lettersId: "Ø", symbolsId: "Ø", displayName: "None" },

  Note: { lettersId: "", symbolsId: "", displayName: "Single Note" },

  //2 note intervals
  Interval_Min2: { lettersId: "m2", symbolsId: "m2", displayName: "Minor 2nd" },
  Interval_Maj2: { lettersId: "M2", symbolsId: "M2", displayName: "Major 2nd" },
  Interval_Min3: { lettersId: "m3", symbolsId: "m3", displayName: "Minor 3rd" },
  Interval_Maj3: { lettersId: "M3", symbolsId: "M3", displayName: "Major 3rd" },
  Interval_Fourth: { lettersId: "P4", symbolsId: "P4", displayName: "Perfect 4th" },
  Interval_Tritone: { lettersId: "Tritone", symbolsId: "TT", displayName: "Tritone" },
  Interval_Fifth: { lettersId: "P5", symbolsId: "P5", displayName: "Perfect 5th" },
  Interval_Min6: { lettersId: "m6", symbolsId: "m6", displayName: "Minor 6th" },
  Interval_Maj6: { lettersId: "M6", symbolsId: "M6", displayName: "Major 6th" },
  Interval_Min7: { lettersId: "m7", symbolsId: "m7", displayName: "Minor 7th" },
  Interval_Maj7: { lettersId: "M7", symbolsId: "M7", displayName: "Major 7th" },
  Interval_Octave: { lettersId: "Octave", symbolsId: "Oct", displayName: "Octave" },

  //3 note chords
  Chord_Maj: { lettersId: "maj", symbolsId: "", displayName: "Major Chord" },
  Chord_Min: { lettersId: "min", symbolsId: "m", displayName: "Minor Chord" },
  Chord_Dim: { lettersId: "dim", symbolsId: "°", displayName: "Diminished Chord" },
  Chord_Aug: { lettersId: "aug", symbolsId: "+", displayName: "Augmented Chord" },
  Chord_Sus4: { lettersId: "sus4", symbolsId: "sus4", displayName: "Suspended 4th Chord" },
  Chord_Sus2: { lettersId: "sus2", symbolsId: "sus2", displayName: "Suspended 2nd Chord" },

  //4 note chords
  Chord_Dom7: { lettersId: "dom7", symbolsId: "7", displayName: "Dominant 7th Chord" },
  Chord_Maj7: { lettersId: "maj7", symbolsId: "Δ7", displayName: "Major 7th Chord" },

  Chord_MMaj7: { lettersId: "mMaj", symbolsId: "mΔ7", displayName: "Minor Major 7th Chord" },
  Chord_Min7: { lettersId: "min7", symbolsId: "m7", displayName: "Minor 7th Chord" },

  Chord_M7b5: { lettersId: "m7b5", symbolsId: "ø7", displayName: "Half Diminished 7th Chord" },
  Chord_Dim7: { lettersId: "dim7", symbolsId: "°7", displayName: "Diminished 7th Chord" },

  Chord_Add9: { lettersId: "add9", symbolsId: "add9", displayName: "Add 9th Chord" },
  Chord_Six: { lettersId: "6", symbolsId: "6", displayName: "Major 6th Chord" },
  Chord_Min6: { lettersId: "m6", symbolsId: "m6", displayName: "Minor 6th Chord" },
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
