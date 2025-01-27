export enum AccidentalType {
  None = "None",
  Natural = "Natural",
  Sharp = "Sharp",
  Flat = "Flat",
}

export const getAccidentalType = (prefix: string): AccidentalType =>
  prefix === "#" || prefix === "♯"
    ? AccidentalType.Sharp
    : prefix === "b" || prefix === "♭"
    ? AccidentalType.Flat
    : AccidentalType.None;
