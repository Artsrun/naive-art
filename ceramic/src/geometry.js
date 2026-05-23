// Ceramic object builders. THREE is injected rather than imported so these
// can be unit tested with a lightweight stub, and so the module stays
// agnostic about how THREE is loaded (CDN global vs bundler).

const SEGMENTS = 40;

export const OBJECT_TYPES = ['plate', 'cup', 'bowl', 'vase'];

export const OBJECT_LABELS = {
  plate: '🍽️ Ceramic Plate',
  cup: '☕ Ceramic Mug',
  bowl: '🥣 Ceramic Bowl',
  vase: '🏺 Ceramic Vase',
};

function ceramicMaterial(THREE, overrides = {}) {
  return new THREE.MeshPhongMaterial({
    color: 0xeeeeee,
    shininess: 80,
    specular: 0x222222,
    ...overrides,
  });
}

function buildPlate(THREE) {
  const group = new THREE.Group();
  const bodyMat = ceramicMaterial(THREE);
  const rimMat = ceramicMaterial(THREE, { color: 0xcccccc, shininess: 60 });

  const body = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 0.25, SEGMENTS), bodyMat);
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(2.25, 2.25, 0.28, SEGMENTS), rimMat);
  rim.position.y = 0.02;
  group.add(body, rim);

  return { object: group, materials: [bodyMat, rimMat] };
}

function buildCup(THREE) {
  const group = new THREE.Group();
  const bodyMat = ceramicMaterial(THREE, { shininess: 90, specular: 0x333333 });
  const rimMat = ceramicMaterial(THREE, { color: 0xdddddd });

  const body = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 0.95, 2.8, SEGMENTS), bodyMat);

  const handle = new THREE.Mesh(
    new THREE.TorusGeometry(0.65, 0.18, 16, SEGMENTS, Math.PI * 1.3),
    bodyMat
  );
  handle.rotation.z = Math.PI / 2;
  handle.position.set(1.35, 0.3, 0);

  const rim = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.15, SEGMENTS), rimMat);
  rim.position.y = 1.35;

  group.add(body, handle, rim);

  return { object: group, materials: [bodyMat, rimMat] };
}

function buildBowl(THREE) {
  const group = new THREE.Group();
  const mat = ceramicMaterial(THREE, { shininess: 75 });
  const bowl = new THREE.Mesh(
    new THREE.SphereGeometry(2.0, SEGMENTS, 32, 0, Math.PI * 2, 0, Math.PI * 0.65),
    mat
  );
  group.add(bowl);

  return { object: group, materials: [mat] };
}

function buildVase(THREE) {
  const group = new THREE.Group();
  const mat = ceramicMaterial(THREE, { shininess: 85, specular: 0x333333 });

  const body = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 0.7, 3.5, SEGMENTS), mat);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.85, 1.2, SEGMENTS), mat);
  neck.position.y = 2.2;
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.3, SEGMENTS), mat);
  base.position.y = -1.75;
  group.add(body, neck, base);

  return { object: group, materials: [mat] };
}

const BUILDERS = {
  plate: buildPlate,
  cup: buildCup,
  bowl: buildBowl,
  vase: buildVase,
};

// Returns { object, materials, label } for the requested ceramic type.
export function buildObject(THREE, type) {
  const builder = BUILDERS[type];
  if (!builder) {
    throw new Error(`Unknown ceramic object type: ${type}`);
  }
  return { ...builder(THREE), label: OBJECT_LABELS[type] };
}
