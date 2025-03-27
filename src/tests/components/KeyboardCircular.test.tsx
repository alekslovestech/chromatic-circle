import { render } from "@testing-library/react";

import { ReactTestUtils } from "./utils/ReactTestUtils";
import { keyVerificationUtils } from "./utils/KeyboardVerificationUtils";

import { RootProvider } from "../../contexts/RootContext";

import { KeyboardCircular } from "../../Components/Circular/KeyboardCircular";
import { InputModeSelector } from "../../Components/Settings/InputModeSelector";
import { PresetsSelector } from "../../Components/Settings/PresetsSelector";

//scenarios where we only test the circular keyboard
describe("KeyboardCircular", () => {
  const renderComponent = () =>
    render(
      <RootProvider>
        <KeyboardCircular />
        <InputModeSelector />
        <PresetsSelector />
      </RootProvider>,
    );

  beforeEach(() => {
    renderComponent();
  });

  test("handles click on the 'C' slice", () => {
    ReactTestUtils.clickKey("circularKey00");
    keyVerificationUtils.verifySelectedCircularKeys([0]);
  });

  test("handles click on the 'A' slice", () => {
    ReactTestUtils.clickKey("circularKey09");
    keyVerificationUtils.verifySelectedCircularKeys([9]);
  });

  test("switching to Chord Presets with C selected renders 3 notes", () => {
    ReactTestUtils.clickKey("circularKey00");
    ReactTestUtils.clickKey("mode-chords");
    keyVerificationUtils.verifySelectedCircularKeys([0, 4, 7]);
  });
});
