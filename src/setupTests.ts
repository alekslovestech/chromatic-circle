// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock Tone.js
jest.mock("tone", () => {
  return {
    getContext: jest.fn().mockReturnValue({ state: "running" }),
    start: jest.fn().mockResolvedValue(undefined),
    Synth: jest.fn().mockImplementation(() => ({
      toDestination: jest.fn().mockReturnThis(),
      triggerAttackRelease: jest.fn(),
      dispose: jest.fn(),
    })),
    PolySynth: jest.fn().mockImplementation(() => ({
      toDestination: jest.fn().mockReturnThis(),
      triggerAttackRelease: jest.fn(),
      releaseAll: jest.fn(),
      dispose: jest.fn(),
    })),
    getDestination: jest.fn().mockReturnValue({
      volume: { value: 0 },
    }),
  };
});
