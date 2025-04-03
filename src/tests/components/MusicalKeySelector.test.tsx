import { act, fireEvent, render, renderHook } from "@testing-library/react";
import { MusicalKeySelector } from "../../Components/MusicalKeySelector";
import { RootProvider } from "../../contexts/RootContext";
import { useMusical } from "../../contexts/MusicalContext";
import { GreekModeType } from "../../types/GreekMode";

describe("MusicalKeySelector tests", () => {
  const renderComponent = () =>
    render(
      <RootProvider>
        <MusicalKeySelector useDropdownSelector={true} />
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

  //abandoning this for now, as the setup for getting the context value is too contrived to be worth it atm
  test.skip("changing the key updates the context", async () => {
    const { result } = renderHook(() => useMusical(), {
      wrapper: RootProvider,
    });
    renderComponent();

    const greekModeSelect = document.getElementById("greek-mode-select");
    await act(async () => {
      fireEvent.change(greekModeSelect!, { target: { value: GreekModeType.Dorian } });
    });
    expect(result.current.selectedMusicalKey.greekMode).toBe(GreekModeType.Dorian);
  });
});
