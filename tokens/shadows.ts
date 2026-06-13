// Box-shadow tokens for glassmorphism and modern depth styling
export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  none: "none",
  
  // Custom glassmorphic shadow
  glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
  glassBorder: "inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)"
} as const;

export type ShadowsType = typeof shadows;
