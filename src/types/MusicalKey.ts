import { noteTextToIndex } from "../utils/NoteUtils";
import { AccidentalType } from "./AccidentalType";
import { ChromaticIndex, ixChromatic } from "./IndexTypes"; // Represents a musical key (e.g., C major, A minor)

export enum KeyType {
  Major,
  Minor,
}

export class MusicalKey {
  tonic: ChromaticIndex; // Root note (e.g., "C", "A")
  mode: KeyType; // Major or minor scale

  constructor(tonicAsString: string, mode: KeyType) {
    this.tonic = noteTextToIndex(tonicAsString);
    this.mode = mode;
  }

  generateIndexArray(): ChromaticIndex[] {
    const majorPattern: number[] = [0, 2, 4, 5, 7, 9, 11]; // Offsets for major scale
    const minorPattern: number[] = [0, 2, 3, 5, 7, 8, 10]; // Offsets for minor scale
    const tonicIndex = this.tonic; // Get the tonic index
    const offsetScale = this.mode === KeyType.Major ? majorPattern : minorPattern;
    return offsetScale.map((index) => ixChromatic((index + tonicIndex) % 12)); // Offset the scale by tonic in a wraparound fashion
  }

  getDefaultAccidental(): AccidentalType {
    const sharpMajorKeys = [7, 2, 9, 4, 11, 6, 1]; // G, D, A, E, B, F#, C#
    const sharpMinorKeys = [4, 11, 6, 1, 8, 3, 10]; // E, B, F#, C#, G#, D#, A#

    const defaultAccidentalKeys = this.mode === KeyType.Major ? sharpMajorKeys : sharpMinorKeys;
    return defaultAccidentalKeys.includes(this.tonic) ? AccidentalType.Sharp : AccidentalType.Flat;
  }
}
