import { DEFAULT_MUSICAL_KEY, MusicalKey } from "../types/Keys/MusicalKey";
import { NoteInfo } from "../types/NoteInfo";
import { AccidentalType } from "../types/AccidentalType";
import { KeyType } from "../types/Keys/KeyType";
import { NoteConverter } from "../types/NoteConverter";
import { KeyNoteResolver } from "../types/Keys/KeyNoteResolver";

function verifyResolvedNote(musicalKey: MusicalKey, noteText: string, expectedNote: NoteInfo) {
  const chromaticIndex = NoteConverter.toChromaticIndex(noteText);
  const note = KeyNoteResolver.resolveNoteInKey(musicalKey, chromaticIndex);
  expect(note).toEqual(expectedNote);
}

describe("Note resolution in keys", () => {
  const testCases = [
    {
      desc: "C major",
      key: DEFAULT_MUSICAL_KEY,
      cases: [
        { note: "D", expected: new NoteInfo("D", AccidentalType.None) },
        { note: "C#", expected: new NoteInfo("C", AccidentalType.Sharp) },
        { note: "Db", expected: new NoteInfo("C", AccidentalType.Sharp) },
      ],
    },
    {
      desc: "D major",
      key: MusicalKey.fromClassicalMode("D", KeyType.Major),
      cases: [
        { note: "F#", expected: new NoteInfo("F", AccidentalType.None) },
        { note: "F", expected: new NoteInfo("F", AccidentalType.Natural) },
      ],
    },
    {
      desc: "D minor",
      key: MusicalKey.fromClassicalMode("D", KeyType.Minor),
      cases: [
        { note: "Bb", expected: new NoteInfo("B", AccidentalType.None) },
        { note: "B", expected: new NoteInfo("B", AccidentalType.Natural) },
      ],
    },
  ];

  testCases.forEach(({ desc, key, cases }) => {
    describe(desc, () => {
      cases.forEach(({ note, expected }) => {
        test(`${note} resolves to ${expected.noteName}${expected.accidental}`, () => {
          verifyResolvedNote(key, note, expected);
        });
      });
    });
  });
});
