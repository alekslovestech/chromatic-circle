import React from "react";
import { useKeyboardHandlers } from "./useKeyboardHandlers";
import { useMusical } from "../../../contexts/MusicalContext";
import { usePreset } from "../../../contexts/PresetContext";
import { ActualIndex } from "../../../types/IndexTypes";

export const KeyboardBase = () => {
  const { handleKeyClick, checkIsRootNote } = useKeyboardHandlers();
  const { selectedNoteIndices, selectedMusicalKey } = useMusical();
  const { inputMode, selectedChordType, selectedInversionIndex } = usePreset();

  return null; // This is a base component that should be extended by specific implementations
};
