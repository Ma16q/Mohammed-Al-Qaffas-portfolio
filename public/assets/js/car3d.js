// --- MOTRILOG REALISTIC 3D SPORTS CAR VIEWER (THREE.JS + GLTF) ---
(function() {
  const canvas = document.getElementById('motrilog3dCanvas');
  const container = document.getElementById('motrilog3dContainer');
  if (!canvas || !container || typeof THREE === 'undefined') return;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  
  const width = container.clientWidth || 360;
  const height = container.clientHeight || 250;

  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.set(3.8, 1.8, 4.2);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  renderer.outputEncoding = THREE.sRGBEncoding;

  // Environment Lighting
  const ambientLight = new THREE.AmbientLight(0x0f172a, 3.2);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 3.0);
  keyLight.position.set(6, 9, 6);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
  fillLight.position.set(-6, 4, -4);
  scene.add(fillLight);

  const underglowLight = new THREE.PointLight(0x38bdf8, 4, 7);
  underglowLight.position.set(0, 0.25, 0);
  scene.add(underglowLight);

  // Ground Holographic Grid & Platform
  const gridHelper = new THREE.GridHelper(8, 18, 0x38bdf8, 0x1e293b);
  gridHelper.position.y = 0.005;
  scene.add(gridHelper);

  const ringGeo = new THREE.RingGeometry(2.8, 2.85, 64);
  ringGeo.rotateX(-Math.PI / 2);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.position.y = 0.01;
  scene.add(ringMesh);

  // Car Root Pivot Group
  const carPivot = new THREE.Group();
  scene.add(carPivot);

  // Materials & Colors
  const colors = [0x0ea5e9, 0xef4444, 0xa855f7, 0x10b981, 0xf59e0b]; // Cyan, Ferrari Red, Violet, Emerald, Gold
  let currentColorIndex = 0;
  let isWireframe = false;
  const carMeshes = [];
  const bodyMeshes = [];

  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: colors[currentColorIndex],
    metalness: 0.9,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  });

  // Load Real 3D GLTF Car Model (Using Base64 Data URI + DRACO)
  const loader = new THREE.GLTFLoader();
  if (typeof THREE.DRACOLoader !== 'undefined') {
    const dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.1/');
    loader.setDRACOLoader(dracoLoader);
  }
  const modelSrc = window.FERRARI_GLB_BASE64 || 'assets/models/ferrari.glb';

  loader.load(
    modelSrc,
    function(gltf) {
      const car = gltf.scene;

      // Compute bounding box to center and scale precisely
      const box = new THREE.Box3().setFromObject(car);
      const size = new THREE.Vector3();
      box.getSize(size);
      const center = new THREE.Vector3();
      box.getCenter(center);

      // Desired visual size ~ 4.2 units
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 4.0 / maxDim;
      car.scale.set(scale, scale, scale);

      // Center car on origin and place wheels on ground
      car.position.x = -center.x * scale;
      car.position.y = -box.min.y * scale;
      car.position.z = -center.z * scale;

      car.traverse(function(child) {
        if (child.isMesh) {
          carMeshes.push(child);
          child.castShadow = true;
          child.receiveShadow = true;

          const name = child.name.toLowerCase();
          // Identify body parts to allow color changing
          if (name.includes('body') || name.includes('paint') || name.includes('hood') || name.includes('door') || name.includes('bumper')) {
            child.material = bodyMaterial;
            bodyMeshes.push(child);
          } else if (name.includes('glass') || name.includes('windshield')) {
            child.material = new THREE.MeshPhysicalMaterial({
              color: 0x0284c7,
              metalness: 0.1,
              roughness: 0.1,
              transmission: 0.7,
              transparent: true,
              opacity: 0.8
            });
          }
        }
      });

      // If no specific body mesh matched, apply to main shell
      if (bodyMeshes.length === 0) {
        carMeshes.forEach(m => {
          if (!m.name.toLowerCase().includes('wheel') && !m.name.toLowerCase().includes('tire') && !m.name.toLowerCase().includes('glass')) {
            m.material = bodyMaterial;
            bodyMeshes.push(m);
          }
        });
      }

      carPivot.add(car);
      camera.lookAt(0, 0.65, 0);
    },
    undefined,
    function(error) {
      console.warn('GLTF load error, fallback to procedural:', error);
    }
  );

  // --- INTERACTION CONTROLS ---
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let targetRotationY = 0.8;
  let targetRotationX = 0.18;
  let autoRotate = true;

  container.addEventListener('pointerdown', (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
    autoRotate = false;
    container.style.cursor = 'grabbing';
    const hint = document.getElementById('car3dHint');
    if (hint) hint.style.opacity = '0';
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - prevMouseX;
    const deltaY = e.clientY - prevMouseY;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;

    targetRotationY += deltaX * 0.012;
    targetRotationX = Math.max(-0.25, Math.min(0.55, targetRotationX + deltaY * 0.008));
  });

  window.addEventListener('pointerup', () => {
    if (isDragging) {
      isDragging = false;
      container.style.cursor = 'grab';
    }
  });

  container.addEventListener('touchstart', () => {
    const hint = document.getElementById('car3dHint');
    if (hint) hint.style.opacity = '0';
  }, { passive: true });

  // 3D HUD Toolbar Buttons
  const btnAutoRotate = document.getElementById('car3dBtnRotate');
  if (btnAutoRotate) {
    btnAutoRotate.addEventListener('click', (e) => {
      e.stopPropagation();
      autoRotate = !autoRotate;
      btnAutoRotate.classList.toggle('active', autoRotate);
    });
  }

  const btnWireframe = document.getElementById('car3dBtnWireframe');
  if (btnWireframe) {
    btnWireframe.addEventListener('click', (e) => {
      e.stopPropagation();
      isWireframe = !isWireframe;
      carMeshes.forEach(m => {
        if (m.material) m.material.wireframe = isWireframe;
      });
      btnWireframe.classList.toggle('active', isWireframe);
    });
  }

  const btnColor = document.getElementById('car3dBtnColor');
  if (btnColor) {
    btnColor.addEventListener('click', (e) => {
      e.stopPropagation();
      currentColorIndex = (currentColorIndex + 1) % colors.length;
      const newColor = colors[currentColorIndex];
      bodyMaterial.color.setHex(newColor);
      underglowLight.color.setHex(newColor);
      ringMat.color.setHex(newColor);
    });
  }

  const btnReset = document.getElementById('car3dBtnReset');
  if (btnReset) {
    btnReset.addEventListener('click', (e) => {
      e.stopPropagation();
      targetRotationY = 0.8;
      targetRotationX = 0.18;
      autoRotate = true;
      if (btnAutoRotate) btnAutoRotate.classList.add('active');
    });
  }

  // Window resize handler
  function onResize() {
    if (!container || !renderer || !camera) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w === 0 || h === 0) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  // Animation Loop
  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    if (autoRotate) {
      targetRotationY += delta * 0.45;
    }

    carPivot.rotation.y += (targetRotationY - carPivot.rotation.y) * 0.1;
    carPivot.rotation.x += (targetRotationX - carPivot.rotation.x) * 0.1;

    ringMesh.rotation.z += delta * 0.25;

    renderer.render(scene, camera);
  }

  animate();
  onResize();
})();
