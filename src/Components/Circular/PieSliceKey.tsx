import React from "react";
import { ActualIndex } from "../../types/IndexTypes";
import { useNotes } from "../NotesContext";
import { getNoteTextFromIndex } from "../../utils/NoteUtils";
import { getBlackWhiteString } from "../../utils/ColorUtils";
import PieSliceBase from "./PieSliceBase";
import { CommonMath } from "../../utils/CommonMath";
import { PolarMath } from "../../utils/PolarMath";
import { PieSliceBaseProps } from "./PieSliceBase";

type PieSliceKeyProps = Required<
  Pick<PieSliceBaseProps, "actualIndex" | "outerRadius" | "innerRadius" | "onClick" | "showText">
>;

const PieSliceKey: React.FC<PieSliceKeyProps> = ({
  actualIndex,
  outerRadius,
  innerRadius,
  onClick,
  showText,
}) => {
  const { selectedNoteIndices, selectedAccidental } = useNotes();
  const isSelected = selectedNoteIndices.includes(actualIndex);
  const blackWhiteString = getBlackWhiteString(actualIndex);
  const classNames = ["pie-slice-key", blackWhiteString];
  if (isSelected) classNames.push("selected");

  const { middleAngle } = CommonMath.NoteIndexToAngles(actualIndex);
  const textPoint = PolarMath.getCartesianFromPolar((innerRadius + outerRadius) * 0.5, middleAngle);

  return (
    <PieSliceBase
      actualIndex={actualIndex}
      outerRadius={outerRadius}
      innerRadius={innerRadius}
      className={classNames.join(" ")}
      onClick={onClick}
    >
      {showText && (
        <text x={textPoint.x} y={textPoint.y} textAnchor="middle" dominantBaseline="middle">
          {getNoteTextFromIndex(actualIndex, selectedAccidental)}
        </text>
      )}
    </PieSliceBase>
  );
};

export default PieSliceKey;
