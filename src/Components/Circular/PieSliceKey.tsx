import { ActualIndex } from "../../types/IndexTypes";
import { TWELVE } from "../../types/NoteConstants";
import { getBlackWhiteString } from "../../utils/ColorUtils";
import { CommonMath } from "../../utils/CommonMath";
import { getNoteTextFromIndex } from "../../utils/NoteUtils";
import { PolarMath } from "../../utils/PolarMath";
import { useNotes } from "../NotesContext";

interface PieSliceProps {
  actualIndex: ActualIndex;
  onClick: () => void;
  outerRadius: number;
  innerRadius: number;
  showText: boolean;
}

const PieSliceKey: React.FC<PieSliceProps> = ({
  actualIndex,
  onClick,
  outerRadius,
  innerRadius,
  showText,
}) => {
  const { selectedNoteIndices, selectedAccidental } = useNotes();
  const { startAngle, middleAngle, endAngle } = CommonMath.NoteIndexToAngles(actualIndex);

  const outerStart = PolarMath.getCartesianFromPolar(outerRadius, startAngle);
  const outerEnd = PolarMath.getCartesianFromPolar(outerRadius, endAngle);
  const innerStart = PolarMath.getCartesianFromPolar(innerRadius, startAngle);
  const innerEnd = PolarMath.getCartesianFromPolar(innerRadius, endAngle);

  const blackWhiteClass = getBlackWhiteString(actualIndex);

  const isSelected0 = selectedNoteIndices.includes(actualIndex);
  const isSelected1 = selectedNoteIndices.includes((actualIndex + TWELVE) as ActualIndex);
  const isSelected = isSelected0 || isSelected1;

  const selectedClass = isSelected ? "selected" : "";
  const middleRadius = (innerRadius + outerRadius) / 2;
  const textPosition = PolarMath.getCartesianFromPolar(middleRadius, middleAngle);

  const pathData = [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");

  return (
    <g className={`pie-slice-key ${blackWhiteClass} ${selectedClass}`}>
      <path d={pathData} onClick={onClick} />
      {showText && (
        <text x={textPosition.x} y={textPosition.y} textAnchor="middle" dominantBaseline="middle">
          {getNoteTextFromIndex(actualIndex, selectedAccidental)}
        </text>
      )}
    </g>
  );
};

export default PieSliceKey;
