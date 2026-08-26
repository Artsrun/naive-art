export const SHININESS_FACTOR = 120;

export function glossToShininess(gloss) {
  return gloss * SHININESS_FACTOR;
}
