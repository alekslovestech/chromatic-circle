import { ActualIndex, InversionIndex, ixInversion } from "./IndexTypes";
import { NoteGrouping } from "./NoteGrouping";

export interface ChordMatch {
  rootNote: ActualIndex;
  definition: NoteGrouping;
  inversionIndex: InversionIndex;
}
