import { degToRad } from './utils.js';

export const SCALE_RANGE = { min: 0.5, max: 4 };
export const ROTATION_RANGE = { min: 0, max: 360 };

export function rotationDegToRad(degrees) {
  return degToRad(degrees);
}

// Produces randomized-but-bounded texture placement. The RNG is injected so
// the result is deterministic under test.
export function randomTextureParams(rng = Math.random) {
  return {
    scale: Number((rng() * 2.5 + 0.8).toFixed(2)),
    rotation: Math.round(rng() * 360),
  };
}
