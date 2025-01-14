import React from "react";
import PieSliceBase, { PieSliceBaseProps } from "./PieSliceBase";

const PieSliceLogo: React.FC<PieSliceBaseProps> = ({
  chromaticIndex,
  outerRadius,
  innerRadius,
}) => {
  return (
    <PieSliceBase
      chromaticIndex={chromaticIndex}
      outerRadius={outerRadius}
      innerRadius={innerRadius}
      isSelected={false}
      showText={false}
    />
  );
};

export default PieSliceLogo;
