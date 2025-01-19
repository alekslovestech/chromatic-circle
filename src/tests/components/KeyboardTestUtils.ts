import { fireEvent } from "@testing-library/react";
import { TWELVE, TWENTY4 } from "../../types/NoteConstants";

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
    const selectedKeys = document.querySelectorAll("[id^='circularKey'].selected");
    expect(selectedKeys).toHaveLength(selectedIndices.length);
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

export const keyboardTestUtils = {
  clickKey: (keyId: string) => {
    const key = document.getElementById(keyId);
    fireEvent.click(key!);
  },

  expectElementToBeSelected: (element: Element) => {
    expect(element).toHaveClass("selected");
  },

  expectElementToBeUnselected: (element: Element) => {
    expect(element).not.toHaveClass("selected");
  },

  expectElementByIdToBeSelected: (id: string) => {
    const element = document.getElementById(id);
    expect(element).toHaveClass("selected");
  },

  expectElementByIdToBeUnselected: (id: string) => {
    const element = document.getElementById(id);
    expect(element).not.toHaveClass("selected");
  },

  expectElementByIdToBeInTheDocument: (id: string) => {
    const element = document.getElementById(id);
    expect(element).toBeInTheDocument();
  },

  expectElementByIdNotToBeInTheDocument: (id: string) => {
    const element = document.getElementById(id);
    expect(element).not.toBeInTheDocument();
  },
};
