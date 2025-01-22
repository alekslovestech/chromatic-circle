// Represents a musical key (e.g., C major, A minor)
export class MusicalKey {
  tonic: string; // Root note (e.g., "C", "A")
  mode: "major" | "minor"; // Major or minor scale
  notes: string[]; // Notes in the key (e.g., ["C", "D", "E", "F", "G", "A", "B"])

  constructor(tonic: string, mode: "major" | "minor") {
    this.tonic = tonic;
    this.mode = mode;
    this.notes = this.generateScale();
  }

  // Generate the scale based on the key's tonic and mode
  private generateScale(): string[] {
    const majorPattern = [2, 2, 1, 2, 2, 2, 1];
    const minorPattern = [2, 1, 2, 2, 1, 2, 2];
    const allNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    const pattern = this.mode === "major" ? majorPattern : minorPattern;
    let startIndex = allNotes.indexOf(this.tonic);
    let scale = [this.tonic];

    for (let step of pattern) {
      startIndex = (startIndex + step) % allNotes.length;
      scale.push(allNotes[startIndex]);
    }
    return scale;
  }
}
