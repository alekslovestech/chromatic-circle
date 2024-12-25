import React from "react";
import { getBlackWhiteString } from "../../utils/ColorUtils";
import PieSliceBase from "./PieSliceBase";
import { PieSliceBaseProps } from "./PieSliceBase";

type PieSliceLogoProps = Required<
  Pick<PieSliceBaseProps, "actualIndex" | "outerRadius" | "innerRadius">
>;

const PieSliceLogo: React.FC<PieSliceLogoProps> = ({ actualIndex, outerRadius, innerRadius }) => {
  const blackWhiteString = getBlackWhiteString(actualIndex);
  const classNames = ["pie-slice-key", blackWhiteString];

  return (
    <PieSliceBase
      actualIndex={actualIndex}
      outerRadius={outerRadius}
      innerRadius={innerRadius}
      className={classNames.join(" ")}
    />
  );
};

export default PieSliceLogo;
