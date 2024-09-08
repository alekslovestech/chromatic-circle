import { ChordDisplayMode } from "./ChordDisplayMode";

export enum NoteGroupingType {
  None = "None",
  Note = "Note",
  Interval = "Interval",
  Chord = "Chord",
}

export interface NoteGroupingName {
  noteGrouping: NoteGroupingType;
  name: string;
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
  Interval_Min2: { longId: "Minor 2nd", shortId: "m2", displayName: "Minor 2nd" },
  Interval_Maj2: { longId: "Major 2nd", shortId: "M2", displayName: "Major 2nd" },
  Interval_Min3: { longId: "Minor 3rd", shortId: "m3", displayName: "Minor 3rd" },
  Interval_Maj3: { longId: "Major 3rd", shortId: "M3", displayName: "Major 3rd" },
  Interval_Fourth: { longId: "Perfect 4th", shortId: "P4", displayName: "Perfect 4th" },
  Interval_Tritone: { longId: "Tritone", shortId: "TT", displayName: "Tritone" },
  Interval_Fifth: { longId: "Perfect 5th", shortId: "P5", displayName: "Perfect 5th" },
  Interval_Min6: { longId: "Minor 6th", shortId: "m6", displayName: "Minor 6th" },
  Interval_Maj6: { longId: "Major 6th", shortId: "M6", displayName: "Major 6th" },
  Interval_Min7: { longId: "Minor 7th", shortId: "m7", displayName: "Minor 7th" },
  Interval_Maj7: { longId: "Major 7th", shortId: "M7", displayName: "Major 7th" },
  Interval_Octave: { longId: "Octave", shortId: "Oct", displayName: "Octave" },

  //3 note chords
  Chord_Maj: { longId: "", shortId: "", displayName: "Major" },
  Chord_Min: { longId: "m", shortId: "m", displayName: "Minor" },
  Chord_Dim: { longId: "dim", shortId: "°", displayName: "Dim" },
  Chord_Aug: { longId: "aug", shortId: "+", displayName: "Aug" },
  Chord_Sus4: { longId: "sus4", shortId: "sus4", displayName: "Sus 4" },
  Chord_Sus2: { longId: "sus2", shortId: "sus2", displayName: "Sus 2" },

  //4 note chords
  Chord_Maj7: { longId: "maj7", shortId: "Δ7", displayName: "Maj 7th" },
  Chord_Min7: { longId: "min7", shortId: "m7", displayName: "Min 7th" },
  Chord_Dom7: { longId: "dom7", shortId: "7", displayName: "Dom 7th" },
  Chord_Dim7: { longId: "dim7", shortId: "°7", displayName: "Dim 7th" },
  Chord_MMaj7: { longId: "MMaj", shortId: "mΔ7", displayName: "Min /Maj 7th" },
  Chord_M7b5: { longId: "m7b5", shortId: "ø", displayName: "Half Dim 7th" },

  Chord_Add9: { longId: "add9", shortId: "add9", displayName: "Add 9th" },
  Chord_Six: { longId: "6th", shortId: "6", displayName: "6th" },
  Chord_Min6: { longId: "min6", shortId: "m6", displayName: "Min 6th" },
};

export type NoteGroupingId = (typeof NoteGroupings)[keyof typeof NoteGroupings]["longId"];

export const getId = (key: string, chordDisplayMode: ChordDisplayMode): string => {
  return chordDisplayMode === ChordDisplayMode.Abbreviated
    ? NoteGroupings[key]?.shortId || ""
    : NoteGroupings[key]?.longId || "";
};

export const getDisplayName = (key: string): string => {
  return NoteGroupings[key]?.displayName || "";
};
