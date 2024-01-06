// Some usefull functions

export function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

export function clamp(value: number | undefined, min: number, max: number) {
  if (!value) return undefined;

  return Math.min(Math.max(value, min), max);
}
