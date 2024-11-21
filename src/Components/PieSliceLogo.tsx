import { ActualIndex } from "../types/IndexTypes";
import { getBlackWhiteString } from "../utils/ColorUtils";
import { CommonMath } from "../utils/CommonMath";
import { PolarMath } from "../utils/PolarMath";

interface PieSliceLogoProps {
  actualIndex: ActualIndex;
  outerRadius: number;
  innerRadius: number;
}
const PieSliceLogo: React.FC<PieSliceLogoProps> = ({ actualIndex, outerRadius, innerRadius }) => {
  const { startAngle, endAngle } = CommonMath.NoteIndexToAngles(actualIndex);

  const outerStart = PolarMath.getCartesianFromPolar(outerRadius, startAngle);
  const outerEnd = PolarMath.getCartesianFromPolar(outerRadius, endAngle);
  const innerStart = PolarMath.getCartesianFromPolar(innerRadius, startAngle);
  const innerEnd = PolarMath.getCartesianFromPolar(innerRadius, endAngle);

  const blackWhiteClass = getBlackWhiteString(actualIndex);

  const pathData = [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");

  return (
    <g className={`pie-slice-key ${blackWhiteClass}`}>
      <path d={pathData} />
    </g>
  );
};

export default PieSliceLogo;
