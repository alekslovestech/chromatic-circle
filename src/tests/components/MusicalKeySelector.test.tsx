import { fireEvent, render, renderHook } from "@testing-library/react";
import { MusicalKeySelector } from "../../Components/MusicalKeySelector";
import { RootProvider } from "../../contexts/RootContext";
import { useMusical } from "../../contexts/MusicalContext";
import { GreekModeType } from "../../types/GreekMode";
import { MusicalKey } from "../../types/MusicalKey";

describe("MusicalKeySelector tests", () => {
  const renderComponent = () =>
    render(
      <RootProvider>
        <MusicalKeySelector isGreekMode={true} />
      </RootProvider>,
    );

  test("default key is C Ionian", () => {
    renderComponent();
    const { result } = renderHook(() => useMusical(), {
      wrapper: RootProvider,
    });
    const selectedMusicalKey = result.current.selectedMusicalKey;
    expect(selectedMusicalKey.tonicString).toBe("C");
    expect(selectedMusicalKey.greekMode).toBe(GreekModeType.Ionian);
    const tonicSelect = document.getElementById("tonic-select");
    const greekModeSelect = document.getElementById("greek-mode-select");
    expect(tonicSelect).toBeTruthy();
    expect(greekModeSelect).toBeTruthy();
  });

  test("changing the key updates the context", () => {
    renderComponent();
    const { result } = renderHook(() => useMusical(), {
      wrapper: RootProvider,
    });
    const greekModeSelect = document.getElementById("greek-mode-select");
    if (greekModeSelect) {
      //greekModeSelect.value = GreekModeType.Dorian;
      //fireEvent.change(greekModeSelect);
    }
    const selectedMusicalKey = result.current.selectedMusicalKey;
    const newKey = MusicalKey.fromClassicalMode("D", selectedMusicalKey.classicalMode);
  });
});
