import { fireEvent } from "@testing-library/react";

export const keyboardTestUtils = {
  clickKey: (keyId: string) => {
    const key = document.getElementById(keyId);
    fireEvent.click(key!);
  },
};
