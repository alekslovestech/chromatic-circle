import { TWELVE } from "../types/NoteConstants";
import { ActualIndex } from "../types/IndexTypes";

export function isBlackKey(actualIndex: ActualIndex) {
  return [1, 3, 6, 8, 10].includes(actualIndex % TWELVE);
}
