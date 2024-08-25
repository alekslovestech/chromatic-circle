import { Accidental } from "./Accidental";

export const TWELVE = 12; //the magic number

export const getNotesArray = (preference: Accidental) =>
  preference === Accidental.Flat ? NOTES_WITH_FLAT : NOTES_WITH_SHARP;

const NOTES_WITH_SHARP = [
  { noteName: "C", accidental: Accidental.None },
  { noteName: "C", accidental: Accidental.Sharp },
  { noteName: "D", accidental: Accidental.None },
  { noteName: "D", accidental: Accidental.Sharp },
  { noteName: "E", accidental: Accidental.None },
  { noteName: "F", accidental: Accidental.None },
  { noteName: "F", accidental: Accidental.Sharp },
  { noteName: "G", accidental: Accidental.None },
  { noteName: "G", accidental: Accidental.Sharp },
  { noteName: "A", accidental: Accidental.None },
  { noteName: "A", accidental: Accidental.Sharp },
  { noteName: "B", accidental: Accidental.None },
];

const NOTES_WITH_FLAT = [
  { noteName: "C", accidental: Accidental.None },
  { noteName: "D", accidental: Accidental.Flat },
  { noteName: "D", accidental: Accidental.None },
  { noteName: "E", accidental: Accidental.Flat },
  { noteName: "E", accidental: Accidental.None },
  { noteName: "F", accidental: Accidental.None },
  { noteName: "G", accidental: Accidental.Flat },
  { noteName: "G", accidental: Accidental.None },
  { noteName: "A", accidental: Accidental.Flat },
  { noteName: "A", accidental: Accidental.None },
  { noteName: "B", accidental: Accidental.Flat },
  { noteName: "B", accidental: Accidental.None },
];
