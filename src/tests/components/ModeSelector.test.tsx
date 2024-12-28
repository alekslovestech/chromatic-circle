import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
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

  test("Default mode is Single Note", () => {
    renderComponent();
    expect(screen.getByText("Single Note")).toBeInTheDocument();
  });

  describe("when IntervalPresets mode is selected", () => {
    beforeEach(() => {
      renderComponent();
      fireEvent.click(screen.getByText("Interval Presets"));
    });

    test("shows 'TT' button", () => {
      expect(screen.getByText("TT")).toBeInTheDocument();
    });

    test("does not show 'sus2' button", () => {
      expect(screen.queryByText("sus2")).not.toBeInTheDocument();
    });

    test("does not show 'Inversions'", () => {
      expect(screen.queryByText("Inversions")).not.toBeInTheDocument();
    });
  });

  describe("when ChordPresets mode is selected", () => {
    beforeEach(() => {
      renderComponent();
      fireEvent.click(screen.getByText("Chord Presets"));
    });

    test("shows 'sus2' button", () => {
      expect(screen.getByText("sus2")).toBeInTheDocument();
    });

    test("does not show 'TT' button", () => {
      expect(screen.queryByText("TT")).not.toBeInTheDocument();
    });

    test("shows 'Inversion'", () => {
      expect(screen.getByText("Inversion")).toBeInTheDocument();
    });
  });
});
