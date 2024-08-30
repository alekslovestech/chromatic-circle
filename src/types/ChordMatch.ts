import { ChordDefinition } from "./ChordDefinition";

export interface ChordMatch {
  definition: ChordDefinition;
  inversionIndex: number | undefined; //0 is the first inversion (add 1 for display index)
}
