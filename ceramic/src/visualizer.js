import { clamp } from './utils.js';
import { maxTextureSize } from './device.js';
import { computeFitDimensions } from './imageResize.js';
import { rotationDegToRad, randomTextureParams } from './texture.js';
import { glossToShininess } from './material.js';
import { buildObject } from './geometry.js';

const CAMERA_HOME = { x: 0, y: 0, z: 4.5 };
const ZOOM_LIMITS = { min: 2, max: 12 };

// Owns the THREE scene and all mutable render state. DOM event wiring lives in
// main.js and drives this class through its public methods.
export class CeramicVisualizer {
  constructor({ THREE, canvas, isMobile = false, onObjectName = () => {} }) {
    this.THREE = THREE;
    this.canvas = canvas;
    this.isMobile = isMobile;
    this.onObjectName = onObjectName;

    this.currentObject = null;
    this.materials = [];
    this.currentTexture = null;
    this.frameHandle = null;

    this.textureScale = 1.5;
    this.textureRotation = 0;
    this.glossiness = 0.7;
    this.colorOverlay = '#ffffff';

    this._initScene();
    this.selectObject('plate');
    this._startRenderLoop();
  }

  _initScene() {
    const { THREE, canvas } = this;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !this.isMobile,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.isMobile ? 1.5 : 2));

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(CAMERA_HOME.x, CAMERA_HOME.y, CAMERA_HOME.z);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.7));

    const key = new THREE.DirectionalLight(0xffffff, this.isMobile ? 0.9 : 1.2);
    key.position.set(5, 10, 7);
    this.scene.add(key);

    const fill = new THREE.DirectionalLight(0xffe4c4, 0.5);
    fill.position.set(-8, 4, -6);
    this.scene.add(fill);
  }

  _startRenderLoop() {
    const render = () => {
      this.frameHandle = requestAnimationFrame(render);
      this.renderer.render(this.scene, this.camera);
    };
    render();
  }

  _disposeCurrentObject() {
    if (!this.currentObject) return;
    this.scene.remove(this.currentObject);
    this.currentObject.traverse((node) => {
      if (node.geometry) node.geometry.dispose();
    });
    this.materials.forEach((mat) => mat.dispose());
    this.materials = [];
    this.currentObject = null;
  }

  selectObject(type) {
    this._disposeCurrentObject();
    const { object, materials, label } = buildObject(this.THREE, type);
    this.currentObject = object;
    this.materials = materials;
    this.scene.add(object);
    this.onObjectName(label);
    this._applyTexture();
    this._applyMaterial();
  }

  _applyTexture() {
    const texture = this.currentTexture;
    this.materials.forEach((mat) => {
      mat.map = texture || null;
      mat.needsUpdate = true;
    });
    if (!texture) return;
    texture.wrapS = this.THREE.RepeatWrapping;
    texture.wrapT = this.THREE.RepeatWrapping;
    texture.repeat.set(this.textureScale, this.textureScale);
    texture.rotation = rotationDegToRad(this.textureRotation);
    texture.needsUpdate = true;
  }

  _applyMaterial() {
    this.materials.forEach((mat) => {
      mat.shininess = glossToShininess(this.glossiness);
      mat.color.set(this.colorOverlay);
      mat.needsUpdate = true;
    });
  }

  setTexture(texture) {
    if (this.currentTexture) this.currentTexture.dispose();
    this.currentTexture = texture;
    this._applyTexture();
  }

  setTextureScale(value) {
    this.textureScale = value;
    if (!this.currentTexture) return;
    this.currentTexture.repeat.set(value, value);
    this.currentTexture.needsUpdate = true;
  }

  setTextureRotation(value) {
    this.textureRotation = value;
    if (!this.currentTexture) return;
    this.currentTexture.rotation = rotationDegToRad(value);
    this.currentTexture.needsUpdate = true;
  }

  setGloss(value) {
    this.glossiness = value;
    this._applyMaterial();
  }

  setColor(value) {
    this.colorOverlay = value;
    this._applyMaterial();
  }

  // Decodes a File into a downscaled canvas texture. Applies the current
  // textureScale/textureRotation settings; rejects on decode failure.
  loadImageFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Could not read file'));
      reader.onload = (event) => {
        const img = new Image();
        img.onerror = () => reject(new Error('Could not decode image'));
        img.onload = () => {
          const { width, height } = computeFitDimensions(
            img.width,
            img.height,
            maxTextureSize(this.isMobile)
          );
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(img, 0, 0, width, height);

          const texture = new this.THREE.Texture(canvas);
          texture.needsUpdate = true;
          this.setTexture(texture);
          resolve(texture);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  randomize() {
    if (!this.currentTexture) return null;
    const params = randomTextureParams();
    this.setTextureScale(params.scale);
    this.setTextureRotation(params.rotation);
    return params;
  }

  zoom(delta) {
    this.camera.position.z = clamp(
      this.camera.position.z + delta,
      ZOOM_LIMITS.min,
      ZOOM_LIMITS.max
    );
  }

  rotateObject(dx, dy) {
    if (!this.currentObject) return;
    this.currentObject.rotation.y += dx;
    this.currentObject.rotation.x += dy;
  }

  resetView() {
    this.camera.position.set(CAMERA_HOME.x, CAMERA_HOME.y, CAMERA_HOME.z);
    if (this.currentObject) this.currentObject.rotation.set(0, 0, 0);
  }

  resize() {
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  exportPNG(filename = 'ceramic-art-preview.png') {
    this.renderer.render(this.scene, this.camera);
    const link = document.createElement('a');
    link.download = filename;
    link.href = this.renderer.domElement.toDataURL('image/png');
    link.click();
  }
}
