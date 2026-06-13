// Screen width media-query breakpoints
export const breakpoints = {
  mobile: "375px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1280px",
  wide: "1536px"
} as const;

export type BreakpointsType = typeof breakpoints;
