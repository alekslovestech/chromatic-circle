import { MusicalKey } from "./Keys/MusicalKey";
import { RomanResolver } from "./RomanResolver";
import { AbsoluteChord } from "./AbsoluteChord";

// Represents a chord progression
export class ChordProgression {
  progression: string[]; // Sequence of Roman numerals
  name: string; // Name of the chord progression (can also remain unnamed)

  constructor(progression: string[], name: string | undefined) {
    this.progression = progression;
    this.name = name || "Unknown"; // Initialize the name of the progression
  }

  // Derive concrete chords from the Roman numerals
  resolvedChords(musicalKey: MusicalKey): AbsoluteChord[] {
    const resolvedChords = this.progression.map((roman) => {
      const absoluteChord = RomanResolver.resolveAsAbsoluteChord(roman, musicalKey);
      return absoluteChord;
    });
    return resolvedChords;
  }
}
