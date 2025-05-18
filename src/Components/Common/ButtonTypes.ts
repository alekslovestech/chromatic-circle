export type ButtonVariant = "option" | "action" | "global" | "vis";
export type ButtonDensity = "compact" | "comfortable" | "standard";
export type ButtonSize = "sm" | "md" | "lg";

export const BASE_STYLES = "rounded-2xl border border-opacity-20 transition-colors text-settings";

// Example using tailwind.config.js color values:
// export const VARIANTS: Record<ButtonVariant, string> = {
//   selection: "border-secondary-DEFAULT bg-white text-settings-DEFAULT",
//   action: "border-primary-DEFAULT bg-primary-DEFAULT text-white hover:bg-primary-dark",
//   global: "border-secondary-light bg-secondary-light/20 hover:bg-secondary-light/30 whitespace-normal",
//   vis: "border-secondary-DEFAULT/30 bg-white hover:bg-secondary-light/10"
// };

export const VARIANTS: Record<ButtonVariant, string> = {
  option: "border-toggle-border bg-toggle-background text-toggle-text",
  action: "border-primary-DEFAULT bg-primary-DEFAULT text-primary-dark hover:bg-primary-dark",
  global: "border-gray-300 bg-gray-100 hover:bg-gray-200 whitespace-normal", // global mode switch
  vis: "border-[rgba(0,0,0,0.3)] bg-white hover:bg-gray-50",
};

export const DENSITIES: Record<ButtonDensity, string> = {
  compact: "px-0.5 py-0.5 min-w-0 max-w-none", // removed text-xs
  comfortable: "px-3 py-1.5",
  standard: "px-4 py-2",
};

export const SIZES: Record<ButtonSize, string> = {
  sm: "min-w-button-sm max-w-button-sm px-2 py-1",
  md: "min-w-button-md max-w-button-md px-4 py-2",
  lg: "min-w-button-lg max-w-button-lg px-6 py-3",
};

export const SELECTED_STYLES = "bg-sky-200 border-blue-600 text-gray-700";

export const VIS_STYLES = "border-[rgba(0,0,0,0.3)] bg-white hover:bg-gray-50";
