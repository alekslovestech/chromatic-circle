import React from "react";
import { TWELVE } from "../../types/NoteConstants";
import CircularBase, { INNER_RADIUS, OUTER_RADIUS } from "./CircularBase";
import { ixChromatic } from "../../types/ChromaticIndex";
import PieSliceBase from "./PieSliceBase";
const KeyboardLogo: React.FC = () => {
  console.log(`in KeyboardLogo`);

  return (
    <CircularBase>
      {Array.from({ length: TWELVE }).map((_, index) => (
        <PieSliceBase
          key={index}
          chromaticIndex={ixChromatic(index)}
          outerRadius={OUTER_RADIUS}
          innerRadius={INNER_RADIUS}
          showText={false}
          isLogo={true}
        />
      ))}
    </CircularBase>
  );
};

export default KeyboardLogo;
