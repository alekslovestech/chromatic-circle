import { RenderResult } from "@testing-library/react";

export const keyboardGeneralTests = (renderKeyboard: () => RenderResult) => {
  describe("General Keyboard Behavior", () => {
    test("clicking a key updates selected notes in context", () => {
      renderKeyboard();
    });
  });
};
