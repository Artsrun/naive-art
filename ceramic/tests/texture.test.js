import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rotationDegToRad, randomTextureParams, SCALE_RANGE, ROTATION_RANGE } from '../src/texture.js';

test('rotationDegToRad matches degree-to-radian conversion', () => {
  assert.equal(rotationDegToRad(360), 2 * Math.PI);
});

test('randomTextureParams stays within documented bounds', () => {
  for (const sample of [0, 0.5, 0.999]) {
    const { scale, rotation } = randomTextureParams(() => sample);
    assert.ok(scale >= SCALE_RANGE.min && scale <= SCALE_RANGE.max, `scale ${scale} in range`);
    assert.ok(rotation >= ROTATION_RANGE.min && rotation <= ROTATION_RANGE.max, `rotation ${rotation} in range`);
  }
});

test('randomTextureParams is deterministic for a fixed RNG', () => {
  const rng = () => 0.5;
  assert.deepEqual(randomTextureParams(rng), randomTextureParams(rng));
});
