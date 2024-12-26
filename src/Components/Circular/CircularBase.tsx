import React from "react";

export const MAX_RADIUS = 100;
export const OUTER_RADIUS = 0.9 * MAX_RADIUS;
export const INNER_RADIUS = 0.5 * MAX_RADIUS;

interface CircularBaseProps {
  children: React.ReactNode;
}

const CircularBase: React.FC<CircularBaseProps> = ({ children }) => {
  return (
    <svg
      viewBox={`-${MAX_RADIUS} -${MAX_RADIUS} ${MAX_RADIUS * 2} ${MAX_RADIUS * 2}`}
      className="svg-container"
    >
      {children}
    </svg>
  );
};

export default CircularBase;
