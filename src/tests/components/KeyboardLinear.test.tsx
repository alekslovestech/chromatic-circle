import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import KeyboardLinear from "../../Components/KeyboardLinear";
import { NotesProvider } from "../../Components/NotesContext";
import ModeSelector from "../../Components/ModeSelector";
import NotesRenderer from "../../Components/NotesRenderer";

describe("KeyboardLinear", () => {
  const renderComponent = () => {
    return render(
      <NotesProvider>
        <KeyboardLinear />
        <ModeSelector />
        <NotesRenderer />
      </NotesProvider>,
    );
  };

  test("Test modes", () => {
    renderComponent();

    const singleNotesButton = screen.getByText(/Single Notes/i);
    expect(singleNotesButton).toBeInTheDocument();
    expect(singleNotesButton).toHaveClass("active");
    expect(singleNotesButton).toHaveTextContent("Single Notes");

    const freeFormButton = screen.getByText(/Free-form Input/i);
    expect(freeFormButton).toBeInTheDocument();
    expect(freeFormButton).not.toHaveClass("active");

    fireEvent.click(freeFormButton);
    expect(freeFormButton).toHaveClass("active");
    expect(singleNotesButton).not.toHaveClass("active");
    expect(freeFormButton).toHaveTextContent("Free-form Input");
  });

  test("initial selected note is G", () => {
    renderComponent();

    const pianoKeys = document.querySelectorAll(".piano-key");

    expect(pianoKeys.length).toBe(24);

    const pianoKeysWhite = document.querySelectorAll(".piano-key.white");
    expect(pianoKeysWhite.length).toBe(14);

    const pianoKeysBlack = document.querySelectorAll(".piano-key.black");
    expect(pianoKeysBlack.length).toBe(10);

    const fSharpNote = pianoKeys[6];
    const gNote = pianoKeys[7];
    expect(fSharpNote).toBeInTheDocument();
    expect(fSharpNote).toHaveClass("piano-key black");
    expect(fSharpNote).toHaveTextContent("F♯");
    expect(gNote).toBeInTheDocument();
    expect(gNote).toHaveClass("piano-key white");
    expect(gNote).toHaveTextContent("G");
    fireEvent.click(gNote);
    expect(gNote).toHaveClass("selected");
  });

  test("removing last note doesn't crash", () => {
    renderComponent();

    const freeFormButton = screen.getByText(/Free-form Input/i);
    fireEvent.click(freeFormButton);
    expect(freeFormButton).toHaveClass("active");

    const pianoKeys = document.querySelectorAll(".piano-key");
    const gNote = pianoKeys[7];

    // Wrap the click event in a function to check if it throws an error
    fireEvent.click(gNote); //removing the last note can throw
    expect(gNote).not.toHaveClass("selected");
  });
});
