import { ixActualArray } from "../types/IndexTypes";
import { DEFAULT_MUSICAL_KEY, MusicalKey } from "../types/Keys/MusicalKey";
import { ChordDisplayMode } from "../types/SettingModes";

import { GreekModeType } from "../types/GreekModes/GreekModeType";
import { ChordUtils } from "../utils/ChordUtils";

function verifyDisplayInfo(
  expectedNoteGrouping: string,
  expectedChordName: string,
  indices: number[],
  musicalKey: MusicalKey = DEFAULT_MUSICAL_KEY,
) {
  const result = ChordUtils.getDisplayInfoFromIndices(
    ixActualArray(indices),
    ChordDisplayMode.Letters_Short,
    musicalKey,
  );
  expect(result.noteGroupingString).toBe(expectedNoteGrouping);
  expect(result.chordName).toBe(expectedChordName);
}

describe("getDisplayPropertiesFromIndices", () => {
  const testCases = [
    { noteGrouping: "Chord", chordName: "C", indices: [0, 4, 7] },
    { noteGrouping: "None", chordName: "Ø", indices: [] },
    { noteGrouping: "Chord", chordName: "C-", indices: [0, 1, 2] },
    { noteGrouping: "Chord", chordName: "C23", indices: [0, 2, 4] },
    { noteGrouping: "Chord", chordName: "G23", indices: [7, 9, 11] },
    { noteGrouping: "Chord", chordName: "B23", indices: [11, 13, 15] },
    { noteGrouping: "Chord", chordName: "A♯2♯4", indices: [10, 12, 16] },
    {
      noteGrouping: "Chord",
      chordName: "B♭2♯4",
      indices: [10, 12, 16],
      key: MusicalKey.fromGreekMode("C", GreekModeType.Dorian),
    },
  ];

  testCases.forEach(({ noteGrouping, chordName, indices, key }) => {
    it(`should return correct display properties for ${chordName}`, () => {
      verifyDisplayInfo(noteGrouping, chordName, indices, key);
    });
  });
});
