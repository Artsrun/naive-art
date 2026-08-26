// Small, dependency-free helpers shared across the visualizer.

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}
