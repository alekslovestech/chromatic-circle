import { TWELVE } from "../../types/NoteConstants";
import { TWENTY4 } from "../../types/NoteConstants";
import { ReactTestUtils } from "./ReactTestUtils";

export const keyVerificationUtils = {
  getAllLinearKeys: () => {
    return document.querySelectorAll("[id^='linearKey']");
  },

  getAllCircularKeys: () => {
    return document.querySelectorAll("[id^='circularKey']");
  },

  verifySelectedLinearKeys: (selectedIndices: number[]) => {
    const pianoKeys = keyVerificationUtils.getAllLinearKeys();
    selectedIndices.forEach((index) => ReactTestUtils.expectElementToBeSelected(pianoKeys[index]));
    const unselectedIndices = Array.from({ length: TWENTY4 }, (_, i) => i).filter(
      (index) => !selectedIndices.includes(index),
    );
    unselectedIndices.forEach((index) =>
      ReactTestUtils.expectElementToBeUnselected(pianoKeys[index]),
    );
  },

  verifyLinearKeysDisabled: () => {
    const pianoKeys = keyVerificationUtils.getAllLinearKeys();
    pianoKeys.forEach((key) => ReactTestUtils.expectElementToBeDisabled(key));
  },

  verifyCircularKeysDisabled: () => {
    const circularKeys = keyVerificationUtils.getAllCircularKeys();
    circularKeys.forEach((key) => ReactTestUtils.expectElementToBeDisabled(key));
  },

  verifySelectedCircularKeys: (selectedIndices: number[]) => {
    const circularKeys = keyVerificationUtils.getAllCircularKeys();
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
