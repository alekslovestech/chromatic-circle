import React from "react";

import {
  ButtonVariant,
  ButtonDensity,
  ButtonSize,
  BASE_STYLES,
  VARIANTS,
  DENSITIES,
  SIZES,
  SELECTED_STYLES,
} from "./ButtonTypes";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  density?: ButtonDensity;
  size?: ButtonSize;
  selected?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "selection",
  density = "standard",
  size = "md",
  selected = false,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${BASE_STYLES} ${DENSITIES[density]} ${SIZES[size]} ${
        selected ? `${SELECTED_STYLES} selected` : VARIANTS[variant]
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
