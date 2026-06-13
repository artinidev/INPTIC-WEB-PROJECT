// Layer z-index tokens for relative element positioning
export const zIndex = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  overlay: 400,
  modal: 500,
  popover: 600,
  toast: 700,
  tooltip: 800
} as const;

export type ZIndexType = typeof zIndex;
