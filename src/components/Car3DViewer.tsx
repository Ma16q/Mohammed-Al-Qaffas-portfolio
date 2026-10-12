import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

interface Car3DViewerProps {
  theme?: 'dark' | 'light';
}

const PAINT_COLORS = [
  { name: 'Cyber Cyan', color: 0x00f5d4, rough: 0.12, metal: 0.95 },
  { name: 'Neon Purple', color: 0xa855f7, rough: 0.15, metal: 0.92 },
  { name: 'Sunset Amber', color: 0xf59e0b, rough: 0.18, metal: 0.88 },
  { name: 'Racing Red', color: 0xef4444, rough: 0.20, metal: 0.90 },
  { name: 'Matrix Emerald', color: 0x10b981, rough: 0.16, metal: 0.94 }
];

export const Car3DViewer: React.FC<Car3DViewerProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isRotating, setIsRotating] = useState(true);
  const [isWireframe, setIsWireframe] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);

  // References for mutable animation loop state
  const stateRef = useRef({
    isRotating: true,
    isWireframe: false,
    colorIndex: 0,
    bodyMaterial: null as THREE.MeshPhysicalMaterial | null,
    carPivot: null as THREE.Group | null,
    camera: null as THREE.PerspectiveCamera | null,
    targetRotationY: 0,
    currentRotationY: 0,
    targetPitch: 0,
    currentPitch: 0,
    isDragging: false,
    prevX: 0,
    prevY: 0
  });

  useEffect(() => {
    stateRef.current.isRotating = isRotating;
  }, [isRotating]);

  useEffect(() => {
    stateRef.current.isWireframe = isWireframe;
    const mat = stateRef.current.bodyMaterial;
    if (mat) {
      mat.wireframe = isWireframe;
      mat.needsUpdate = true;
    }
  }, [isWireframe]);

  useEffect(() => {
    stateRef.current.colorIndex = colorIndex;
    const mat = stateRef.current.bodyMaterial;
    if (mat) {
      const p = PAINT_COLORS[colorIndex];
      mat.color.setHex(p.color);
      mat.roughness = p.rough;
      mat.metalness = p.metal;
      mat.needsUpdate = true;
    }
  }, [colorIndex]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 230;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(3.8, 1.8, 4.2);
    stateRef.current.camera = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Lights
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

    // Ground Grid & Ring
    const gridHelper = new THREE.GridHelper(8, 18, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = 0.005;
    scene.add(gridHelper);

    const ringGeo = new THREE.RingGeometry(2.8, 2.85, 64);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = 0.01;
    scene.add(ringMesh);

    // Car Root Pivot
    const carPivot = new THREE.Group();
    scene.add(carPivot);
    stateRef.current.carPivot = carPivot;

    // Body Material
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00f5d4,
      metalness: 0.95,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 1.0
    });
    stateRef.current.bodyMaterial = bodyMaterial;

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.9,
      transparent: true,
      opacity: 0.85
    });

    // GLTF Loading
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/assets/js/draco/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      '/assets/models/ferrari.glb',
      (gltf) => {
        const car = gltf.scene;
        car.scale.set(0.85, 0.85, 0.85);
        car.position.set(0, 0, 0);

        car.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            const name = (mesh.name || '').toLowerCase();
            if (name.includes('body') || name.includes('paint') || name.includes('chassis') || name.includes('hood')) {
              mesh.material = bodyMaterial;
            } else if (name.includes('glass') || name.includes('window')) {
              mesh.material = glassMaterial;
            }
          }
        });
        carPivot.add(car);
      },
      undefined,
      (err) => {
        console.warn('Error loading GLTF car model:', err);
      }
    );

    // Mouse and Touch Interaction
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      stateRef.current.isDragging = true;
      setShowHint(false);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      stateRef.current.prevX = clientX;
      stateRef.current.prevY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!stateRef.current.isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - stateRef.current.prevX;
      const deltaY = clientY - stateRef.current.prevY;
      stateRef.current.prevX = clientX;
      stateRef.current.prevY = clientY;

      stateRef.current.targetRotationY += deltaX * 0.009;
      stateRef.current.targetPitch = Math.max(-0.4, Math.min(0.6, stateRef.current.targetPitch + deltaY * 0.005));
    };

    const onPointerUp = () => {
      stateRef.current.isDragging = false;
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (stateRef.current.isRotating && !stateRef.current.isDragging) {
        stateRef.current.targetRotationY += 0.008;
      }

      stateRef.current.currentRotationY += (stateRef.current.targetRotationY - stateRef.current.currentRotationY) * 0.12;
      stateRef.current.currentPitch += (stateRef.current.targetPitch - stateRef.current.currentPitch) * 0.12;

      if (carPivot) {
        carPivot.rotation.y = stateRef.current.currentRotationY;
      }

      if (camera) {
        camera.position.y = 1.8 + stateRef.current.currentPitch * 1.5;
        camera.lookAt(0, 0.45, 0);
      }

      ringMesh.rotation.z += 0.004;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 360;
      const h = container.clientHeight || 230;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', onResize);
      dracoLoader.dispose();
      renderer.dispose();
    };
  }, []);

  const handleReset = () => {
    stateRef.current.targetRotationY = 0;
    stateRef.current.currentRotationY = 0;
    stateRef.current.targetPitch = 0;
    stateRef.current.currentPitch = 0;
  };

  const handleColorCycle = () => {
    setColorIndex((prev) => (prev + 1) % PAINT_COLORS.length);
  };

  return (
    <div className="car3d-container active" ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block', cursor: 'grab' }} />

      {/* 3D HUD Toolbar */}
      <div className="car3d-hud-toolbar">
        <button
          type="button"
          className={`car3d-tool-btn ${isRotating ? 'active' : ''}`}
          onClick={() => setIsRotating((prev) => !prev)}
          title="Toggle Auto-Rotation"
        >
          <span>🔄 Rotate</span>
        </button>
        <button
          type="button"
          className={`car3d-tool-btn ${isWireframe ? 'active' : ''}`}
          onClick={() => setIsWireframe((prev) => !prev)}
          title="Toggle 3D Diagnostic Wireframe"
        >
          <span>⚡ Wireframe</span>
        </button>
        <button
          type="button"
          className="car3d-tool-btn"
          onClick={handleColorCycle}
          title={`Color: ${PAINT_COLORS[colorIndex].name}`}
        >
          <span>🎨 Color</span>
        </button>
        <button
          type="button"
          className="car3d-tool-btn"
          onClick={handleReset}
          title="Reset Camera View"
        >
          <span>⟲</span>
        </button>
      </div>

      {/* Interactive Drag Hint */}
      {showHint && (
        <div className="car3d-drag-hint">
          <span>👆 Drag to Rotate in 3D</span>
        </div>
      )}

      {/* 3D WebGL Badge */}
      <div className="holo-badge" style={{ top: '0.85rem', left: '0.85rem' }}>
        <span className="holo-radar-dot"></span>
        <span>WebGL 3D Interactive</span>
      </div>
    </div>
  );
};
