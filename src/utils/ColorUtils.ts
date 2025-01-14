import { ActualIndex, ChromaticIndex } from "../types/IndexTypes";
import { TWELVE } from "../types/NoteConstants";
import { isBlackKey, isSelectedEitherOctave } from "./KeyboardUtils";

export function getComputedColor(cssVariable: string): string {
  const color = getComputedStyle(document.documentElement).getPropertyValue(cssVariable).trim();
  return color || "#000000";
}

export const getBlackWhiteString = (index: ActualIndex): string =>
  isBlackKey(index) ? "black" : "white";

export function getKeyColor(
  index: ActualIndex | ChromaticIndex,
  isSelected: boolean,
  isSecondOctave: boolean,
): string {
  const blackWhiteString = getBlackWhiteString(index as ActualIndex);
  const octave = isSecondOctave ? "1" : "0";
  const selection = isSelected ? `-selected${octave}` : "";
  return `--key-${blackWhiteString}${selection}`;
}

export function getComputedKeyColor(index: ActualIndex, isSelected: boolean): string {
  return getComputedColor(getKeyColor(index, isSelected, index >= TWELVE));
}

export function getComputedKeyColorOverlayed(
  index: ChromaticIndex,
  selectedNoteIndices: ActualIndex[],
): string {
  const isSelected = isSelectedEitherOctave(index, selectedNoteIndices);
  const isSelectedSecondOctave = selectedNoteIndices.includes((index + TWELVE) as ActualIndex);
  return getComputedColor(getKeyColor(index, isSelected, isSelectedSecondOctave));
}

export function getComputedTextColor(index: ActualIndex): string {
  return getComputedColor(`--note-text-on-${getBlackWhiteString(index)}`);
}
