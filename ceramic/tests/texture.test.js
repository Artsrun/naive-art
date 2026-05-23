import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rotationDegToRad, randomTextureParams } from '../src/texture.js';

test('rotationDegToRad matches degree-to-radian conversion', () => {
  assert.equal(rotationDegToRad(360), 2 * Math.PI);
});

test('randomTextureParams stays within documented bounds', () => {
  for (const sample of [0, 0.5, 0.999]) {
    const { scale, rotation } = randomTextureParams(() => sample);
    assert.ok(scale >= 0.8 && scale <= 3.3, `scale ${scale} in range`);
    assert.ok(rotation >= 0 && rotation <= 360, `rotation ${rotation} in range`);
  }
});

test('randomTextureParams is deterministic for a fixed RNG', () => {
  const rng = () => 0.5;
  assert.deepEqual(randomTextureParams(rng), randomTextureParams(rng));
});
