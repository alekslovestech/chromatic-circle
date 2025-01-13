import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
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
    circularKeys = document.querySelectorAll("[id^='circularKey']");
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

  test("switching mode to Interval Presets renders 2 notes", () => {
    const intervalPresetsButton = screen.getByText(/Interval Presets/i);
    fireEvent.click(intervalPresetsButton);
    expect(intervalPresetsButton).toHaveClass("active");

    // Verify that there are 2 selected notes in interval mode
    const selectedNotes = document.querySelectorAll("[id^='circularKey'].selected");
    expect(selectedNotes.length).toBe(2);
    verifySelectedKeys([7, 11]);
  });

  test("switching mode to Chord Presets renders 3 notes", () => {
    const intervalPresetsButton = screen.getByText(/Chord Presets/i);
    fireEvent.click(intervalPresetsButton);
    expect(intervalPresetsButton).toHaveClass("active");

    // Verify that there are 3 selected notes in chord mode
    const selectedNotes = document.querySelectorAll("[id^='circularKey'].selected");
    expect(selectedNotes.length).toBe(3);
    //verifySelectedKeys([7, 11]);
  });

  test("switching to Chord Presets with C selected renders 3 notes", () => {
    const cNote = document.getElementById("circularKey00");
    fireEvent.click(cNote!);
    verifySelectedKeys([0]);
    const chordPresetsButton = screen.getByText(/Chord Presets/i);
    fireEvent.click(chordPresetsButton);
    expect(chordPresetsButton).toHaveClass("active");

    // Verify that there are 2 selected notes in interval mode
    const selectedNotes = document.querySelectorAll("[id^='circularKey'].selected");
    expect(selectedNotes.length).toBe(3);
    verifySelectedKeys([0, 4, 7]);
  });
});
