import { NoteGroupingId } from "./ChordConstants";
import { TWELVE } from "./NoteConstants";

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

  private generateInversions(): number[][] {
    const inversions: number[][] = [];
    for (let i = 1; i < this.rootChord.length; i++) {
      const inversion = this.rootChord.map((offset) => {
        const newOffset = offset - this.rootChord[i];
        return ((newOffset % TWELVE) + TWELVE) % TWELVE; // Ensure positive values in 0-11 range
      });
      inversions.push(inversion);
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
