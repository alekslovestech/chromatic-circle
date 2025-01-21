import { render } from "@testing-library/react";
import KeyboardCircular from "../../Components/Circular/KeyboardCircular";
import { NotesProvider } from "../../Components/NotesContext";
import ModeSelector from "../../Components/Settings/ModeSelector";
import PresetsSelector from "../../Components/Settings/PresetsSelector";
import { ReactTestUtils } from "./utils/ReactTestUtils";
import { keyVerificationUtils } from "./utils/KeyboardVerificationUtils";

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
