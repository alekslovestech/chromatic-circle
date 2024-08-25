import { ActualIndex, ChromaticIndex } from "../types/IndexTypes";
import { TWELVE } from "../types/NoteConstants";
import { isBlackKey } from "./ChromaticUtils";

export function getComputedColor(cssVariable: string): string {
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue(cssVariable)
    .trim();
  return color || "#000000";
}

function getKeyColor(
  index: ActualIndex,
  isSelected: boolean,
  secondOctave = false
): string {
  const keyType = isBlackKey(index) ? "black" : "white";
  const octaveNum = secondOctave ? "1" : "0";
  const selectionState = isSelected ? `-selected${octaveNum}` : "";
  const ret = `--key-${keyType}${selectionState}`;

  return ret;
}

function getKeyTextColor(index: ActualIndex): string {
  return isBlackKey(index) ? "--note-text-on-black" : "--note-text-on-white";
}

export function getComputedKeyColor(
  index: ActualIndex,
  isSelected: boolean
): string {
  const isSecondOctave = index >= TWELVE;
  return getComputedColor(getKeyColor(index, isSelected, isSecondOctave));
}

export function getComputedKeyColorOverlayed(
  index: ChromaticIndex,
  selectedNoteIndices: ActualIndex[]
) {
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
  return getComputedColor(getKeyTextColor(index));
}
