// Device detection kept pure so it can be exercised in tests.

const MOBILE_UA = /Android|iPhone|iPad|iPod/i;

export function detectIsMobile(userAgent = '') {
  return MOBILE_UA.test(userAgent);
}

// Larger source images are downscaled before becoming a texture to keep
// GPU memory and upload time reasonable, especially on phones.
export function maxTextureSize(isMobile) {
  return isMobile ? 1024 : 2048;
}
