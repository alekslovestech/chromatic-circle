import React from "react";
import { TWELVE } from "../../types/NoteConstants";
import PieSliceLogo from "./PieSliceLogo";
import CircularBase, { INNER_RADIUS, OUTER_RADIUS } from "./CircularBase";
import { ixChromatic } from "../../types/ChromaticIndex";
const KeyboardLogo: React.FC = () => {
  console.log(`in KeyboardLogo`);

  return (
    <CircularBase>
      {Array.from({ length: TWELVE }).map((_, index) => (
        <PieSliceLogo
          key={index}
          chromaticIndex={ixChromatic(index)}
          outerRadius={OUTER_RADIUS}
          innerRadius={INNER_RADIUS}
        />
      ))}
    </CircularBase>
  );
};

export default KeyboardLogo;
