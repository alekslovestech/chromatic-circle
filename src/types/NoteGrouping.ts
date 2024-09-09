import { ChordDisplayMode } from "./ChordDisplayMode";

export enum NoteGroupingType {
  None = "None",
  Note = "Note",
  Interval = "Interval",
  Chord = "Chord",
}

export interface NoteGroupingInfo {
  longId: string;
  shortId: string;
  displayName: string;
}

export const NoteGroupings: { [key: string]: NoteGroupingInfo } = {
  None: { longId: "Ø", shortId: "Ø", displayName: "None" },

  Note: { longId: "(note)", shortId: "Note", displayName: "Single Note" },

  //2 note intervals
  Interval_Min2: { longId: "m2", shortId: "m2", displayName: "Minor 2nd" },
  Interval_Maj2: { longId: "M2", shortId: "M2", displayName: "Major 2nd" },
  Interval_Min3: { longId: "m3", shortId: "m3", displayName: "Minor 3rd" },
  Interval_Maj3: { longId: "M3", shortId: "M3", displayName: "Major 3rd" },
  Interval_Fourth: { longId: "P4", shortId: "P4", displayName: "Perfect 4th" },
  Interval_Tritone: { longId: "Tritone", shortId: "TT", displayName: "Tritone" },
  Interval_Fifth: { longId: "P5", shortId: "P5", displayName: "Perfect 5th" },
  Interval_Min6: { longId: "m6", shortId: "m6", displayName: "Minor 6th" },
  Interval_Maj6: { longId: "M6", shortId: "M6", displayName: "Major 6th" },
  Interval_Min7: { longId: "m7", shortId: "m7", displayName: "Minor 7th" },
  Interval_Maj7: { longId: "M7", shortId: "M7", displayName: "Major 7th" },
  Interval_Octave: { longId: "Octave", shortId: "Oct", displayName: "Octave" },

  //3 note chords
  Chord_Maj: { longId: "maj", shortId: "", displayName: "Major Chord" },
  Chord_Min: { longId: "min", shortId: "m", displayName: "Minor Chord" },
  Chord_Dim: { longId: "dim", shortId: "°", displayName: "Diminished Chord" },
  Chord_Aug: { longId: "aug", shortId: "+", displayName: "Augmented Chord" },
  Chord_Sus4: { longId: "sus4", shortId: "sus4", displayName: "Suspended 4th Chord" },
  Chord_Sus2: { longId: "sus2", shortId: "sus2", displayName: "Suspended 2nd Chord" },

  //4 note chords
  Chord_Maj7: { longId: "maj7", shortId: "Δ7", displayName: "Major 7th Chord" },
  Chord_Min7: { longId: "min7", shortId: "m7", displayName: "Minor 7th Chord" },
  Chord_Dom7: { longId: "dom7", shortId: "7", displayName: "Dominant 7th Chord" },
  Chord_Dim7: { longId: "dim7", shortId: "°7", displayName: "Diminished 7th Chord" },
  Chord_MMaj7: { longId: "mMaj", shortId: "mΔ7", displayName: "Minor Major 7th Chord" },
  Chord_M7b5: { longId: "m7b5", shortId: "ø7", displayName: "Half Diminished 7th Chord" },

  Chord_Add9: { longId: "add9", shortId: "add9", displayName: "Add 9th Chord" },
  Chord_Six: { longId: "6", shortId: "6", displayName: "Major 6th Chord" },
  Chord_Min6: { longId: "m6", shortId: "m6", displayName: "Minor 6th Chord" },
};

export type NoteGroupingId = string;

export const getId = (key: string, chordDisplayMode: ChordDisplayMode): string => {
  return chordDisplayMode === ChordDisplayMode.Abbreviated
    ? NoteGroupings[key]?.shortId || ""
    : NoteGroupings[key]?.longId || "";
};

export const getDisplayName = (key: string): string => {
  return NoteGroupings[key]?.displayName || "";
};
