import { TWELVE } from "./NoteConstants";

export class ChordDefinition {
  root: number[];
  inversions: number[][];
  name: string;

  constructor(
    root: number[],
    name: string,
    generateInversions: boolean = false
  ) {
    this.root = root;
    this.name = name;
    this.inversions = generateInversions ? this.generateInversions() : [];
  }

  private generateInversions(): number[][] {
    const inversions: number[][] = [];
    for (let i = 1; i < this.root.length; i++) {
      const inversion = this.root.map((offset) => {
        const newOffset = offset - this.root[i];
        return ((newOffset % TWELVE) + TWELVE) % TWELVE; // Ensure positive values in 0-11 range
      });
      inversions.push(inversion);
    }
    return inversions;
  }

  getInversion(index: number): number[] {
    if (index === 0) return this.root;
    if (index > 0 && index <= this.inversions.length) {
      return this.inversions[index - 1];
    }
    throw new Error(`Invalid inversion index: ${index}`);
  }

  hasInversions(): boolean {
    return this.inversions.length > 0;
  }
}
