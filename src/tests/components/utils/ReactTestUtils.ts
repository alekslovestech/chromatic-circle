import { fireEvent } from "@testing-library/react";

export const ReactTestUtils = {
  clickKey: (keyId: string) => {
    const key = document.getElementById(keyId);
    fireEvent.click(key!);
  },

  expectElementToBeSelected: (element: Element) => {
    expect(element).toHaveClass("selected");
  },

  expectElementToBeUnselected: (element: Element) => {
    expect(element).not.toHaveClass("selected");
  },

  expectElementByIdToBeSelected: (id: string) => {
    const element = document.getElementById(id);
    expect(element).toHaveClass("selected");
  },

  expectElementByIdToBeUnselected: (id: string) => {
    const element = document.getElementById(id);
    expect(element).not.toHaveClass("selected");
  },

  expectElementByIdToBeInTheDocument: (id: string) => {
    const element = document.getElementById(id);
    expect(element).toBeInTheDocument();
  },

  expectElementByIdNotToBeInTheDocument: (id: string) => {
    const element = document.getElementById(id);
    expect(element).not.toBeInTheDocument();
  },

  expectElementToBeEnabled: (element: Element) => {
    expect(element).toBeEnabled();
  },

  expectElementToBeDisabled: (element: Element) => {
    expect(element).toBeDisabled();
  },
};
