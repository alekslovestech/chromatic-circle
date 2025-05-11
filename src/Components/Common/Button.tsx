import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles = "rounded-md border transition-colors";

  const variants = {
    default: "border-[var(--toggle-button-border)] bg-[var(--toggle-button-background)]",
    primary: "border-blue-500 bg-blue-500 text-white hover:bg-blue-600",
    secondary: "border-gray-300 bg-gray-100 hover:bg-gray-200",
  };

  const sizes = {
    sm: "text-sm min-w-[50px] max-w-[100px] px-2 py-1",
    md: "text-base min-w-[80px] max-w-[150px] px-4 py-2",
    lg: "text-lg min-w-[100px] max-w-[200px] px-6 py-3",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};
