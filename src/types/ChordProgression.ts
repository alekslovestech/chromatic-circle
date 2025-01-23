import { MusicalKey } from "./MusicalKey";
import { RomanNumeral } from "./RomanNumeral";

// Represents a chord progression
export class ChordProgression {
  musicalKey: MusicalKey; // The key of the progression
  progression: RomanNumeral[]; // Sequence of Roman numerals
  name: string; // Name of the chord progression (can also remain unnamed)

  constructor(musicalKey: MusicalKey, progression: RomanNumeral[], name: string | undefined) {
    this.musicalKey = musicalKey;
    this.progression = progression;
    this.name = name || "Unknown"; // Initialize the name of the progression
  }

  // Derive concrete chords from the Roman numerals
  deriveChords(): string[] {
    return this.progression.map((romanNumeral) => {
      const note = this.musicalKey.notes[(romanNumeral.degree - 1) % this.musicalKey.notes.length];
      return `${note} (${romanNumeral.quality})`;
    });
  }
}
