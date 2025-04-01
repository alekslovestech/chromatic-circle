import { ixChromatic } from "../../types/ChromaticIndex";
import { GreekModeDictionary, GreekModeType } from "../../types/GreekMode";
import { MusicalKey } from "../../types/MusicalKey";
import { TWELVE } from "../../types/NoteConstants";
import { KeyTextMode } from "../../types/SettingModes";
import { getDisplayString } from "../../utils/NoteNameUtils";

export function verifyScaleDegreesArray(musicalKey: MusicalKey, expectedArray: string[]) {
  expect(expectedArray.length).toBe(TWELVE);

  Array.from({ length: TWELVE }).forEach((_, i) => {
    const scaleDegreeDisplayString = getDisplayString(
      ixChromatic(i),
      musicalKey,
      KeyTextMode.ScaleDegree,
    );
    expect(scaleDegreeDisplayString).toBe(expectedArray[i]);
  });
}

export function verifyGreekModeScaleDegrees(greekMode: GreekModeType, expectedNotes: string[]) {
  expectedNotes.forEach((note, index) => {
    const scaleDegreeInfo = GreekModeDictionary.getInstance()
      .getMode(greekMode)
      .getScaleDegreeInfo(index);
    expect(scaleDegreeInfo.getDisplayString()).toEqual(note);
  });
}
