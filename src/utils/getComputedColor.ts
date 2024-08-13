import { isBlackKey } from "./ChromaticUtils";

export function getComputedColor(cssVariable: string): string {
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue(cssVariable)
    .trim();
  if (!color) {
    console.warn(`No color found for CSS variable: ${cssVariable}`);
    return "#000000"; // Default to black if no color is found
  }
  return color;
}

function getKeyColor(index: number, isSelected: boolean): string {
  const keyType = isBlackKey(index) ? "black" : "white";
  const selectionState = isSelected ? "-selected" : "";
  const finalColor = `--key-${keyType}${selectionState}-bg`;
  return finalColor;
}

export function getKeyColorResolved(
  index: number,
  selectedNoteIndices: number[]
): string {
  const isSelected = selectedNoteIndices.includes(index);

  const keyColor = getKeyColor(index, isSelected);
  return getComputedColor(keyColor);
}
