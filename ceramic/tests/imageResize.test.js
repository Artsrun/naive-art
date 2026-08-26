import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeFitDimensions } from '../src/imageResize.js';

test('leaves images within bounds unchanged', () => {
  assert.deepEqual(computeFitDimensions(800, 600, 1024), { width: 800, height: 600 });
  assert.deepEqual(computeFitDimensions(1024, 1024, 1024), { width: 1024, height: 1024 });
});

test('scales landscape images down preserving aspect ratio', () => {
  assert.deepEqual(computeFitDimensions(4000, 2000, 1024), { width: 1024, height: 512 });
});

test('scales portrait images down preserving aspect ratio', () => {
  assert.deepEqual(computeFitDimensions(2000, 4000, 1024), { width: 512, height: 1024 });
});

test('never returns a zero dimension for valid input', () => {
  const { width, height } = computeFitDimensions(10000, 1, 1024);
  assert.ok(width >= 1 && height >= 1);
});

test('returns zero box for non-positive input', () => {
  assert.deepEqual(computeFitDimensions(0, 100, 1024), { width: 0, height: 0 });
});
