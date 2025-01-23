// Represents a Roman numeral in a progression
export enum ChordQuality {
  Major = "major",
  Minor = "minor",
  Diminished = "diminished",
  Augmented = "augmented",
  Seventh = "7",
  Major_Seventh = "maj7",
}

export class RomanNumeral {
  numeral: string; // Roman numeral (e.g., "I", "ii", "V")
  quality: ChordQuality; // Chord quality
  degree: number; // Scale degree (1-based index)

  constructor(numeral: string, degree: number, quality: ChordQuality) {
    this.numeral = numeral;
    this.degree = degree;
    this.quality = quality;
  }
}
