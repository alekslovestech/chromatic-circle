import { TWELVE } from "../../types/NoteConstants";
import { TWENTY4 } from "../../types/NoteConstants";
import { keyboardTestUtils } from "./KeyboardTestUtils";

export const keyVerificationUtils = {
  verifySelectedLinearKeys: (selectedIndices: number[]) => {
    const pianoKeys = document.querySelectorAll("[id^='linearKey']");
    selectedIndices.forEach((index) =>
      keyboardTestUtils.expectElementToBeSelected(pianoKeys[index]),
    );
    const unselectedIndices = Array.from({ length: TWENTY4 }, (_, i) => i).filter(
      (index) => !selectedIndices.includes(index),
    );
    unselectedIndices.forEach((index) =>
      keyboardTestUtils.expectElementToBeUnselected(pianoKeys[index]),
    );
  },

  verifySelectedCircularKeys: (selectedIndices: number[]) => {
    const circularKeys = document.querySelectorAll("[id^='circularKey']");
    selectedIndices.forEach((index) =>
      keyboardTestUtils.expectElementToBeSelected(circularKeys[index]),
    );
    const unselectedIndices = Array.from({ length: TWELVE }, (_, i) => i).filter(
      (index) => !selectedIndices.includes(index),
    );
    unselectedIndices.forEach((index) =>
      keyboardTestUtils.expectElementToBeUnselected(circularKeys[index]),
    );
  },
};
