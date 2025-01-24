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
  resolvedChords(): string[] {
    const resolvedChords = this.progression.map((roman) => {
      const resolvedChordQuality = roman.getResolvedChordQuality(this.musicalKey);
      return resolvedChordQuality.getString();
    });
    return resolvedChords;
  }
}
