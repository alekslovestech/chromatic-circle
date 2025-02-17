import React from "react";
import { useNotes } from "../NotesContext";
import PieSliceBase, { PieSliceBaseProps } from "./PieSliceBase";
import { isSelectedEitherOctave } from "../../utils/KeyboardUtils";

const PieSliceKey: React.FC<PieSliceBaseProps> = ({
  chromaticIndex,
  outerRadius,
  innerRadius,
  onClick,
  isLogo = false,
}) => {
  const { selectedNoteIndices } = useNotes();

  const isSelected = isLogo ? false : isSelectedEitherOctave(chromaticIndex, selectedNoteIndices);
  return (
    <PieSliceBase
      chromaticIndex={chromaticIndex}
      outerRadius={outerRadius}
      innerRadius={innerRadius}
      onClick={onClick}
      isSelected={isSelected}
      showText={true}
      isLogo={isLogo}
    />
  );
};

export default PieSliceKey;
