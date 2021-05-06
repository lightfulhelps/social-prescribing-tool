const parsePxValue = (value: string) => {
  return parseInt(value.replace(' ', '').replace('px', ''), 10);
};

export const breakpoints = {
  xs: parsePxValue(getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-xs')),
  sm: parsePxValue(getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-sm')),
  md: parsePxValue(getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-md')),
  lg: parsePxValue(getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-lg')),
  xl: parsePxValue(getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-xl')),
};
