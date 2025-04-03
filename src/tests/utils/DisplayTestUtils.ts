import { ixChromatic, noteTextToIndex } from "../../types/ChromaticIndex";
import { GreekModeDictionary, GreekModeType } from "../../types/GreekModes/GreekModeDictionary";
import { MusicalKey } from "../../types/MusicalKey";
import { TWELVE } from "../../types/NoteConstants";

export function verifyScaleDegreesArray(musicalKey: MusicalKey, expectedArray: string[]) {
  expect(expectedArray.length).toBe(TWELVE);

  Array.from({ length: TWELVE }).forEach((_, i) => {
    const scaleDegreeDisplayString = musicalKey.getScaleDegreeDisplayString(ixChromatic(i));
    expect(scaleDegreeDisplayString).toBe(expectedArray[i]);
  });
}

export function verifyGreekModeScaleDegrees(greekMode: GreekModeType, expectedNotes: string[]) {
  expectedNotes.forEach((note, index) => {
    const scaleDegreeInfo =
      GreekModeDictionary.getModeInfo(greekMode).getScaleDegreeInfoFromPosition(index);
    expect(scaleDegreeInfo.getDisplayString()).toEqual(note);
  });
}

export function verifyGreekModeScaleNotes(musicalKey: MusicalKey, expectedNotes: string[]) {
  const noteList = musicalKey.getAbsoluteScaleNotes();
  const expectedIndices = expectedNotes.map((note) => noteTextToIndex(note));
  expect(noteList).toEqual(expectedIndices);
}
