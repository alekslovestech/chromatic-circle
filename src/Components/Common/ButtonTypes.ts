export type ButtonVariant = "option" | "action" | "global" | "vis";
export type ButtonDensity = "compact" | "comfortable" | "standard";
export type ButtonSize = "sm" | "md" | "lg";

export const BASE_STYLES =
  "rounded-2xl border border-serenity-transparent1 bg-serenity-light text-serenity-textblack";

export const VARIANTS: Record<ButtonVariant, string> = {
  option: " bg-serenity-light text-serenity-textblack",
  action: "font-bold hover:bg-serenity-dark",
  global: "border-serenity-transparent2 bg-gray-100 hover:bg-gray-200 whitespace-normal", // global mode switch
  vis: "rounded-none border-serenity-transparent2 fill-none stroke-[2px] stroke-black text-serenity-textblack text-font-bold",
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

export const SELECTED_STYLES =
  "bg-serenity-dark border-transparent2 text-serenity-textwhite fill-none stroke-[3px] stroke-white";

export const DISABLED_STYLES = "opacity-50 cursor-not-allowed bg-gray-200";
