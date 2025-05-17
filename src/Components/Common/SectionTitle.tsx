import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className = "",
  centered = false,
}) => {
  return (
    <div
      className={`text-base font-medium mb-2 text-gray-600 flex-shrink-0 ${
        centered ? "text-center" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};
