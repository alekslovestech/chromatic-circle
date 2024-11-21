import React from "react";
import { TWELVE } from "../types/NoteConstants";
import { ActualIndex } from "../types/IndexTypes";
import PieSliceLogo from "./PieSliceLogo";

const KeyboardLogo: React.FC = () => {
  const outerRadius = 100;
  console.log(`in KeyboardLogo`);
  const innerRadius = 0.5 * outerRadius;

  return (
    <div>
      <div
        id="svg-container"
        style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
      >
        <svg
          width={outerRadius * 2}
          height={outerRadius * 2}
          viewBox={`-${outerRadius} -${outerRadius} ${outerRadius * 2} ${outerRadius * 2}`}
          stroke="black"
          strokeWidth="1"
        >
          {Array.from({ length: TWELVE }).map((_, index) => (
            <PieSliceLogo
              key={index}
              actualIndex={index as ActualIndex}
              outerRadius={outerRadius}
              innerRadius={innerRadius}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default KeyboardLogo;
