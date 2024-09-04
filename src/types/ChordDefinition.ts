import { NoteGroupingId } from "./NoteGrouping";
import { NoteGroupingType } from "./NoteGrouping";

import { IndexUtils } from "../utils/IndexUtils";
import { OffsetIndex } from "./IndexTypes";

//note grouping definition, including all inversions
//contains offsets relative to the root note
export class ChordDefinition {
  id: NoteGroupingId;
  inversions: OffsetIndex[][];
  get rootChord(): OffsetIndex[] {
    return this.inversions[0];
  }

  constructor(id: NoteGroupingId, root: OffsetIndex[], generateInversions: boolean = false) {
    this.id = id;
    this.inversions = generateInversions ? this.generateInversions(root) : [root];
  }

  isChord(): boolean {
    return this.rootChord.length > 2;
  }
  isInterval(): boolean {
    return this.rootChord.length === 2;
  }

  getNoteGroupingType(): NoteGroupingType {
    if (this.rootChord.length === 0) return NoteGroupingType.None;
    if (this.rootChord.length === 1) return NoteGroupingType.Note;
    if (this.rootChord.length === 2) return NoteGroupingType.Interval;
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
