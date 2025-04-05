import { GreekModeDictionary } from "../types/GreekModes/GreekModeDictionary";
import { GreekModeType } from "../types/GreekModes/GreekModeType";
import { ChordType } from "../types/NoteGroupingTypes";
import { RomanChord } from "../types/RomanChord";

function verifyRomanDisplayStrings(greekMode: GreekModeType, expectedNotes: string[]) {
  for (let i = 0; i < 7; i++) {
    verifyOneRomanDisplayString(greekMode, i, expectedNotes[i]);
  }
}

function getRomanChordRoot35(greekMode: GreekModeType, scaleDegreeIndex: number) {
  const greekModeInfo = GreekModeDictionary.getModeInfo(greekMode);
  const scaleDegreeInfo = greekModeInfo.getScaleDegreeInfoFromPosition(scaleDegreeIndex);

  const rootOffset = greekModeInfo.pattern[scaleDegreeIndex];
  const thirdOffset = greekModeInfo.pattern[(scaleDegreeIndex + 2) % 7];
  const fifthOffset = greekModeInfo.pattern[(scaleDegreeIndex + 4) % 7];

  const thirdInterval = (thirdOffset - rootOffset + 12) % 12;
  const fifthInterval = (fifthOffset - rootOffset + 12) % 12;

  let chordType: ChordType;
  if (thirdInterval === 4 && fifthInterval === 7) {
    chordType = ChordType.Major;
  } else if (thirdInterval === 3 && fifthInterval === 7) {
    chordType = ChordType.Minor;
  } else if (thirdInterval === 3 && fifthInterval === 6) {
    chordType = ChordType.Diminished;
    // Augmented
  } else {
    chordType = ChordType.Unknown;
  }

  const romanChord = new RomanChord(
    scaleDegreeInfo.scaleDegree,
    chordType,
    scaleDegreeInfo.accidentalPrefix,
  );
  return romanChord;
}

function verifyOneRomanDisplayString(
  greekMode: GreekModeType,
  scaleDegreeIndex: number,
  expectedString: string,
) {
  const romanChord = getRomanChordRoot35(greekMode, scaleDegreeIndex);
  const displayString = romanChord.getString();
  expect(displayString).toEqual(expectedString);
}

describe("Roman Mode individual indices", () => {
  describe("verifyFromPattern", () => {
    test("Ionian mode pattern [0]", () => {
      verifyOneRomanDisplayString(GreekModeType.Ionian, 0, "I");
    });

    test("Ionian mode pattern [1]", () => {
      verifyOneRomanDisplayString(GreekModeType.Ionian, 1, "ii");
    });

    test("Ionian mode pattern [2]", () => {
      verifyOneRomanDisplayString(GreekModeType.Ionian, 2, "iii");
    });

    test("Ionian mode pattern [3]", () => {
      verifyOneRomanDisplayString(GreekModeType.Ionian, 3, "IV");
    });

    test("Ionian mode pattern [4]", () => {
      verifyOneRomanDisplayString(GreekModeType.Ionian, 4, "V");
    });

    test("Ionian mode pattern [5]", () => {
      verifyOneRomanDisplayString(GreekModeType.Ionian, 5, "vi");
    });

    test("Ionian mode pattern [6]", () => {
      verifyOneRomanDisplayString(GreekModeType.Ionian, 6, "vii°");
    });
  });
});

describe("Roman Mode Index Arrays", () => {
  describe("verifyFromPattern", () => {
    test("Ionian mode pattern", () => {
      verifyRomanDisplayStrings(GreekModeType.Ionian, ["I", "ii", "iii", "IV", "V", "vi", "vii°"]);
    });

    test("Dorian mode pattern", () => {
      verifyRomanDisplayStrings(GreekModeType.Dorian, [
        "i",
        "ii",
        "♭III",
        "IV",
        "v",
        "vi°",
        "♭VII",
      ]);
    });

    test("Phrygian mode pattern", () => {
      verifyRomanDisplayStrings(GreekModeType.Phrygian, [
        "i",
        "♭II",
        "♭III",
        "iv",
        "v°",
        "♭VI",
        "♭vii",
      ]);
    });
    /*

    test("Lydian mode pattern", () => {
      verifyRomanDisplayStrings(GreekModeType.Lydian, ["I", "II", "III", "♯IV", "V", "VI", "VII"]);
    });

    test("Mixolydian mode pattern", () => {
      verifyRomanDisplayStrings(GreekModeType.Mixolydian, [
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "♭VII",
      ]);
    });

    test("Aeolian mode pattern", () => {
      verifyRomanDisplayStrings(GreekModeType.Aeolian, [
        "I",
        "II",
        "♭III",
        "IV",
        "V",
        "♭VI",
        "♭VII",
      ]);
    });

    test("Locrian mode pattern", () => {
      verifyRomanDisplayStrings(GreekModeType.Locrian, [
        "I",
        "♭II",
        "♭III",
        "IV",
        "♭V",
        "♭VI",
        "♭VII",
      ]);
    });*/
  });
});
