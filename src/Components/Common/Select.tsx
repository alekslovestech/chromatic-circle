import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  title?: string;
}

export const Select: React.FC<SelectProps> = ({
  id,
  value,
  onChange,
  title,
  children,
  ...props
}) => {
  const baseStyles =
    "rounded-2xl border border-serenity-transparent1 bg-serenity-light text-serenity-textblack px-2 py-1";

  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      title={title}
      className={baseStyles}
      {...props}
    >
      {children}
    </select>
  );
};
