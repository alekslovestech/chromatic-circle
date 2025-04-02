import { ixChromatic, noteTextToIndex } from "../../types/ChromaticIndex";
import { GreekModeDictionary, GreekModeType } from "../../types/GreekMode";
import { MusicalKey } from "../../types/MusicalKey";
import { TWELVE } from "../../types/NoteConstants";
import { getScaleDegreeDisplayString } from "../../utils/NoteNameUtils";

export function verifyScaleDegreesArray(musicalKey: MusicalKey, expectedArray: string[]) {
  expect(expectedArray.length).toBe(TWELVE);

  Array.from({ length: TWELVE }).forEach((_, i) => {
    const scaleDegreeDisplayString = getScaleDegreeDisplayString(ixChromatic(i), musicalKey);
    expect(scaleDegreeDisplayString).toBe(expectedArray[i]);
  });
}

export function verifyGreekModeScaleDegrees(greekMode: GreekModeType, expectedNotes: string[]) {
  expectedNotes.forEach((note, index) => {
    const scaleDegreeInfo = GreekModeDictionary.getInstance()
      .getMode(greekMode)
      .getScaleDegreeInfoFromPosition(index);
    expect(scaleDegreeInfo.getDisplayString()).toEqual(note);
  });
}

export function verifyGreekModeScaleNotes(musicalKey: MusicalKey, expectedNotes: string[]) {
  const noteList = musicalKey.getAbsoluteScaleNotes();
  const expectedIndices = expectedNotes.map((note) => noteTextToIndex(note));
  expect(noteList).toEqual(expectedIndices);
}
