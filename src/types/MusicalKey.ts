import { noteTextToIndex } from "../utils/NoteUtils";
import { ChromaticIndex, ixChromatic } from "./IndexTypes"; // Represents a musical key (e.g., C major, A minor)
export class MusicalKey {
  tonic: ChromaticIndex; // Root note (e.g., "C", "A")
  mode: "major" | "minor"; // Major or minor scale
  //notes: ChromaticIndex[]; // Notes in the key (e.g., ["C", "D", "E", "F", "G", "A", "B"])

  constructor(tonicAsString: string, mode: "major" | "minor") {
    this.tonic = noteTextToIndex(tonicAsString);
    this.mode = mode;
    //this.notes = this.generateScale();
  }

  /*
  constructor(tonic: ChromaticIndex, mode: "major" | "minor") {
    this.tonic = tonic;
    this.mode = mode;
    //this.notes = this.generateScale();
  }
  */

  generateIndexArray(): ChromaticIndex[] {
    const majorPattern: number[] = [0, 2, 4, 5, 7, 9, 11]; // Offsets for major scale
    const minorPattern: number[] = [0, 2, 3, 5, 7, 8, 10]; // Offsets for minor scale
    const tonicIndex = this.tonic; // Get the tonic index
    const offsetScale = this.mode === "major" ? majorPattern : minorPattern;
    return offsetScale.map((index) => ixChromatic((index + tonicIndex) % 12)); // Offset the scale by tonic in a wraparound fashion
  }

  // Generate the scale based on the key's tonic and mode
  /*private generateScale(): string[] {
    const indexArray = this.generateIndexArray();
    const allNotes = ixChromaticArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    let startIndex = allNotes.indexOf(this.tonic);
    let scale = [this.tonic];

    for (let index of indexArray) {
      startIndex = (startIndex + index) % allNotes.length;
      scale.push(allNotes[startIndex]);
    }
    return scale;
  } */
}
