import { render, fireEvent } from "@testing-library/react";

import { ReactTestUtils } from "../utils/ReactTestUtils";
import { keyVerificationUtils } from "../utils/KeyboardVerificationUtils";

import { RootProvider } from "../../contexts/RootContext";
import { GlobalMode } from "../../contexts/GlobalContext";

import { KeyboardLinear } from "../../Components/Linear/KeyboardLinear";
import { InputModeSelector } from "../../Components/Settings/InputModeSelector";
import { PresetsSelector } from "../../Components/Settings/PresetsSelector";

//scenarios where we only test the linear keyboard
describe("KeyboardLinear", () => {
  const renderComponent = () =>
    render(
      <RootProvider globalMode={GlobalMode.Default}>
        <KeyboardLinear />
        <InputModeSelector />
        <PresetsSelector />
      </RootProvider>,
    );

  beforeEach(() => {
    renderComponent();
  });

  test("initial setup (G selected)", () => {
    const pianoKeys = document.querySelectorAll("[id^='linearKey']");
    expect(pianoKeys.length).toBe(24);

    const whiteKeys = document.querySelectorAll(".piano-key.white");
    const blackKeys = document.querySelectorAll(".piano-key.black");
    expect(whiteKeys.length).toBe(14);
    expect(blackKeys.length).toBe(10);

    const fSharpNote = document.getElementById("linearKey06");
    const gNote = document.getElementById("linearKey07");

    expect(fSharpNote).toBeInTheDocument();
    expect(fSharpNote).toHaveClass("piano-key black");
    expect(fSharpNote).toHaveTextContent("F♯");

    expect(gNote).toBeInTheDocument();
    expect(gNote).toHaveClass("piano-key white");
    expect(gNote).toHaveTextContent("G");

    fireEvent.click(gNote!);
    keyVerificationUtils.verifySelectedLinearKeys([7]);
  });

  test("removing last note leaves no notes selected", () => {
    const freeFormButton = document.getElementById("mode-freeform");
    fireEvent.click(freeFormButton!);
    expect(freeFormButton).toHaveClass("selected");

    ReactTestUtils.clickKey("linearKey07");

    keyVerificationUtils.verifySelectedLinearKeys([]); //verify there are no notes left
  });

  test("7add13 chord doesn't crash", () => {
    ReactTestUtils.clickKey("mode-chords");
    ReactTestUtils.clickKey("preset-Chord_7Add13");
    ReactTestUtils.clickKey("linearKey23");
  });

  test("add9 chord at A configured correctly", () => {
    ReactTestUtils.clickKey("mode-chords");

    // Find and click the add9 chord preset button
    ReactTestUtils.clickKey("preset-Chord_Add9");
    ReactTestUtils.clickKey("linearKey09");
    keyVerificationUtils.verifySelectedLinearKeys([9, 13, 16, 23]); //A C# E B
  });

  test("add9 chord at A# truncates correctly", () => {
    ReactTestUtils.clickKey("mode-chords");

    ReactTestUtils.clickKey("preset-Chord_Add9");
    ReactTestUtils.clickKey("linearKey10");
    keyVerificationUtils.verifySelectedLinearKeys([10, 14, 17]); //A# D F (truncated)
  });

  test("When inversion 1 is selected, clicking around on the keyboard should only produce inversion 1", () => {
    ReactTestUtils.clickKey("mode-chords");
    ReactTestUtils.clickKey("preset-Chord_Maj");
    ReactTestUtils.clickKey("linearKey00");
    keyVerificationUtils.verifySelectedLinearKeys([0, 4, 7]);

    // Select inversion 1
    ReactTestUtils.clickKey("inversion-1");

    keyVerificationUtils.verifySelectedLinearKeys([4, 7, 12]);
    // Verify that the 12th key (C in the second octave) is a root note
    const secondOctaveC = document.getElementById("linearKey12");
    expect(secondOctaveC).toHaveClass("root-note");

    const secondOctaveD = document.getElementById("linearKey14");
    // Click on different keys and expect inversion 1 to be maintained
    fireEvent.click(secondOctaveD!); // Clicking on D in the 2nd octave
    keyVerificationUtils.verifySelectedLinearKeys([6, 9, 14]);

    expect(secondOctaveD).toHaveClass("root-note");
  });
});
