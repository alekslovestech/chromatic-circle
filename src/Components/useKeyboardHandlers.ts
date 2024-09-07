import { useCallback } from "react";
import { useNotes } from "./NotesContext";
import { ActualIndex, ChromaticIndex } from "../types/IndexTypes";
import { calculateUpdatedIndices, isRootNote } from "../utils/KeyboardUtils";

export function useKeyboardHandlers() {
  const {
    selectedNoteIndices,
    setSelectedNoteIndices,
    selectedInversionIndex,
    selectedChordType,
    inputMode,
  } = useNotes();

  const handleKeyClick = useCallback(
    (newIndex: ActualIndex | ChromaticIndex) => {
      const updatedIndices = calculateUpdatedIndices(
        newIndex,
        inputMode,
        selectedNoteIndices,
        selectedChordType,
        selectedInversionIndex,
      );
      setSelectedNoteIndices(updatedIndices);
    },
    [
      inputMode,
      selectedNoteIndices,
      selectedChordType,
      selectedInversionIndex,
      setSelectedNoteIndices,
    ],
  );

  const checkIsRootNote = useCallback(
    (index: ActualIndex) => {
      return isRootNote(
        index,
        selectedNoteIndices,
        selectedInversionIndex,
        inputMode,
        selectedChordType,
      );
    },
    [selectedNoteIndices, selectedInversionIndex, inputMode, selectedChordType],
  );

  return {
    handleKeyClick,
    checkIsRootNote,
  };
}
