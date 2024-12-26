import { NoteGroupingType } from "./NoteGrouping";
import { NoteGroupingLibrary } from "./NoteGroupingLibrary";

import { IndexUtils } from "../utils/IndexUtils";
import { OffsetIndex } from "./IndexTypes";
import { NoteGroupingId } from "./NoteGroupingTypes";

//note grouping definition, including all inversions
//contains offsets relative to the root note
export class ChordDefinition {
  id: NoteGroupingId;
  inversions: OffsetIndex[][];

  get offsets(): OffsetIndex[] {
    return NoteGroupingLibrary.getNoteGrouping(this.id).offsets;
  }

  get numNotes(): number {
    return this.inversions[0].length;
  }

  constructor(id: NoteGroupingId, root: OffsetIndex[], generateInversions: boolean = false) {
    this.id = id;
    this.inversions = generateInversions ? this.generateInversions(root) : [root];
  }

  getNoteGroupingType(): NoteGroupingType {
    if (this.numNotes === 0) return NoteGroupingType.None;
    if (this.numNotes === 1) return NoteGroupingType.Note;
    if (this.numNotes === 2) return NoteGroupingType.Interval;
    return NoteGroupingType.Chord;
  }

  private generateInversions(rootOffsets: OffsetIndex[]): OffsetIndex[][] {
    const inversions: OffsetIndex[][] = [rootOffsets];
    let currentInversion = [...rootOffsets];
    for (let i = 1; i < rootOffsets.length; i++) {
      let newInversion = IndexUtils.firstNoteToLast(currentInversion);

      inversions.push(newInversion);
      currentInversion = newInversion;
    }
    return inversions;
  }

  hasInversions(): boolean {
    return this.inversions.length > 1;
  }
}
