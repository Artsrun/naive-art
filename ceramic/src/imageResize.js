// Pure aspect-ratio fit math. Returns integer dimensions that fit inside a
// maxSize x maxSize box while preserving the original aspect ratio. Images
// already within bounds are returned unchanged.
export function computeFitDimensions(width, height, maxSize) {
  if (width <= 0 || height <= 0) {
    return { width: 0, height: 0 };
  }
  if (width <= maxSize && height <= maxSize) {
    return { width, height };
  }
  const ratio = Math.min(maxSize / width, maxSize / height);
  return {
    width: Math.max(1, Math.round(width * ratio)),
    height: Math.max(1, Math.round(height * ratio)),
  };
}
