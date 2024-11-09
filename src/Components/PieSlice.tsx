import { ActualIndex } from "../types/IndexTypes";
import { getBlackWhiteString } from "../utils/ColorUtils";
import { CommonMath } from "../utils/CommonMath";
import { getNoteTextFromIndex } from "../utils/NoteUtils";
import { PolarMath } from "../utils/PolarMath";
import { useNotes } from "./NotesContext";

interface PieSliceProps {
  index: ActualIndex;
  onClick: () => void;
  outerRadius: number;
  innerRadius: number;
}

const PieSliceKey: React.FC<PieSliceProps> = ({ index, onClick, outerRadius, innerRadius }) => {
  const { selectedNoteIndices, selectedAccidental } = useNotes();
  const { startAngle, middleAngle, endAngle } = CommonMath.NoteIndexToAngles(index);

  const outerStart = PolarMath.getCartesianFromPolar(outerRadius, startAngle);
  const outerEnd = PolarMath.getCartesianFromPolar(outerRadius, endAngle);
  const innerStart = PolarMath.getCartesianFromPolar(innerRadius, startAngle);
  const innerEnd = PolarMath.getCartesianFromPolar(innerRadius, endAngle);

  const blackWhiteClass = getBlackWhiteString(index as ActualIndex);
  const isSelected = selectedNoteIndices.includes(index as ActualIndex);
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
      <text x={textPosition.x} y={textPosition.y} textAnchor="middle" dominantBaseline="middle">
        {getNoteTextFromIndex(index as ActualIndex, selectedAccidental)}
      </text>
    </g>
  );
};

export default PieSliceKey;
