import { render, fireEvent } from "@testing-library/react";
import KeyboardLinear from "../../Components/KeyboardLinear";
import { NotesProvider } from "../../Components/NotesContext";
import ModeSelector from "../../Components/Settings/ModeSelector";
import StaffRenderer from "../../Components/StaffRenderer";
import PresetsSelector from "../../Components/Settings/PresetsSelector";
import { TWENTY4 } from "../../types/NoteConstants";

describe("KeyboardLinear", () => {
  const renderComponent = () => {
    return render(
      <NotesProvider>
        <KeyboardLinear />
        <ModeSelector />
        <PresetsSelector />
        <StaffRenderer />
      </NotesProvider>,
    );
  };

  let pianoKeys: NodeListOf<Element>;

  beforeEach(() => {
    renderComponent();
    pianoKeys = document.querySelectorAll("[id^='linearKey']");
  });

  const verifySelectedKeys = (selectedIndices: number[]) => {
    selectedIndices.forEach((index) => {
      expect(pianoKeys[index]).toHaveClass("selected");
    });
    const unselectedIndices = Array.from({ length: TWENTY4 }, (_, i) => i).filter(
      (index) => !selectedIndices.includes(index),
    );
    unselectedIndices.forEach((index) => {
      expect(pianoKeys[index]).not.toHaveClass("selected");
    });
  };

  test("test initial setup (G selected)", () => {
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
    verifySelectedKeys([7]);
  });
  /*
  test("removing last note doesn't crash", () => {
    const freeFormButton = screen.getByText(/Free-form Input/i);
    fireEvent.click(freeFormButton);
    expect(freeFormButton).toHaveClass("active");

    const gNote = pianoKeys[7];

    fireEvent.click(gNote); //removing the last note might throw
    verifySelectedKeys([]); //verify there are no notes left
  });

  test("7add13 chord doesn't crash", () => {
    const chordPresetsButton = screen.getByText(/Chord Presets/i);
    fireEvent.click(chordPresetsButton);
    expect(chordPresetsButton).toHaveClass("active");

    // Find and click the 7add13 chord preset button
    const sevenAdd13Button = screen.getByText(/7add13/i);
    expect(sevenAdd13Button).toBeInTheDocument();
    fireEvent.click(sevenAdd13Button);

    const bNote = pianoKeys[23];
    fireEvent.click(bNote);
  });

  test("add9 chord at A configured correctly", () => {
    const chordPresetsButton = screen.getByText(/Chord Presets/i);
    fireEvent.click(chordPresetsButton);
    expect(chordPresetsButton).toHaveClass("active");

    // Find and click the add9 chord preset button
    const add9Button = screen.getByText(/add9/i);
    expect(add9Button).toBeInTheDocument();
    fireEvent.click(add9Button);

    const aNote = pianoKeys[9];
    fireEvent.click(aNote);
    verifySelectedKeys([9, 13, 16, 23]); //A C# E B
  });

  test("add9 chord at A# truncates correctly", () => {
    const chordPresetsButton = screen.getByText(/Chord Presets/i);
    fireEvent.click(chordPresetsButton);

    // Find and click the add9 chord preset button
    const add9Button = screen.getByText(/add9/i);
    fireEvent.click(add9Button);

    const aSharpNote = pianoKeys[10];
    fireEvent.click(aSharpNote);
    verifySelectedKeys([10, 14, 17]); //A# D F (truncated)
  });

  //NB: these tests are not very good, because they are testing
  //the behavior of the chord presets,
  //and not the keyboard functionality.
  //TODO: refactor so that the keyboard and chord presets are separate components
  //and test the behavior of the keyboard functionality.
  //also: the behavior is currently not crystalized, so add test conservatively until it's clearer
  test("When inversion 1 is selected, clicking around on the keyboard should only produce inversion 1", () => {
    verifySelectedKeys([7]);
    //select chord presets
    const chordPresetsButton = screen.getByText(/Chord Presets/i);
    fireEvent.click(chordPresetsButton);
    expect(chordPresetsButton).toHaveClass("active");

    // Select major chord
    const majorChordButton = screen.getByText("maj");
    expect(majorChordButton).toHaveClass("selected-preset");

    const lowC = pianoKeys[0];
    fireEvent.click(lowC);
    verifySelectedKeys([0, 4, 7]);

    // Select inversion 1
    const inversion1Button = screen.getByText("1");
    fireEvent.click(inversion1Button);
    expect(inversion1Button).toHaveClass("selected-inversion");

    verifySelectedKeys([4, 7, 12]);
    // Verify that the 12th key (C in the second octave) is a root note
    const secondOctaveC = pianoKeys[12];
    expect(secondOctaveC).toHaveClass("root-note");

    // Click on different keys and expect inversion 1 to be maintained
    fireEvent.click(pianoKeys[14]); // Clicking on D in the 2nd octave
    verifySelectedKeys([6, 9, 14]);
    const secondOctaveD = pianoKeys[14];
    expect(secondOctaveD).toHaveClass("root-note");
  }); */
});
