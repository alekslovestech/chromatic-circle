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
      expect(singleNotesButton).toHaveClass("active");
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

      expect(singleNotesButton).toHaveClass("active");
      expect(freeFormButton).not.toHaveClass("active");

      fireEvent.click(freeFormButton!);

      expect(freeFormButton).toHaveClass("active");
      expect(singleNotesButton).not.toHaveClass("active");
      expect(freeFormButton).toHaveTextContent("Freeform");
    });
  });

  describe("Mode-specific Preset Buttons", () => {
    describe("Interval Mode", () => {
      beforeEach(() => {
        renderComponent();
        fireEvent.click(document.getElementById("modeIntervals")!);
      });

      test("displays correct preset buttons", () => {
        expect(document.getElementById("Interval_Tritone")).toBeInTheDocument();
        expect(document.getElementById("Chord_Sus2")).not.toBeInTheDocument();
        expect(document.getElementById("inversionButton0")).not.toBeInTheDocument();
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
    });
  });
});
