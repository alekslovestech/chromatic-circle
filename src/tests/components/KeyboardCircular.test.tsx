import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import KeyboardCircular from "../../Components/Circular/KeyboardCircular";
import { NotesProvider } from "../../Components/NotesContext";
import ModeSelector from "../../Components/Settings/ModeSelector";
import StaffRenderer from "../../Components/StaffRenderer";
import PresetsSelector from "../../Components/Settings/PresetsSelector";
import { TWELVE } from "../../types/NoteConstants";
import { ChromaticIndex, ixChromatic } from "../../types/IndexTypes";

describe("KeyboardCircular", () => {
  const renderComponent = () => {
    return render(
      <NotesProvider>
        <KeyboardCircular />
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

  test.skip("test initial setup (G selected)", () => {
    expect(circularKeys.length).toBe(12);
    const gNote = document.getElementById("circularKey07");
    expect(gNote).toBeInTheDocument();
    expect(gNote).toHaveClass("pie-slice-key white selected");
    expect(gNote).toHaveTextContent("G");
    const aNote = document.getElementById("circularKey09");
    expect(aNote).toBeInTheDocument();
    expect(aNote).toHaveClass("pie-slice-key white");
    expect(aNote).toHaveTextContent("A");
    expect(aNote).not.toHaveClass("selected");
  });

  test("test initial setup (G selected - full)", () => {
    expect(circularKeys.length).toBe(12);
    verifySelectedKeys([7]);
    const aNote = document.getElementById("circularKey09");
    if (aNote) {
      fireEvent.click(aNote);
      verifySelectedKeys([9]);
    } else {
      throw new Error("aNote not found");
    }
  });
});
