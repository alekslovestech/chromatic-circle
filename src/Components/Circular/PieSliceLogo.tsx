import React from "react";
import PieSliceBase, { PieSliceBaseProps } from "./PieSliceBase";

const PieSliceLogo: React.FC<PieSliceBaseProps> = ({ actualIndex, outerRadius, innerRadius }) => {
  return (
    <PieSliceBase
      actualIndex={actualIndex}
      outerRadius={outerRadius}
      innerRadius={innerRadius}
      isSelected={false}
      showText={false}
    />
  );
};

export default PieSliceLogo;
