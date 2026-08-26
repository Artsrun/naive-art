import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildObject, OBJECT_TYPES, OBJECT_LABELS } from '../src/geometry.js';

// Minimal THREE stub: records constructions and supports the small surface
// the builders touch (group.add, mesh.position/rotation).
function makeThreeStub() {
  const created = { materials: 0, meshes: 0, geometries: 0 };
  const vec = () => ({ x: 0, y: 0, z: 0, set() {} });
  class Group {
    constructor() {
      this.children = [];
    }
    add(...nodes) {
      this.children.push(...nodes);
    }
  }
  class Mesh {
    constructor(geometry, material) {
      created.meshes += 1;
      this.geometry = geometry;
      this.material = material;
      this.position = vec();
      this.rotation = vec();
    }
  }
  class MeshPhongMaterial {
    constructor(opts) {
      created.materials += 1;
      Object.assign(this, opts);
    }
  }
  function Geometry() {
    created.geometries += 1;
  }
  return {
    created,
    THREE: {
      Group,
      Mesh,
      MeshPhongMaterial,
      CylinderGeometry: Geometry,
      TorusGeometry: Geometry,
      SphereGeometry: Geometry,
    },
  };
}

test('every object type builds with a label and at least one material', () => {
  for (const type of OBJECT_TYPES) {
    const { THREE } = makeThreeStub();
    const result = buildObject(THREE, type);
    assert.equal(result.label, OBJECT_LABELS[type]);
    assert.ok(result.materials.length >= 1, `${type} has materials`);
    assert.ok(result.object.children.length >= 1, `${type} has meshes`);
  }
});

test('plate builds a body and rim sharing artwork-capable materials', () => {
  const { THREE } = makeThreeStub();
  const { object, materials } = buildObject(THREE, 'plate');
  assert.equal(object.children.length, 2);
  assert.equal(materials.length, 2);
  // Regression: both materials must be returned so the artwork applies to the
  // plate face, not just the rim.
  assert.ok(materials.every((m) => m instanceof THREE.MeshPhongMaterial));
});

test('cup reuses one material for body and handle', () => {
  const { THREE } = makeThreeStub();
  const { object, materials } = buildObject(THREE, 'cup');
  assert.equal(materials.length, 2);
  assert.equal(object.children[0].material, object.children[1].material);
});

test('unknown type throws', () => {
  const { THREE } = makeThreeStub();
  assert.throws(() => buildObject(THREE, 'teapot'), /Unknown ceramic object type/);
});
