import { RenderResult } from "@testing-library/react";
import { keyboardTestUtils } from "./KeyboardTestUtils";

export const keyboardGeneralTests = (renderKeyboard: () => RenderResult) => {
  describe("General Keyboard Behavior", () => {
    test("generic test", () => {
      renderKeyboard();
      //add test here
    });
  });
};
