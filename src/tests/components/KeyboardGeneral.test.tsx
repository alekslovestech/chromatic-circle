import { fireEvent, render } from "@testing-library/react";
import { keyboardTestUtils } from "./KeyboardTestUtils";
import KeyboardLinear from "../../Components/KeyboardLinear";
import { keyVerificationUtils } from "./KeyboardVerificationUtils";

import { ModeSelector } from "../../Components/Settings/ModeSelector";
import PresetsSelector from "../../Components/Settings/PresetsSelector";
import { NotesProvider } from "../../Components/NotesContext";
import KeyboardCircular from "../../Components/Circular/KeyboardCircular";

//scenarios where setup is the same for both linear and circular keyboards
describe("KeyboardGeneral", () => {
  const renderComponent = () => {
    return render(
      <NotesProvider>
        <KeyboardLinear />
        <KeyboardCircular />
        <ModeSelector />
        <PresetsSelector />
      </NotesProvider>,
    );
  };

  beforeEach(() => {
    renderComponent();
  });

  test("test initial setup (G selected)", () => {
    keyVerificationUtils.verifySelectedCircularKeys([7]);
    keyVerificationUtils.verifySelectedLinearKeys([7]);
  });

  test("generic test", () => {
    const freeFormButton = document.getElementById("mode-freeform");
    //add test heconst freeFormButton = document.getElementById("mode-freeform");
    fireEvent.click(freeFormButton!);
    expect(freeFormButton).toHaveClass("selected");

    keyboardTestUtils.clickKey("linearKey07");

    keyVerificationUtils.verifySelectedLinearKeys([]); //verify there are no notes left
    keyVerificationUtils.verifySelectedCircularKeys([]); //verify there are no notes left
  });

  test("switching mode to Freeform renders 1 note (still)", () => {
    keyboardTestUtils.clickKey("mode-freeform");
    keyVerificationUtils.verifySelectedLinearKeys([7]);
    keyVerificationUtils.verifySelectedCircularKeys([7]);
  });

  test("switching mode to Interval Presets and then Freeform renders 2 notes (still)", () => {
    keyboardTestUtils.clickKey("mode-intervals");
    keyboardTestUtils.clickKey("mode-freeform");

    keyVerificationUtils.verifySelectedLinearKeys([7, 11]);
    keyVerificationUtils.verifySelectedCircularKeys([7, 11]);
  });

  test("switching Single Note mode from a non-zero inversion doens't crash", () => {
    keyboardTestUtils.clickKey("mode-chords");
    keyboardTestUtils.clickKey("inversion-1");
    keyboardTestUtils.clickKey("mode-singlenote");
  });

  test("switching mode to Chord Presets and then Freeform renders 3 notes", () => {
    keyboardTestUtils.clickKey("mode-chords");
    keyboardTestUtils.clickKey("mode-freeform");

    keyVerificationUtils.verifySelectedLinearKeys([7, 11, 14]);
    keyVerificationUtils.verifySelectedCircularKeys([7, 11, 2]);
  });

  test("switching mode to Interval Presets renders 2 notes", () => {
    keyboardTestUtils.clickKey("mode-intervals");
    keyVerificationUtils.verifySelectedLinearKeys([7, 11]);
    keyVerificationUtils.verifySelectedCircularKeys([7, 11]);
  });

  test("switching mode to Chord Presets renders 3 notes", () => {
    keyboardTestUtils.clickKey("mode-chords");
    keyVerificationUtils.verifySelectedLinearKeys([7, 11, 14]);
    keyVerificationUtils.verifySelectedCircularKeys([7, 11, 2]);
  });
});
