import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clamp, degToRad } from '../src/utils.js';

test('clamp keeps values within bounds', () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(-3, 0, 10), 0);
  assert.equal(clamp(42, 0, 10), 10);
});

test('clamp handles boundary values', () => {
  assert.equal(clamp(0, 0, 10), 0);
  assert.equal(clamp(10, 0, 10), 10);
});

test('degToRad converts degrees to radians', () => {
  assert.equal(degToRad(0), 0);
  assert.equal(degToRad(180), Math.PI);
  assert.ok(Math.abs(degToRad(90) - Math.PI / 2) < 1e-12);
});
