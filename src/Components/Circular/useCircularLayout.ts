import { useState, useEffect } from "react";
import { OUTER_RADIUS } from "../../utils/CommonMath";

export const useCircularLayout = () => {
  const [outerRadius, setOuterRadius] = useState(OUTER_RADIUS);
  const innerRadius = 0.5 * outerRadius;

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.querySelector(".keyboardcircular-container");
      const containerWidth = container?.clientWidth || 2 * OUTER_RADIUS;
      const containerHeight = container?.clientHeight || 2 * OUTER_RADIUS;
      const newOuterRadius = (0.65 * Math.min(containerWidth, containerHeight)) / 2;
      setOuterRadius(newOuterRadius);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return { outerRadius, innerRadius };
};
