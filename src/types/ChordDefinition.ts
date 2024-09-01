import { NoteGroupingId } from "./NoteGrouping";
import { NoteGroupingType } from "./NoteGrouping";

import { IndexUtils } from "../utils/IndexUtils";
export class ChordDefinition {
  id: NoteGroupingId;
  rootChord: number[];
  inversions: number[][];

  constructor(id: NoteGroupingId, root: number[], generateInversions: boolean = false) {
    this.id = id;
    this.rootChord = root;
    this.inversions = generateInversions ? this.generateInversions() : [];
  }

  isChord(): boolean {
    return this.rootChord.length > 2;
  }
  isInterval(): boolean {
    return this.rootChord.length === 2;
  }

  getNoteGroupingType(): NoteGroupingType {
    return ChordDefinition.getNoteGroupingTypeWithArg(this.rootChord);
  }

  static getNoteGroupingTypeWithArg(selectedNoteIndices: number[]): NoteGroupingType {
    if (selectedNoteIndices.length === 0) return NoteGroupingType.None;
    if (selectedNoteIndices.length === 1) return NoteGroupingType.Note;
    if (selectedNoteIndices.length === 2) return NoteGroupingType.Interval;
    return NoteGroupingType.Chord;
  }

  private generateInversions(): number[][] {
    const inversions: number[][] = [];
    let currentInversion = [...this.rootChord];
    for (let i = 1; i < this.rootChord.length; i++) {
      let newInversion = IndexUtils.firstNoteToLast(currentInversion);

      newInversion = IndexUtils.fitChordToRange(newInversion);
      inversions.push(newInversion);
      currentInversion = newInversion;
    }
    return inversions;
  }

  getInversion(index: number): number[] {
    if (index === 0) return this.rootChord;
    if (index > 0 && index <= this.inversions.length) {
      return this.inversions[index - 1];
    }
    throw new Error(`Invalid inversion index: ${index}`);
  }

  hasInversions(): boolean {
    return this.inversions.length > 0;
  }
}
