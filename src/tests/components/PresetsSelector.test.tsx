import React from "react";
import { render } from "@testing-library/react";
import PresetsSelector from "../../Components/Settings/PresetsSelector";
import { NotesProvider } from "../../Components/NotesContext";
import { keyboardTestUtils } from "./KeyboardTestUtils";
import { ModeSelector } from "../../Components/Settings/ModeSelector";

describe("ChordPresetsSelector", () => {
  const renderComponent = () => {
    return render(
      <NotesProvider>
        <ModeSelector />
        <PresetsSelector />
      </NotesProvider>,
    );
  };

  test("selecting a new chord resets inversion to 0", () => {
    renderComponent();

    // Select a chord with inversions (e.g., major triad)
    keyboardTestUtils.clickKey("mode-chords");
    keyboardTestUtils.clickKey("preset-Chord_Maj");

    // Select an inversion other than 0
    keyboardTestUtils.clickKey("inversion-1");

    // Select a different chord
    keyboardTestUtils.clickKey("preset-Chord_Min");

    keyboardTestUtils.expectElementByIdToBeSelected("inversion-0");
  });

  test("selecting an inversion updates the chord", () => {
    renderComponent();

    // Select a chord with inversions (e.g., major triad)
    keyboardTestUtils.clickKey("mode-chords");
    keyboardTestUtils.clickKey("preset-Chord_Maj");

    // Select the first inversion
    keyboardTestUtils.clickKey("inversion-1");

    // Check that the inversion is updated
    keyboardTestUtils.expectElementByIdToBeSelected("inversion-1");
  });
});
