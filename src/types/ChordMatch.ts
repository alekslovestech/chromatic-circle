import { ChordDefinition } from "./ChordDefinition";
import { ActualIndex } from "./IndexTypes";
import { NoteGroupingId } from "./NoteGrouping";

export class ChordMatch {
  rootNote: ActualIndex;
  definition: ChordDefinition;
  inversionIndex?: number; //0 is the first inversion (add 1 for display index)

  constructor(rootNote: ActualIndex, definition: ChordDefinition, inversionIndex?: number) {
    this.rootNote = rootNote;
    this.definition = definition;
    this.inversionIndex = inversionIndex;
  }
}
