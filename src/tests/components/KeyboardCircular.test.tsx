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

  it("renders 12 pie slices", () => {
    expect(circularKeys.length).toBe(12);
  });

  test("test initial setup (G selected)", () => {
    verifySelectedKeys([7]);
  });

  it("handles click on the 'C' slice", () => {
    const cNote = document.getElementById("circularKey00");
    fireEvent.click(cNote!);
    verifySelectedKeys([0]);
  });

  it("handles click on the 'A' slice", () => {
    const aNote = document.getElementById("circularKey09");
    fireEvent.click(aNote!);
    verifySelectedKeys([9]);
  });
});
