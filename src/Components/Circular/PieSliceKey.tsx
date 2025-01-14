import React from "react";
import { useNotes } from "../NotesContext";
import PieSliceBase, { PieSliceBaseProps } from "./PieSliceBase";
import { TWELVE } from "../../types/NoteConstants";
import {
  ActualIndex,
  chromaticToActual,
  isSelectedEitherOctave,
  ixOctaveOffset,
} from "../../types/IndexTypes";

const PieSliceKey: React.FC<PieSliceBaseProps> = ({
  chromaticIndex,
  outerRadius,
  innerRadius,
  onClick,
}) => {
  const { selectedNoteIndices } = useNotes();

  const isSelected = isSelectedEitherOctave(chromaticIndex, selectedNoteIndices);
  return (
    <PieSliceBase
      chromaticIndex={chromaticIndex}
      outerRadius={outerRadius}
      innerRadius={innerRadius}
      onClick={onClick}
      isSelected={isSelected}
      showText={true}
    />
  );
};

export default PieSliceKey;
