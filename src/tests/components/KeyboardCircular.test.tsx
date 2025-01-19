import { render } from "@testing-library/react";
import KeyboardCircular from "../../Components/Circular/KeyboardCircular";
import { NotesProvider } from "../../Components/NotesContext";
import ModeSelector from "../../Components/Settings/ModeSelector";
import PresetsSelector from "../../Components/Settings/PresetsSelector";
import { keyboardTestUtils, keyVerificationUtils } from "./KeyboardTestUtils";

//scenarios where we only test the circular keyboard
describe("KeyboardCircular", () => {
  const renderComponent = () => {
    return render(
      <NotesProvider>
        <KeyboardCircular />
        <ModeSelector />
        <PresetsSelector />
      </NotesProvider>,
    );
  };

  beforeEach(() => {
    renderComponent();
  });

  test("handles click on the 'C' slice", () => {
    keyboardTestUtils.clickKey("circularKey00");
    keyVerificationUtils.verifySelectedCircularKeys([0]);
  });

  test("handles click on the 'A' slice", () => {
    keyboardTestUtils.clickKey("circularKey09");
    keyVerificationUtils.verifySelectedCircularKeys([9]);
  });

  test("switching to Chord Presets with C selected renders 3 notes", () => {
    keyboardTestUtils.clickKey("circularKey00");
    keyboardTestUtils.clickKey("mode-chords");
    keyVerificationUtils.verifySelectedCircularKeys([0, 4, 7]);
  });
});
