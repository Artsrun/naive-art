import { degToRad } from './utils.js';

export const SCALE_RANGE = { min: 0.5, max: 4 };
export const ROTATION_RANGE = { min: 0, max: 360 };

// Three.js pivots a texture around its UV origin (0, 0), which swings the
// artwork off the surface as it turns. Pinning the pivot to the middle of the
// UV square makes the rotation control spin the image in place.
export const ROTATION_PIVOT = { u: 0.5, v: 0.5 };

export function applyRotationPivot(texture) {
  texture.center.set(ROTATION_PIVOT.u, ROTATION_PIVOT.v);
  return texture;
}

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
