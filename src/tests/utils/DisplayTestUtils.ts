import { ixChromatic, noteTextToIndex } from "../../types/ChromaticIndex";
import { GreekModeDictionary } from "../../types/GreekModes/GreekModeDictionary";
import { GreekModeType } from "../../types/GreekModes/GreekModeType";
import { MusicalKey } from "../../types/MusicalKey";
import { TWELVE } from "../../types/NoteConstants";

export function verifyScaleDegreesArray(musicalKey: MusicalKey, expectedArray: string[]) {
  expect(expectedArray.length).toBe(TWELVE);

  Array.from({ length: TWELVE }).forEach((_, i) => {
    const scaleDegreeDisplayString = musicalKey.getScaleDegreeDisplayString(ixChromatic(i));
    expect(scaleDegreeDisplayString).toBe(expectedArray[i]);
  });
}

export function verifyScaleDegreeDisplayStrings(greekMode: GreekModeType, expectedNotes: string[]) {
  const displayStrings = GreekModeDictionary.getModeInfo(greekMode).getScaleDegreeDisplayStrings();
  expect(displayStrings).toEqual(expectedNotes);
}

export function verifyGreekModeScaleNotes(musicalKey: MusicalKey, expectedNotes: string[]) {
  const noteList = musicalKey.getAbsoluteScaleNotes();
  const expectedIndices = expectedNotes.map((note) => noteTextToIndex(note));
  expect(noteList).toEqual(expectedIndices);
}
