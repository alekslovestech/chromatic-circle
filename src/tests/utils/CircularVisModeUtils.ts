import { CircularVisMode } from "../../types/SettingModes";
import { ReactTestUtils } from "./ReactTestUtils";

import "../../styles/CircularVis.css";

export const CircularVisModeUtils = {
  //the state of "None" / "Radial" / "Polygon" buttons respectively
  verifyVisButtonsEnabled: (enabledState: boolean[]) => {
    expect(enabledState.length).toBe(3);
    const visButtons = document.querySelectorAll(".vis-button");
    enabledState.forEach((enabled, index) => {
      const curVisButton = visButtons[index];
      if (enabled) {
        ReactTestUtils.expectElementToBeEnabled(curVisButton);
      } else {
        ReactTestUtils.expectElementToBeDisabled(curVisButton);
      }
    });
  },

  verifyVisButtonsSelected: (selectedVisMode: CircularVisMode) => {
    const visButtons = document.querySelectorAll("[id^='vis-button']");
    visButtons.forEach((button) => {
      if (button.id === selectedVisMode) {
        ReactTestUtils.expectElementToBeSelected(button);
      } else {
        ReactTestUtils.expectElementToBeUnselected(button);
      }
    });
  },
};
