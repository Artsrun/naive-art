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
    scale: Number(
      (rng() * (SCALE_RANGE.max - SCALE_RANGE.min) + SCALE_RANGE.min).toFixed(2)
    ),
    rotation: Math.round(rng() * (ROTATION_RANGE.max - ROTATION_RANGE.min) + ROTATION_RANGE.min),
  };
}
