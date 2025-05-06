import { IndexUtils } from "../utils/IndexUtils";
import { ixOffsetArray, OffsetIndex } from "./IndexTypes";
import { NoteGroupingId, NoteGroupingType } from "./NoteGroupingTypes";

export class NoteGrouping {
  public readonly inversions: OffsetIndex[][];

  constructor(
    public readonly id: NoteGroupingId,
    public readonly lettersId: string,
    public readonly symbolsId: string,
    public readonly displayName: string,
    public readonly orderId: number,
    public readonly offsets: OffsetIndex[],
    public readonly hasInversions: boolean = false,
    public readonly isVisiblePreset: boolean = true, //is this in the presets list?
  ) {
    // Calculate all possible inversions if this grouping supports them
    this.inversions = this.calculateInversions();
  }

  private calculateInversions(): OffsetIndex[][] {
    const inversions: OffsetIndex[][] = [this.offsets];
    let currentInversion = [...this.offsets];
    for (let i = 1; i < this.offsets.length; i++) {
      let newInversion = ixOffsetArray(IndexUtils.firstNoteToLast(currentInversion));

      inversions.push(newInversion);
      currentInversion = newInversion;
    }
    return inversions;
  }

  get numNotes(): number {
    return this.inversions[0].length;
  }

  getNoteGroupingType(): NoteGroupingType {
    return NoteGrouping.getNoteGroupingTypeFromNumNotes(this.numNotes);
  }

  static getNoteGroupingTypeFromNumNotes(numNotes: number): NoteGroupingType {
    if (numNotes === 0) return NoteGroupingType.None;
    if (numNotes === 1) return NoteGroupingType.Note;
    if (numNotes === 2) return NoteGroupingType.Interval;
    return NoteGroupingType.Chord;
  }

  public static createInterval(
    id: NoteGroupingId,
    orderId: number,
    shortName: string,
    displayName: string,
    semitones: number,
  ): NoteGrouping {
    return new NoteGrouping(
      id,
      shortName,
      shortName,
      displayName,
      orderId,
      ixOffsetArray([0, semitones]),
    );
  }

  public static createChord(
    id: NoteGroupingId,
    orderId: number,
    lettersId: string,
    symbolsId: string,
    displayName: string,
    offsets: number[],
    hasInversions: boolean = true,
    isVisiblePreset: boolean = true,
  ): NoteGrouping {
    return new NoteGrouping(
      id,
      lettersId,
      symbolsId,
      displayName,
      orderId,
      ixOffsetArray(offsets),
      hasInversions,
      isVisiblePreset,
    );
  }
}
