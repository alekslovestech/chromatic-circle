export type ButtonVariant = "selection" | "action" | "global";
export type ButtonDensity = "compact" | "comfortable" | "standard";
export type ButtonSize = "sm" | "md" | "lg";

export const BASE_STYLES = "rounded-key border transition-colors text-settings";

export const VARIANTS: Record<ButtonVariant, string> = {
  selection: "border-toggle-border bg-toggle-background text-toggle-text",
  action: "border-blue-500 bg-blue-500 text-white hover:bg-blue-600",
  global: "border-gray-300 bg-gray-100 hover:bg-gray-200", // global mode switch
};

export const DENSITIES: Record<ButtonDensity, string> = {
  compact: "px-0.5 py-0.5 min-w-0 max-w-none", // removed text-xs
  comfortable: "px-3 py-1.5",
  standard: "px-4 py-2",
};

export const SIZES: Record<ButtonSize, string> = {
  sm: "min-w-button-sm max-w-button-sm px-2 py-1", // removed text-settings
  md: "min-w-button-md max-w-button-md px-4 py-2", // removed text-settings
  lg: "min-w-button-lg max-w-button-lg px-6 py-3", // removed text-settings
};

export const SELECTED_STYLES = "bg-blue-500 border-blue-600 text-gray-100";
