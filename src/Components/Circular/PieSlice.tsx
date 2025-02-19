import React from "react";
import { chromaticToActual, ixOctaveOffset } from "../../types/IndexTypes";
import { PolarMath } from "../../utils/PolarMath";
import { getBlackWhiteString } from "../../utils/ColorUtils";
import { getNoteTextFromActualIndex } from "../../utils/NoteUtils";
import { useNotes } from "../NotesContext";
import { IndexUtils } from "../../utils/IndexUtils";
import { ChromaticIndex } from "../../types/ChromaticIndex";
import { isSelectedEitherOctave } from "../../utils/KeyboardUtils";
import { SvgElements } from "./SVGElements";

const PieSlice: React.FC<{
  chromaticIndex: ChromaticIndex;
  outerRadius: number;
  innerRadius: number;
  onClick: () => void;
  isLogo: boolean;
}> = ({ chromaticIndex, outerRadius, innerRadius, onClick, isLogo }) => {
  const actualIndex = chromaticToActual(chromaticIndex, ixOctaveOffset(0));
  const { selectedMusicalKey, selectedNoteIndices } = useNotes();
  const pathElement = SvgElements.getArcPathFromIndex(actualIndex, outerRadius, innerRadius);
  const middleAngle = PolarMath.NoteIndexToMiddleAngle(actualIndex);
  const textPoint = PolarMath.getCartesianFromPolar((innerRadius + outerRadius) * 0.5, middleAngle);

  const blackWhiteString = getBlackWhiteString(actualIndex);
  const classNames = ["pie-slice-key", blackWhiteString];
  const isSelected = isLogo ? false : isSelectedEitherOctave(chromaticIndex, selectedNoteIndices);

  if (isSelected) classNames.push("selected");

  const id = IndexUtils.StringWithPaddedIndex("circularKey", chromaticIndex);
  const showText = !isLogo;
  return (
    <g id={id} className={classNames.join(" ")} onClick={onClick}>
      {pathElement}
      {showText && (
        <text x={textPoint.x} y={textPoint.y} textAnchor="middle" dominantBaseline="middle">
          {getNoteTextFromActualIndex(actualIndex, selectedMusicalKey.getDefaultAccidental())}
        </text>
      )}
    </g>
  );
};

export default PieSlice;
