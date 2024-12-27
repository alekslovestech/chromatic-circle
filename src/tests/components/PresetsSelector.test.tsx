import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import PresetsSelector from "../../Components/Settings/PresetsSelector";
import { NotesProvider } from "../../Components/NotesContext";
import { ModeSelector } from "../../Components/Settings/ModeSelector";

describe("ChordPresetsSelector", () => {
  const renderComponent = () => {
    return render(
      <NotesProvider>
        <PresetsSelector />
      </NotesProvider>,
    );
  };

  test.skip("selecting a new chord resets inversion to 0", () => {
    renderComponent();

    // Select a chord with inversions (e.g., major triad)
    fireEvent.click(screen.getByText("maj"));

    // Select an inversion other than 0
    fireEvent.click(screen.getByText("1"));

    // Select a different chord
    fireEvent.click(screen.getByText("Minor"));

    // Check that the inversion is reset to 0
    expect(screen.getByText("0")).toHaveStyle("background-color: #4CAF50");
  });

  test.skip("inversion buttons are only shown for chords with inversions", () => {
    renderComponent();

    // Select a chord with inversions
    fireEvent.click(screen.getByText("maj"));
    expect(screen.getByText("Inversion:")).toBeInTheDocument();

    // Select a chord without inversions (e.g., single note)
    fireEvent.click(screen.getByText("Single Note"));
    expect(screen.queryByText("Inversion:")).not.toBeInTheDocument();
  });

  test.skip("selecting an inversion updates the chord", () => {
    renderComponent();

    // Select a chord with inversions (e.g., major triad)
    fireEvent.click(screen.getByText("Major"));

    // Select the first inversion
    fireEvent.click(screen.getByText("1"));

    // Check that the inversion is updated
    expect(screen.getByText("1")).toHaveStyle("background-color: #4CAF50");

    // You might also want to check if the actual notes have been updated
    // This would require mocking the ChordAndIntervalManager or checking the context
  });
});
