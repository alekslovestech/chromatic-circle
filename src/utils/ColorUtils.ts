import { ActualIndex } from "../types/IndexTypes";
import { isBlackKey } from "./ChromaticUtils";

export function getComputedColor(cssVariable: string): string {
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue(cssVariable)
    .trim();
  return color || "#000000";
}

function getKeyColor(index: ActualIndex, isSelected: boolean): string {
  const keyType = isBlackKey(index) ? "black" : "white";
  const selectionState = isSelected ? "-selected" : "";
  return `--key-${keyType}${selectionState}-bg`;
}

function getKeyTextColor(index: ActualIndex): string {
  return isBlackKey(index) ? "--note-text-on-black" : "--note-text-on-white";
}

export function getComputedKeyColor(
  index: ActualIndex,
  isSelected: boolean
): string {
  return getComputedColor(getKeyColor(index, isSelected));
}

export function getComputedTextColor(index: ActualIndex): string {
  return getComputedColor(getKeyTextColor(index));
}
