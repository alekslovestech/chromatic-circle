import { render, fireEvent } from "@testing-library/react";
import KeyboardLinear from "../../Components/KeyboardLinear";
import { NotesProvider } from "../../Components/NotesContext";
import ModeSelector from "../../Components/Settings/ModeSelector";
import StaffRenderer from "../../Components/StaffRenderer";
import PresetsSelector from "../../Components/Settings/PresetsSelector";
import { TWENTY4 } from "../../types/NoteConstants";
import { keyboardTestUtils } from "./KeyboardTestUtils";

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
    selectedIndices.forEach((index) =>
      keyboardTestUtils.expectElementToBeSelected(pianoKeys[index]),
    );
    const unselectedIndices = Array.from({ length: TWENTY4 }, (_, i) => i).filter(
      (index) => !selectedIndices.includes(index),
    );
    unselectedIndices.forEach((index) =>
      keyboardTestUtils.expectElementToBeUnselected(pianoKeys[index]),
    );
  };

  test("initial setup (G selected)", () => {
    expect(pianoKeys.length).toBe(24);

    const whiteKeys = document.querySelectorAll(".piano-key.white");
    const blackKeys = document.querySelectorAll(".piano-key.black");
    expect(whiteKeys.length).toBe(14);
    expect(blackKeys.length).toBe(10);

    const fSharpNote = document.getElementById("linearKey06");
    const gNote = document.getElementById("linearKey07");

    expect(fSharpNote).toBeInTheDocument();
    expect(fSharpNote).toHaveClass("piano-key black");
    expect(fSharpNote).toHaveTextContent("F♯");

    expect(gNote).toBeInTheDocument();
    expect(gNote).toHaveClass("piano-key white");
    expect(gNote).toHaveTextContent("G");

    fireEvent.click(gNote!);
    verifySelectedKeys([7]);
  });

  test("removing last note leaves no notes selected", () => {
    const freeFormButton = document.getElementById("mode-freeform");
    fireEvent.click(freeFormButton!);
    expect(freeFormButton).toHaveClass("selected");

    keyboardTestUtils.clickKey("linearKey07");

    verifySelectedKeys([]); //verify there are no notes left
  });

  test("7add13 chord doesn't crash", () => {
    keyboardTestUtils.clickKey("mode-chords");
    keyboardTestUtils.clickKey("preset-Chord_7Add13");
    keyboardTestUtils.clickKey("linearKey23");
  });

  test("add9 chord at A configured correctly", () => {
    keyboardTestUtils.clickKey("mode-chords");

    // Find and click the add9 chord preset button
    keyboardTestUtils.clickKey("preset-Chord_Add9");
    keyboardTestUtils.clickKey("linearKey09");
    verifySelectedKeys([9, 13, 16, 23]); //A C# E B
  });

  test("add9 chord at A# truncates correctly", () => {
    keyboardTestUtils.clickKey("mode-chords");

    keyboardTestUtils.clickKey("preset-Chord_Add9");
    keyboardTestUtils.clickKey("linearKey10");
    verifySelectedKeys([10, 14, 17]); //A# D F (truncated)
  });

  /*

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
