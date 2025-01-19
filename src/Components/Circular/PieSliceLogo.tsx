import React from "react";
import PieSliceBase, { PieSliceBaseProps } from "./PieSliceBase";

const PieSliceLogo: React.FC<PieSliceBaseProps> = (props) => {
  return <PieSliceBase {...props} isSelected={false} showText={false} />;
};

export default PieSliceLogo;
