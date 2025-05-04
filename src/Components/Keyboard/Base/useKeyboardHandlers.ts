import { useCallback } from "react";

import { ActualIndex } from "../../../types/IndexTypes";
import { isRootNote } from "../../../utils/KeyboardUtils";
import { useMusical } from "../../../contexts/MusicalContext";
import { usePreset } from "../../../contexts/PresetContext";
import { ChordUtils } from "../../../utils/ChordUtils";
import { InputMode } from "../../../types/SettingModes";

export function useKeyboardHandlers() {
  const { selectedInversionIndex, selectedChordType, inputMode } = usePreset();
  const { selectedNoteIndices, setSelectedNoteIndices } = useMusical();

  const handleKeyClick = useCallback(
    (newIndex: ActualIndex) => {
      const updatedIndices = ChordUtils.calculateUpdatedIndices(
        newIndex,
        inputMode === InputMode.Toggle,
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
