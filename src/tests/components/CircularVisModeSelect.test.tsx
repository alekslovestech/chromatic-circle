import { render } from "@testing-library/react";

import { CircularVisMode } from "../../types/SettingModes";

import { RootProvider } from "../../contexts/RootContext";

import { InputModeSelector } from "../../Components/Settings/InputModeSelector";
import { CircularVisModeSelect } from "../../Components/Circular/CircularVisModeSelect";

import { ReactTestUtils } from "./utils/ReactTestUtils";
import { CircularVisModeUtils } from "./utils/CircularVisModeUtils";

import "../../styles/CircularVis.css";

describe("InputModeSelector with CircularVisModeSelect", () => {
  const renderComponent = () =>
    render(
      <RootProvider>
        <InputModeSelector />
        <CircularVisModeSelect />
      </RootProvider>,
    );

  describe("CircularVisModeSelect Behavior", () => {
    beforeEach(() => {
      renderComponent();
    });

    test("initializes with Single Note mode active", () => {
      CircularVisModeUtils.verifyVisButtonsEnabled([true, false, false]);
      CircularVisModeUtils.verifyVisButtonsSelected(CircularVisMode.None);
    });

    test("switches from Single Note to Freeform mode correctly", () => {
      ReactTestUtils.clickKey("mode-freeform");
      CircularVisModeUtils.verifyVisButtonsEnabled([true, true, true]);
    });

    describe("Input Mode Changes", () => {
      test("in Interval Mode, only the first two buttons are enabled", () => {
        ReactTestUtils.clickKey("mode-intervals");
        CircularVisModeUtils.verifyVisButtonsEnabled([true, true, false]);
        CircularVisModeUtils.verifyVisButtonsSelected(CircularVisMode.Radial);
      });

      test("in Chord Mode, all three buttons are enabled", () => {
        ReactTestUtils.clickKey("mode-chords");
        CircularVisModeUtils.verifyVisButtonsEnabled([true, true, true]);
        CircularVisModeUtils.verifyVisButtonsSelected(CircularVisMode.Polygon);
      });
    });
  });
});
