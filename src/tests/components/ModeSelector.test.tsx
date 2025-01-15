import { render, fireEvent } from "@testing-library/react";
import PresetsSelector from "../../Components/Settings/PresetsSelector";
import { NotesProvider } from "../../Components/NotesContext";
import { ModeSelector } from "../../Components/Settings/ModeSelector";

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
      const singleNotesButton = document.getElementById("modeSingleNote");
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
      const singleNotesButton = document.getElementById("modeSingleNote");
      const freeFormButton = document.getElementById("modeFreeform");

      expect(singleNotesButton).toHaveClass("selected");
      expect(freeFormButton).not.toHaveClass("selected");

      fireEvent.click(freeFormButton!);

      expect(freeFormButton).toHaveClass("selected");
      expect(singleNotesButton).not.toHaveClass("selected");
      expect(freeFormButton).toHaveTextContent("Freeform");
    });
  });

  describe("Mode-specific Preset Buttons", () => {
    describe("Interval Mode", () => {
      beforeEach(() => {
        renderComponent();
        fireEvent.click(document.getElementById("modeIntervals")!);
      });

      test("selects M3 interval as default", () => {
        const intervalM3Button = document.getElementById("Interval_Maj3");
        expect(intervalM3Button).toBeInTheDocument();
        fireEvent.click(intervalM3Button!);
        expect(intervalM3Button).toHaveClass("selected");
      });
    });

    describe("Chord Mode", () => {
      beforeEach(() => {
        renderComponent();
        fireEvent.click(document.getElementById("modeChords")!);
      });

      test("displays correct preset buttons", () => {
        expect(document.getElementById("Chord_Sus2")).toBeInTheDocument();
        expect(document.getElementById("Interval_Tritone")).not.toBeInTheDocument();
        expect(document.getElementById("inversionButton0")).toBeInTheDocument();
      });

      test("selects Maj chord as default", () => {
        const chordMajorButton = document.getElementById("Chord_Maj");
        expect(chordMajorButton).toHaveClass("selected");
      });
    });
  });
});
