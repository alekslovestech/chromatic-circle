import { render, fireEvent } from "@testing-library/react";
import KeyboardCircular from "../../Components/Circular/KeyboardCircular";
import { NotesProvider } from "../../Components/NotesContext";
import ModeSelector from "../../Components/Settings/ModeSelector";
import StaffRenderer from "../../Components/StaffRenderer";
import PresetsSelector from "../../Components/Settings/PresetsSelector";
import { TWELVE } from "../../types/NoteConstants";
import { ixChromatic } from "../../types/IndexTypes";

describe("KeyboardCircular", () => {
  const keyboardCircular = <KeyboardCircular />;
  const renderComponent = () => {
    return render(
      <NotesProvider>
        {keyboardCircular}
        <ModeSelector />
        <PresetsSelector />
        <StaffRenderer />
      </NotesProvider>,
    );
  };

  let circularKeys: NodeListOf<Element>;

  beforeEach(() => {
    renderComponent();
    circularKeys = document.querySelectorAll("[id^='circularKey']");
  });

  const verifySelectedKeys = (selectedIndices: number[]) => {
    const selectedKeys = document.querySelectorAll("[id^='circularKey'].selected");
    expect(selectedKeys).toHaveLength(selectedIndices.length);
    selectedIndices.forEach((index) => {
      expect(circularKeys[index]).toHaveClass("selected");
    });
    const unselectedIndices = Array.from({ length: TWELVE }, (_, i) => i).filter(
      (index) => !selectedIndices.includes(ixChromatic(index)),
    );
    unselectedIndices.forEach((index) => {
      expect(circularKeys[index]).not.toHaveClass("selected");
    });
  };

  test("renders 12 pie slices", () => {
    expect(circularKeys.length).toBe(12);
  });

  test("test initial setup (G selected)", () => {
    verifySelectedKeys([7]);
  });

  test("handles click on the 'C' slice", () => {
    const cNote = document.getElementById("circularKey00");
    fireEvent.click(cNote!);
    verifySelectedKeys([0]);
  });

  test("handles click on the 'A' slice", () => {
    const aNote = document.getElementById("circularKey09");
    fireEvent.click(aNote!);
    verifySelectedKeys([9]);
  });

  test("switching mode to Freeform renders 1 note (still)", () => {
    const freeFormButton = document.getElementById("mode-freeform");
    fireEvent.click(freeFormButton!);
    expect(freeFormButton).toHaveClass("selected");
    verifySelectedKeys([7]);
  });

  test("switching mode to Interval Presets and then Freeform renders 2 notes (still)", () => {
    const intervalPresetsButton = document.getElementById("mode-intervals");
    fireEvent.click(intervalPresetsButton!);
    const freeFormButton = document.getElementById("mode-freeform");
    fireEvent.click(freeFormButton!);

    expect(freeFormButton).toHaveClass("selected");
    verifySelectedKeys([7, 11]);
  });

  test("switching mode to Chord Presets and then Freeform renders 3 notes", () => {
    const chordPresetsButton = document.getElementById("mode-chords");
    fireEvent.click(chordPresetsButton!);
    const freeFormButton = document.getElementById("mode-freeform");
    fireEvent.click(freeFormButton!);

    expect(freeFormButton).toHaveClass("selected");
    verifySelectedKeys([7, 11, 2]);
  });

  test("switching mode to Interval Presets renders 2 notes", () => {
    const intervalPresetsButton = document.getElementById("mode-intervals");
    fireEvent.click(intervalPresetsButton!);
    expect(intervalPresetsButton).toHaveClass("selected");
    verifySelectedKeys([7, 11]);
  });

  test("switching mode to Chord Presets renders 3 notes", () => {
    const chordPresetsButton = document.getElementById("mode-chords");
    fireEvent.click(chordPresetsButton!);
    expect(chordPresetsButton).toHaveClass("selected");
    verifySelectedKeys([7, 11, 2]);
  });

  test("switching to Chord Presets with C selected renders 3 notes", () => {
    const cNote = document.getElementById("circularKey00");
    fireEvent.click(cNote!);
    const chordPresetsButton = document.getElementById("mode-chords");
    fireEvent.click(chordPresetsButton!);
    expect(chordPresetsButton).toHaveClass("selected");
    verifySelectedKeys([0, 4, 7]);
  });

  test("switching Single Note mode from a non-zero inversion", () => {
    const chordPresetsButton = document.getElementById("mode-chords");
    fireEvent.click(chordPresetsButton!);
    expect(chordPresetsButton).toHaveClass("selected");

    // Click on a non-zero inversion, for example, the 'E' slice
    const inversion1Button = document.getElementById("inversion-1");
    fireEvent.click(inversion1Button!);

    // Switch back to Single Note mode after clicking on a non-zero inversion
    const singleNoteButton = document.getElementById("mode-singlenote");
    fireEvent.click(singleNoteButton!);
    expect(singleNoteButton).toHaveClass("selected");
  });
});
