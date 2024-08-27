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
