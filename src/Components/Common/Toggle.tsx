import React from "react";

interface ToggleProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export const Toggle: React.FC<ToggleProps> = ({ id, checked, onChange, label }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 hover:bg-gray-200 transition-colors duration-200"
      />
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-900 cursor-pointer hover:text-gray-700 transition-colors duration-200"
      >
        {label}
      </label>
    </div>
  );
};
