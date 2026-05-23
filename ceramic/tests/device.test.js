import { test } from 'node:test';
import assert from 'node:assert/strict';
import { detectIsMobile, maxTextureSize } from '../src/device.js';

test('detectIsMobile recognizes phone user agents', () => {
  assert.equal(detectIsMobile('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)'), true);
  assert.equal(detectIsMobile('Mozilla/5.0 (Linux; Android 14)'), true);
});

test('detectIsMobile returns false for desktop and empty agents', () => {
  assert.equal(detectIsMobile('Mozilla/5.0 (Macintosh; Intel Mac OS X)'), false);
  assert.equal(detectIsMobile(''), false);
  assert.equal(detectIsMobile(), false);
});

test('maxTextureSize is smaller on mobile', () => {
  assert.equal(maxTextureSize(true), 1024);
  assert.equal(maxTextureSize(false), 2048);
});
