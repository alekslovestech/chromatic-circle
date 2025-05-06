import { ChromaticIndex } from "../../types/ChromaticIndex";
import { ActualIndex } from "../../types/IndexTypes";
import { TWELVE } from "../../types/NoteConstants";

export const isBlackKey = (actualIndex: ActualIndex | ChromaticIndex): boolean =>
  [1, 3, 6, 8, 10].includes(actualIndex % TWELVE);
