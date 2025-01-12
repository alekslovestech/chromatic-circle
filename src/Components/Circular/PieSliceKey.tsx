import React from "react";
import { useNotes } from "../NotesContext";
import PieSliceBase, { PieSliceBaseProps } from "./PieSliceBase";

const PieSliceKey: React.FC<PieSliceBaseProps> = ({
  id,
  actualIndex,
  outerRadius,
  innerRadius,
  onClick,
}) => {
  const { selectedNoteIndices } = useNotes();

  const isSelected = selectedNoteIndices.includes(actualIndex);
  return (
    <PieSliceBase
      id={id}
      actualIndex={actualIndex}
      outerRadius={outerRadius}
      innerRadius={innerRadius}
      onClick={onClick}
      isSelected={isSelected}
      showText={true}
    />
  );
};

export default PieSliceKey;
