import { test } from 'node:test';
import assert from 'node:assert/strict';
import { glossToShininess, SHININESS_FACTOR } from '../src/material.js';

test('glossToShininess scales gloss by the shininess factor', () => {
  assert.equal(glossToShininess(0), 0);
  assert.equal(glossToShininess(1), SHININESS_FACTOR);
  assert.equal(glossToShininess(0.7), 0.7 * SHININESS_FACTOR);
});
