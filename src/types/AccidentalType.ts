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

export function getAccidentalSignForDisplay(accidental: AccidentalType): string {
  switch (accidental) {
    case AccidentalType.None:
      return "";
    case AccidentalType.Natural:
      return "♮";
    case AccidentalType.Sharp:
      return "♯";
    case AccidentalType.Flat:
      return "♭";
    default:
      return "";
  }
}

export function getAccidentalSignForEasyScore(accidental: AccidentalType): string {
  switch (accidental) {
    case AccidentalType.None:
      return "";
    case AccidentalType.Natural:
      return "n";
    case AccidentalType.Sharp:
      return "#";
    case AccidentalType.Flat:
      return "b";
    default:
      return "";
  }
}
