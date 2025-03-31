import { TWELVE } from "../../types/NoteConstants";
import { TWENTY4 } from "../../types/NoteConstants";
import { ReactTestUtils } from "./ReactTestUtils";

export const keyVerificationUtils = {
  verifySelectedLinearKeys: (selectedIndices: number[]) => {
    const pianoKeys = document.querySelectorAll("[id^='linearKey']");
    selectedIndices.forEach((index) => ReactTestUtils.expectElementToBeSelected(pianoKeys[index]));
    const unselectedIndices = Array.from({ length: TWENTY4 }, (_, i) => i).filter(
      (index) => !selectedIndices.includes(index),
    );
    unselectedIndices.forEach((index) =>
      ReactTestUtils.expectElementToBeUnselected(pianoKeys[index]),
    );
  },

  verifySelectedCircularKeys: (selectedIndices: number[]) => {
    const circularKeys = document.querySelectorAll("[id^='circularKey']");
    selectedIndices.forEach((index) =>
      ReactTestUtils.expectElementToBeSelected(circularKeys[index]),
    );
    const unselectedIndices = Array.from({ length: TWELVE }, (_, i) => i).filter(
      (index) => !selectedIndices.includes(index),
    );
    unselectedIndices.forEach((index) =>
      ReactTestUtils.expectElementToBeUnselected(circularKeys[index]),
    );
  },
};
