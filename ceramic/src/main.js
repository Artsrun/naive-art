import { detectIsMobile } from './device.js';
import { CeramicVisualizer } from './visualizer.js';

const THREE = window.THREE;

function showToast(message, timeout = 2600) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.style.display = 'block';
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.style.display = 'none';
  }, timeout);
}

function setupPointerControls(canvas, viz, isMobile) {
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  const speed = isMobile ? 0.008 : 0.005;

  const start = (x, y) => {
    dragging = true;
    lastX = x;
    lastY = y;
  };
  const move = (x, y) => {
    if (!dragging) return;
    viz.rotateObject((x - lastX) * speed, (y - lastY) * speed);
    lastX = x;
    lastY = y;
  };
  const end = () => {
    dragging = false;
  };

  canvas.addEventListener('mousedown', (e) => start(e.clientX, e.clientY));
  window.addEventListener('mousemove', (e) => move(e.clientX, e.clientY));
  window.addEventListener('mouseup', end);

  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) start(e.touches[0].clientX, e.touches[0].clientY);
  });
  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) move(e.touches[0].clientX, e.touches[0].clientY);
  });
  canvas.addEventListener('touchend', end);

  canvas.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      viz.zoom(e.deltaY * 0.01);
    },
    { passive: false }
  );
}

function init() {
  const isMobile = detectIsMobile(navigator.userAgent);
  const canvas = document.getElementById('three-canvas');
  const objectName = document.getElementById('object-name');
  const loading = document.getElementById('loading');

  const viz = new CeramicVisualizer({
    THREE,
    canvas,
    isMobile,
    onObjectName: (label) => {
      objectName.textContent = label;
    },
  });

  setupPointerControls(canvas, viz, isMobile);
  window.addEventListener('resize', () => viz.resize());

  document.querySelectorAll('.object-card').forEach((card) => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.object-card').forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
      viz.selectObject(card.dataset.object);
    });
  });

  const scaleSlider = document.getElementById('scale-slider');
  const rotationSlider = document.getElementById('rotation-slider');
  const glossSlider = document.getElementById('gloss-slider');
  const colorPicker = document.getElementById('color-picker');

  scaleSlider.addEventListener('input', () => viz.setTextureScale(parseFloat(scaleSlider.value)));
  rotationSlider.addEventListener('input', () =>
    viz.setTextureRotation(parseFloat(rotationSlider.value))
  );
  glossSlider.addEventListener('input', () => viz.setGloss(parseFloat(glossSlider.value)));
  colorPicker.addEventListener('input', () => viz.setColor(colorPicker.value));

  scaleSlider.value = viz.textureScale;
  rotationSlider.value = viz.textureRotation;
  glossSlider.value = viz.glossiness;

  const fileInput = document.getElementById('image-upload');
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    loading.style.display = 'block';
    viz
      .loadImageFile(file)
      .then(() => showToast('✅ Artwork applied (optimized)'))
      .catch(() => showToast('⚠️ Could not load that image'))
      .finally(() => {
        loading.style.display = 'none';
      });
  });

  document.getElementById('upload-area').addEventListener('click', (e) => {
    // The programmatic click below re-bubbles to this handler; ignore it to
    // avoid reopening the picker in a loop.
    if (e.target === fileInput) return;
    fileInput.click();
  });

  document.getElementById('randomize-btn').addEventListener('click', () => {
    const params = viz.randomize();
    if (!params) {
      showToast('Please upload an image first');
      return;
    }
    scaleSlider.value = params.scale;
    rotationSlider.value = params.rotation;
    showToast('🎲 Random texture applied');
  });

  document.querySelectorAll('[data-action="reset"]').forEach((btn) =>
    btn.addEventListener('click', () => {
      viz.resetView();
      showToast('View reset');
    })
  );
  document.querySelectorAll('[data-action="export"]').forEach((btn) =>
    btn.addEventListener('click', () => {
      viz.exportPNG();
      showToast('📸 Image downloaded!');
    })
  );

  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'r') {
      viz.resetView();
      showToast('View reset');
    }
    if (key === 'd') {
      viz.exportPNG();
      showToast('📸 Image downloaded!');
    }
  });

  setTimeout(() => {
    showToast(isMobile ? '📱 Mobile optimized mode active' : '🎨 Upload your artwork');
  }, 1200);
}

window.addEventListener('load', init);
