import { ActualIndex, InversionIndex, ixInversion } from "./IndexTypes";
import { NoteGrouping } from "./NoteGrouping";

export class ChordMatch {
  constructor(
    public rootNote: ActualIndex,
    public definition: NoteGrouping,
    public inversionIndex: InversionIndex = ixInversion(0),
  ) {}
}
