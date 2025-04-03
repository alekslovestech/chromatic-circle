import { AccidentalType } from "../types/AccidentalType";
import { ixScaleDegree } from "../types/IndexTypes";
import { ScaleDegreeInfo } from "../types/GreekModes/ScaleDegreeInfo";

describe("Scale Degree Info", () => {
  test("1", () => {
    const scaleDegreeInfo = new ScaleDegreeInfo(ixScaleDegree(1));
    expect(scaleDegreeInfo.getDisplayString()).toEqual("1");
  });

  test("♭1", () => {
    const scaleDegreeInfo = new ScaleDegreeInfo(ixScaleDegree(1), AccidentalType.Flat);
    expect(scaleDegreeInfo.getDisplayString()).toEqual("♭1");
  });

  test("♯1", () => {
    const scaleDegreeInfo = new ScaleDegreeInfo(ixScaleDegree(1), AccidentalType.Sharp);
    expect(scaleDegreeInfo.getDisplayString()).toEqual("♯1");
  });

  test("♭7", () => {
    const scaleDegreeInfo = new ScaleDegreeInfo(ixScaleDegree(7), AccidentalType.Flat);
    expect(scaleDegreeInfo.getDisplayString()).toEqual("♭7");
  });
});
