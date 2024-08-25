import { ActualIndex, ChromaticIndex } from "../types/IndexTypes";
import { TWELVE } from "../types/NoteConstants";
import { isBlackKey } from "./ChromaticUtils";

export function getComputedColor(cssVariable: string): string {
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue(cssVariable)
    .trim();
  return color || "#000000";
}

export function getKeyColor(
  index: ActualIndex | ChromaticIndex,
  isSelected: boolean,
  isSecondOctave: boolean
): string {
  const keyType = isBlackKey(index) ? "black" : "white";
  const octave = isSecondOctave ? "1" : "0";
  const selection = isSelected ? `-selected${octave}` : "";
  return `--key-${keyType}${selection}`;
}

export function getComputedKeyColor(
  index: ActualIndex,
  isSelected: boolean
): string {
  return getComputedColor(getKeyColor(index, isSelected, index >= TWELVE));
}

export function getComputedKeyColorOverlayed(
  index: ChromaticIndex,
  selectedNoteIndices: ActualIndex[]
): string {
  const isSelectedFirstOctave = selectedNoteIndices.includes(index);
  const isSelectedSecondOctave = selectedNoteIndices.includes(
    (index + TWELVE) as ActualIndex
  );
  return getComputedColor(
    getKeyColor(
      index,
      isSelectedFirstOctave || isSelectedSecondOctave,
      isSelectedSecondOctave
    )
  );
}

export function getComputedTextColor(index: ActualIndex): string {
  return getComputedColor(
    `--note-text-on-${isBlackKey(index) ? "black" : "white"}`
  );
}
