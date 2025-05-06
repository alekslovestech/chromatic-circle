import { ActualIndex, InversionIndex } from "./IndexTypes";
import { NoteGrouping } from "./NoteGrouping";

export interface IChordMatch {
  rootNote: ActualIndex;
  definition: NoteGrouping;
  inversionIndex: InversionIndex;
}
