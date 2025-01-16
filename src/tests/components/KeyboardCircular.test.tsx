import { render } from "@testing-library/react";
import KeyboardCircular from "../../Components/Circular/KeyboardCircular";
import { NotesProvider } from "../../Components/NotesContext";
import ModeSelector from "../../Components/Settings/ModeSelector";
import StaffRenderer from "../../Components/StaffRenderer";
import PresetsSelector from "../../Components/Settings/PresetsSelector";
import { TWELVE } from "../../types/NoteConstants";
import { keyboardTestUtils } from "./KeyboardTestUtils";

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
    selectedIndices.forEach((index) =>
      keyboardTestUtils.expectElementToBeSelected(circularKeys[index]),
    );
    const unselectedIndices = Array.from({ length: TWELVE }, (_, i) => i).filter(
      (index) => !selectedIndices.includes(index),
    );
    unselectedIndices.forEach((index) =>
      keyboardTestUtils.expectElementToBeUnselected(circularKeys[index]),
    );
  };

  test("renders 12 pie slices", () => {
    expect(circularKeys.length).toBe(12);
  });

  test("test initial setup (G selected)", () => {
    verifySelectedKeys([7]);
  });

  test("handles click on the 'C' slice", () => {
    keyboardTestUtils.clickKey("circularKey00");
    verifySelectedKeys([0]);
  });

  test("handles click on the 'A' slice", () => {
    keyboardTestUtils.clickKey("circularKey09");
    verifySelectedKeys([9]);
  });

  test("switching mode to Freeform renders 1 note (still)", () => {
    keyboardTestUtils.clickKey("mode-freeform");
    verifySelectedKeys([7]);
  });

  test("switching mode to Interval Presets and then Freeform renders 2 notes (still)", () => {
    keyboardTestUtils.clickKey("mode-intervals");
    keyboardTestUtils.clickKey("mode-freeform");

    verifySelectedKeys([7, 11]);
  });

  test("switching mode to Chord Presets and then Freeform renders 3 notes", () => {
    keyboardTestUtils.clickKey("mode-chords");
    keyboardTestUtils.clickKey("mode-freeform");

    verifySelectedKeys([7, 11, 2]);
  });

  test("switching mode to Interval Presets renders 2 notes", () => {
    keyboardTestUtils.clickKey("mode-intervals");
    verifySelectedKeys([7, 11]);
  });

  test("switching mode to Chord Presets renders 3 notes", () => {
    keyboardTestUtils.clickKey("mode-chords");
    verifySelectedKeys([7, 11, 2]);
  });

  test("switching to Chord Presets with C selected renders 3 notes", () => {
    keyboardTestUtils.clickKey("circularKey00");
    keyboardTestUtils.clickKey("mode-chords");
    verifySelectedKeys([0, 4, 7]);
  });

  test("switching Single Note mode from a non-zero inversion doens't crash", () => {
    keyboardTestUtils.clickKey("mode-chords");
    keyboardTestUtils.clickKey("inversion-1");
    keyboardTestUtils.clickKey("mode-singlenote");
  });
});
