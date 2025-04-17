import { ActualIndex, InversionIndex, ixInversion } from "./IndexTypes";
import { NoteGrouping } from "./NoteGrouping";

export interface IChordMatch {
  rootNote: ActualIndex;
  definition: NoteGrouping;
  inversionIndex: InversionIndex;
}
