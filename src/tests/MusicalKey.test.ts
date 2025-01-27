import { KeyType, MusicalKey } from "../types/MusicalKey";

import { AccidentalType } from "../types/AccidentalType";

describe("getNoteTextFromIndex", () => {
  it("D minor => flat", () => {
    const dMinor = new MusicalKey("D", KeyType.Minor);
    expect(dMinor.getDefaultAccidental()).toBe(AccidentalType.Flat);
  });

  it("D major => sharp", () => {
    const dMajor = new MusicalKey("D", KeyType.Major);
    expect(dMajor.getDefaultAccidental()).toBe(AccidentalType.Sharp);
  });

  it("F minor => flat", () => {
    const fMinor = new MusicalKey("F", KeyType.Minor);
    expect(fMinor.getDefaultAccidental()).toBe(AccidentalType.Flat);
  });

  it("F major => flat", () => {
    const fMajor = new MusicalKey("F", KeyType.Major);
    expect(fMajor.getDefaultAccidental()).toBe(AccidentalType.Flat);
  });
});
