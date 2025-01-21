import { render, fireEvent } from "@testing-library/react";
import PresetsSelector from "../../Components/Settings/PresetsSelector";
import { NotesProvider } from "../../Components/NotesContext";
import { ModeSelector } from "../../Components/Settings/ModeSelector";
import { ReactTestUtils } from "./utils/ReactTestUtils";

describe("ModeSelector", () => {
  const renderComponent = () => {
    return render(
      <NotesProvider>
        <ModeSelector />
        <PresetsSelector />
      </NotesProvider>,
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

  describe("Mode-specific Preset Buttons", () => {
    describe("Interval Mode", () => {
      beforeEach(() => {
        renderComponent();
        fireEvent.click(document.getElementById("mode-intervals")!);
      });

      test("selects M3 interval as default", () => {
        ReactTestUtils.expectElementByIdToBeSelected("preset-Interval_Maj3");
      });
    });

    describe("Chord Mode", () => {
      beforeEach(() => {
        renderComponent();
        fireEvent.click(document.getElementById("mode-chords")!);
      });

      test("displays correct preset buttons", () => {
        ReactTestUtils.expectElementByIdToBeInTheDocument("preset-Chord_Sus2");
        ReactTestUtils.expectElementByIdNotToBeInTheDocument("preset-Interval_Tritone");
        ReactTestUtils.expectElementByIdToBeInTheDocument("inversion-0");
      });

      test("selects Maj chord as default", () => {
        ReactTestUtils.expectElementByIdToBeSelected("preset-Chord_Maj");
      });
    });
  });
});
