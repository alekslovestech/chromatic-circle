import { fireEvent, render } from "@testing-library/react";

import { ReactTestUtils } from "./utils/ReactTestUtils";

import { RootProvider } from "../../contexts/RootContext";

import { ModeSelector } from "../../Components/Settings/ModeSelector";
import { CircularVisModeSelect } from "../../Components/Circular/CircularVisModeSelect";
import { CircularVisModeUtils } from "./utils/CircularVisModeUtils";
import { CircularVisMode } from "../../types/SettingModes";

describe("ModeSelector with CircularVisModeSelect", () => {
  const renderComponent = () => {
    return render(
      <RootProvider>
        <ModeSelector />
        <CircularVisModeSelect />
      </RootProvider>,
    );
  };

  describe("Default Behavior", () => {
    beforeEach(() => {
      renderComponent();
    });

    test("initializes with Single Note mode active", () => {
      const singleNotesButton = document.getElementById("mode-singlenote");
      expect(singleNotesButton).toBeInTheDocument();
      expect(singleNotesButton).toHaveClass("selected");
      expect(singleNotesButton).toHaveTextContent("Single Note");
      CircularVisModeUtils.verifyVisButtonsEnabled([true, false, false]);
      CircularVisModeUtils.verifyVisButtonsSelected(CircularVisMode.None);
    });
  });

  describe("Mode Switching", () => {
    beforeEach(() => {
      renderComponent();
    });

    test("switches from Single Note to Freeform mode correctly", () => {
      ReactTestUtils.expectElementByIdToBeSelected("mode-singlenote");
      ReactTestUtils.expectElementByIdToBeUnselected("mode-freeform");

      ReactTestUtils.clickKey("mode-freeform");

      ReactTestUtils.expectElementByIdToBeSelected("mode-freeform");
      ReactTestUtils.expectElementByIdToBeUnselected("mode-singlenote");
    });
  });

  describe("Switching between Input Modes", () => {
    describe("Interval Mode", () => {
      beforeEach(() => {
        renderComponent();
        fireEvent.click(document.getElementById("mode-intervals")!);
      });
      test("in Interval Mode, only the first two buttons are enabled", () => {
        CircularVisModeUtils.verifyVisButtonsEnabled([true, true, false]);
        CircularVisModeUtils.verifyVisButtonsSelected(CircularVisMode.Radial);
      });
    });

    describe("Chord Mode", () => {
      beforeEach(() => {
        renderComponent();
        fireEvent.click(document.getElementById("mode-chords")!);
      });

      test("in Chord Mode, all three buttons are enabled", () => {
        CircularVisModeUtils.verifyVisButtonsEnabled([true, true, true]);
        CircularVisModeUtils.verifyVisButtonsSelected(CircularVisMode.Polygon);
      });
    });
  });
});
