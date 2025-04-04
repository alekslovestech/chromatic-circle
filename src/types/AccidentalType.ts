export enum AccidentalType {
  None = "None",
  Natural = "Natural",
  Sharp = "Sharp",
  Flat = "Flat",
}
//mostly used in for text on keyboards / accidental toggle
export const getAccidentalSignForDisplay = (accidental: AccidentalType): string => {
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
};

export const getAccidentalSignForDebug = (accidental: AccidentalType): string => {
  switch (accidental) {
    case AccidentalType.None:
      return "";
    case AccidentalType.Natural:
      return "♮";
    case AccidentalType.Sharp:
      return "#";
    case AccidentalType.Flat:
      return "b";
    default:
      return "";
  }
};

//mostly used in StaffRenderer / EasyScore format
export const getAccidentalSignForEasyScore = (accidental: AccidentalType): string => {
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
};

export const getOppositeAccidental = (prevAccidental: AccidentalType): AccidentalType => {
  if (prevAccidental === AccidentalType.Sharp) return AccidentalType.Flat;
  if (prevAccidental === AccidentalType.Flat) return AccidentalType.Sharp;
  return prevAccidental; //no change
};
