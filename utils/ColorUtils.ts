import { ActualIndex } from "../types/IndexTypes";
import { TWELVE } from "../types/NoteConstants";
import { isBlackKey } from "./Keyboard/KeyboardUtils";
import { ChromaticIndex } from "../types/ChromaticIndex";

export function getComputedColor(cssVariable: string): string {
  const color = getComputedStyle(document.documentElement).getPropertyValue(cssVariable).trim();
  return color || "#000000";
}

export const getBlackWhiteString = (index: ActualIndex | ChromaticIndex): string =>
  isBlackKey(index) ? "black" : "white";

export type RGB = [number, number, number];

export class ColorUtils {
  static getChordColor(indices: ActualIndex[]): string {
    const cyclicIntervals = this.cyclicIntervalsFromActualIndices(indices);
    const mixcolor = this.mixChordColor(cyclicIntervals);
    const mixColorRounded = mixcolor.map((color) => Math.round(color));
    return `rgb(${mixColorRounded[0]}, ${mixColorRounded[1]}, ${mixColorRounded[2]})`;
  }

  static cyclicIntervalsFromActualIndices(indices: number[]): number[] {
    const pcs = indices.map((index) => (index + TWELVE) % TWELVE);
    const sortedPcs = pcs.sort((a, b) => a - b);
    return this.cyclicIntervals(sortedPcs);
  }

  private static cyclicIntervals(sortedPcs: number[]): number[] {
    if (sortedPcs.length <= 1) return [];

    const intervals: number[] = [];
    const len = sortedPcs.length;

    // Calculate all intervals first
    for (let i = 0; i < len; i++) {
      const current = sortedPcs[i];
      const next = sortedPcs[(i + 1) % len];
      const diff = (next - current + TWELVE) % TWELVE;
      intervals.push(diff);
    }

    // Find the smallest interval and its index
    let minInterval = Math.min(...intervals);
    let startIndex = intervals.indexOf(minInterval);

    // Reorder intervals starting from the smallest, maintaining cyclic order
    const reordered: number[] = [];
    for (let i = 0; i < len; i++) {
      reordered.push(intervals[(startIndex + i) % len]);
    }

    return reordered;
  }

  private static mixChordColor(intervals: number[]): RGB {
    if (intervals.length === 0) return [222, 222, 222]; // Return unison color for empty intervals

    let rgbSum: RGB = [0, 0, 0];
    let totalWeight = 0;

    intervals.forEach((interval, i) => {
      const iclass = this.intervalClass(interval);
      const color = this.intervalClassColors[iclass];
      const weight = intervals.length - i;

      rgbSum[0] += color[0] * weight;
      rgbSum[1] += color[1] * weight;
      rgbSum[2] += color[2] * weight;
      totalWeight += weight;
    });

    return [rgbSum[0] / totalWeight, rgbSum[1] / totalWeight, rgbSum[2] / totalWeight];
  }

  // Interval class → RGB color mapping
  private static intervalClassColors: Record<number, RGB> = {
    0: [222, 222, 222], // Unison/Octave - Light Gray
    1: [219, 20, 61], // m2 / M7 - Crimson
    2: [255, 166, 0], // M2 / m7 - Orange
    3: [64, 105, 224], // m3 / M6 - Royal Blue
    4: [255, 255, 0], // M3 / m6 - Bright Yellow
    5: [0, 207, 209], // P4 / P5 - Cyan
    6: [255, 0, 255], // Tritone - Magenta
  };

  // Convert semitone interval to interval class (0–6)
  private static intervalClass(semitone: number): number {
    const mod = semitone % TWELVE;
    return Math.min(mod, TWELVE - mod);
  }
}
