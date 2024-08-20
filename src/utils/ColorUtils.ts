import { isBlackKey } from "./ChromaticUtils";

export function getComputedColor(cssVariable: string): string {
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue(cssVariable)
    .trim();
  return color || "#000000";
}

function getKeyColor(index: number, isSelected: boolean): string {
  const keyType = isBlackKey(index) ? "black" : "white";
  const selectionState = isSelected ? "-selected" : "";
  return `--key-${keyType}${selectionState}-bg`;
}

function getKeyTextColor(index: number): string {
  return isBlackKey(index) ? "--note-text-on-black" : "--note-text-on-white";
}

export function getComputedKeyColor(
  index: number,
  isSelected: boolean
): string {
  return getComputedColor(getKeyColor(index, isSelected));
}

export function getComputedTextColor(index: number): string {
  return getComputedColor(getKeyTextColor(index));
}
