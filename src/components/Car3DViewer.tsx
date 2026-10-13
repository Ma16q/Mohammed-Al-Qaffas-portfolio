import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useLanguage } from '../context/LanguageContext';

interface Car3DViewerProps {
  theme?: 'dark' | 'light';
}

type DiagnosticMode = 'overview' | 'engine' | 'tires' | 'workshops';

const PAINT_COLORS = [
  { name: 'Cyber Cyan', color: 0x00f5d4, rough: 0.14, metal: 0.92 },
  { name: 'Neon Purple', color: 0xa855f7, rough: 0.16, metal: 0.90 },
  { name: 'Sunset Amber', color: 0xf59e0b, rough: 0.18, metal: 0.88 },
  { name: 'Racing Red', color: 0xef4444, rough: 0.20, metal: 0.88 },
  { name: 'Matrix Emerald', color: 0x10b981, rough: 0.15, metal: 0.92 }
];

const CAMERA_PRESETS: Record<DiagnosticMode, { pos: [number, number, number]; lookAt: [number, number, number] }> = {
  overview: { pos: [3.4, 1.6, 3.8], lookAt: [0, 0.45, 0] },
  engine: { pos: [1.1, 1.25, 2.2], lookAt: [0, 0.5, 0.8] },
  tires: { pos: [2.15, 0.5, 1.25], lookAt: [1.05, 0.35, 0.85] },
  workshops: { pos: [0.1, 3.8, 2.4], lookAt: [0, 0.2, 0] }
};

export const Car3DViewer: React.FC<Car3DViewerProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [mode, setMode] = useState<DiagnosticMode>('overview');
  const [isRotating, setIsRotating] = useState(true);
  const [colorIndex, setColorIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [scrollReactive, setScrollReactive] = useState(true);

  // Mutable animation state
  const animStateRef = useRef({
    mode: 'overview' as DiagnosticMode,
    isRotating: true,
    scrollReactive: true,
    colorIndex: 0,
    carGroup: null as THREE.Group | null,
    hoodMesh: null as THREE.Mesh | null,
    engineCore: null as THREE.Group | null,
    tireRing: null as THREE.Mesh | null,
    radarRings: [] as THREE.Mesh[],
    bodyMaterial: null as THREE.MeshPhysicalMaterial | null,
    camera: null as THREE.PerspectiveCamera | null,
    currentCamPos: new THREE.Vector3(3.4, 1.6, 3.8),
    targetCamPos: new THREE.Vector3(3.4, 1.6, 3.8),
    currentLookAt: new THREE.Vector3(0, 0.45, 0),
    targetLookAt: new THREE.Vector3(0, 0.45, 0),
    targetRotationY: 0,
    currentRotationY: 0,
    isDragging: false,
    prevX: 0,
    prevY: 0
  });

  // Sync state with refs
  useEffect(() => {
    animStateRef.current.mode = mode;
    const preset = CAMERA_PRESETS[mode];
    animStateRef.current.targetCamPos.set(...preset.pos);
    animStateRef.current.targetLookAt.set(...preset.lookAt);

    // Toggle hood wireframe if in engine mode
    if (animStateRef.current.hoodMesh) {
      const hoodMat = animStateRef.current.hoodMesh.material as THREE.MeshPhysicalMaterial;
      if (hoodMat) {
        hoodMat.wireframe = mode === 'engine';
        hoodMat.opacity = mode === 'engine' ? 0.4 : 1.0;
        hoodMat.transparent = mode === 'engine';
        hoodMat.needsUpdate = true;
      }
    }
  }, [mode]);

  useEffect(() => {
    animStateRef.current.isRotating = isRotating;
  }, [isRotating]);

  useEffect(() => {
    animStateRef.current.scrollReactive = scrollReactive;
  }, [scrollReactive]);

  useEffect(() => {
    animStateRef.current.colorIndex = colorIndex;
    const mat = animStateRef.current.bodyMaterial;
    if (mat) {
      const p = PAINT_COLORS[colorIndex];
      mat.color.setHex(p.color);
      mat.roughness = p.rough;
      mat.metalness = p.metal;
      mat.needsUpdate = true;
    }
  }, [colorIndex]);

  // Scroll listener: smoothly alters state based on viewport position
  useEffect(() => {
    const handleScroll = () => {
      if (!animStateRef.current.scrollReactive) return;
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Only respond when card is partially visible
      if (rect.bottom < 0 || rect.top > vh) return;

      const progress = (vh - rect.top) / (vh + rect.height);

      let nextMode: DiagnosticMode = 'overview';
      if (progress > 0.78) {
        nextMode = 'workshops';
      } else if (progress > 0.55) {
        nextMode = 'tires';
      } else if (progress > 0.32) {
        nextMode = 'engine';
      } else {
        nextMode = 'overview';
      }

      if (nextMode !== animStateRef.current.mode) {
        setMode(nextMode);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Three.js Scene Setup (Procedural lightweight telemetry vehicle)
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 230;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 80);
    camera.position.set(3.4, 1.6, 3.8);
    animStateRef.current.camera = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 2.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(6, 9, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 2.4);
    fillLight.position.set(-6, 4, -4);
    scene.add(fillLight);

    const underglowLight = new THREE.PointLight(0x00f5d4, 3.5, 6);
    underglowLight.position.set(0, 0.15, 0);
    scene.add(underglowLight);

    // Telemetry Radar Grid & Rings
    const gridHelper = new THREE.GridHelper(8, 20, 0x00f5d4, 0x1e293b);
    gridHelper.position.y = 0.002;
    scene.add(gridHelper);

    const radarRings: THREE.Mesh[] = [];
    [2.4, 3.2, 4.0].forEach((radius, i) => {
      const ringGeo = new THREE.RingGeometry(radius, radius + 0.035, 64);
      ringGeo.rotateX(-Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6 - i * 0.15
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.y = 0.005 + i * 0.002;
      scene.add(ringMesh);
      radarRings.push(ringMesh);
    });
    animStateRef.current.radarRings = radarRings;

    // Root Car Group
    const carGroup = new THREE.Group();
    scene.add(carGroup);
    animStateRef.current.carGroup = carGroup;

    // Materials
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: PAINT_COLORS[0].color,
      metalness: PAINT_COLORS[0].metal,
      roughness: PAINT_COLORS[0].rough,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0
    });
    animStateRef.current.bodyMaterial = bodyMaterial;

    const hoodMaterial = new THREE.MeshPhysicalMaterial({
      color: PAINT_COLORS[0].color,
      metalness: PAINT_COLORS[0].metal,
      roughness: PAINT_COLORS[0].rough,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0a192f,
      metalness: 0.2,
      roughness: 0.05,
      transmission: 0.85,
      transparent: true,
      opacity: 0.88,
      reflectivity: 0.95
    });

    const darkTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.8,
      roughness: 0.3
    });

    const tireMaterial = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.85,
      metalness: 0.1
    });

    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.15
    });

    const brakeCaliperMaterial = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      emissive: 0x00f5d4,
      emissiveIntensity: 0.6
    });

    // 1. Lower Chassis
    const lowerBodyGeo = new THREE.BoxGeometry(1.9, 0.42, 3.8);
    const lowerBody = new THREE.Mesh(lowerBodyGeo, bodyMaterial);
    lowerBody.position.y = 0.42;
    carGroup.add(lowerBody);

    // 2. Cabin / Greenhouse
    const cabinGeo = new THREE.BoxGeometry(1.5, 0.48, 1.9);
    const cabin = new THREE.Mesh(cabinGeo, glassMaterial);
    cabin.position.set(0, 0.82, -0.15);
    carGroup.add(cabin);

    // Roof
    const roofGeo = new THREE.BoxGeometry(1.45, 0.05, 1.7);
    const roof = new THREE.Mesh(roofGeo, bodyMaterial);
    roof.position.set(0, 1.08, -0.15);
    carGroup.add(roof);

    // 3. Engine Hood (Separate for Wireframe Diagnostics inspection)
    const hoodGeo = new THREE.BoxGeometry(1.7, 0.12, 1.15);
    const hoodMesh = new THREE.Mesh(hoodGeo, hoodMaterial);
    hoodMesh.position.set(0, 0.66, 1.15);
    carGroup.add(hoodMesh);
    animStateRef.current.hoodMesh = hoodMesh;

    // 4. Internal Engine & Battery Diagnostic Core
    const engineCore = new THREE.Group();
    engineCore.position.set(0, 0.46, 1.15);
    const engineBlockGeo = new THREE.BoxGeometry(1.1, 0.28, 0.85);
    const engineBlockMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x00f5d4,
      emissiveIntensity: 0.8,
      wireframe: true
    });
    const engineBlock = new THREE.Mesh(engineBlockGeo, engineBlockMat);
    engineCore.add(engineBlock);

    // Pulsing diagnostic core sphere
    const pulseGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
    const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
    engineCore.add(pulseMesh);
    carGroup.add(engineCore);
    animStateRef.current.engineCore = engineCore;

    // 5. Headlights & Cyber Taillights
    const headLightGeo = new THREE.BoxGeometry(0.42, 0.07, 0.08);
    const headLightMat = new THREE.MeshBasicMaterial({ color: 0xe0f2fe });
    const leftHeadlight = new THREE.Mesh(headLightGeo, headLightMat);
    leftHeadlight.position.set(0.65, 0.52, 1.91);
    const rightHeadlight = new THREE.Mesh(headLightGeo, headLightMat);
    rightHeadlight.position.set(-0.65, 0.52, 1.91);
    carGroup.add(leftHeadlight, rightHeadlight);

    // Cyber rear lightbar
    const tailBarGeo = new THREE.BoxGeometry(1.75, 0.06, 0.06);
    const tailBarMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const tailBar = new THREE.Mesh(tailBarGeo, tailBarMat);
    tailBar.position.set(0, 0.56, -1.91);
    carGroup.add(tailBar);

    // Aerodynamic Rear Diffuser & Front Splitter
    const splitterGeo = new THREE.BoxGeometry(1.85, 0.04, 0.35);
    const splitter = new THREE.Mesh(splitterGeo, darkTrimMaterial);
    splitter.position.set(0, 0.18, 1.95);
    const diffuser = new THREE.Mesh(splitterGeo, darkTrimMaterial);
    diffuser.position.set(0, 0.22, -1.95);
    carGroup.add(splitter, diffuser);

    // 6. Wheels (4 assemblies)
    const wheelPositions = [
      { x: 1.02, y: 0.35, z: 1.15, isFrontLeft: true },
      { x: -1.02, y: 0.35, z: 1.15, isFrontLeft: false },
      { x: 1.02, y: 0.35, z: -1.15, isFrontLeft: false },
      { x: -1.02, y: 0.35, z: -1.15, isFrontLeft: false }
    ];

    const tireGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.28, 24);
    tireGeo.rotateZ(Math.PI / 2);
    const rimGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.29, 16);
    rimGeo.rotateZ(Math.PI / 2);
    const caliperGeo = new THREE.BoxGeometry(0.08, 0.14, 0.16);

    wheelPositions.forEach((pos) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(pos.x, pos.y, pos.z);

      const tire = new THREE.Mesh(tireGeo, tireMaterial);
      const rim = new THREE.Mesh(rimGeo, rimMaterial);
      const caliper = new THREE.Mesh(caliperGeo, brakeCaliperMaterial);
      caliper.position.set(pos.x > 0 ? -0.08 : 0.08, 0.14, 0);

      wheelGroup.add(tire, rim, caliper);
      carGroup.add(wheelGroup);

      // Add a special glowing telemetry sensor ring around the Front-Left wheel
      if (pos.isFrontLeft) {
        const tireRingGeo = new THREE.RingGeometry(0.38, 0.42, 32);
        tireRingGeo.rotateY(Math.PI / 2);
        const tireRingMat = new THREE.MeshBasicMaterial({
          color: 0x00f5d4,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8
        });
        const tireRing = new THREE.Mesh(tireRingGeo, tireRingMat);
        tireRing.position.set(pos.x + 0.16, pos.y, pos.z);
        carGroup.add(tireRing);
        animStateRef.current.tireRing = tireRing;
      }
    });

    // Interaction handlers
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      animStateRef.current.isDragging = true;
      setShowHint(false);
      setScrollReactive(false); // Manual drag suspends auto-scroll until reset
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      animStateRef.current.prevX = clientX;
      animStateRef.current.prevY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!animStateRef.current.isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - animStateRef.current.prevX;
      const deltaY = clientY - animStateRef.current.prevY;
      animStateRef.current.prevX = clientX;
      animStateRef.current.prevY = clientY;

      animStateRef.current.targetRotationY += deltaX * 0.009;
      animStateRef.current.targetCamPos.y = Math.max(0.6, Math.min(4.5, animStateRef.current.targetCamPos.y + deltaY * 0.006));
    };

    const onPointerUp = () => {
      animStateRef.current.isDragging = false;
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation towards target
      animStateRef.current.currentCamPos.lerp(animStateRef.current.targetCamPos, 0.07);
      animStateRef.current.currentLookAt.lerp(animStateRef.current.targetLookAt, 0.07);

      camera.position.copy(animStateRef.current.currentCamPos);
      camera.lookAt(animStateRef.current.currentLookAt);

      // Auto rotation in overview mode
      if (animStateRef.current.isRotating && !animStateRef.current.isDragging && animStateRef.current.mode === 'overview') {
        animStateRef.current.targetRotationY += 0.007;
      }

      // Smooth car rotation damping
      animStateRef.current.currentRotationY += (animStateRef.current.targetRotationY - animStateRef.current.currentRotationY) * 0.1;
      if (carGroup) {
        carGroup.rotation.y = animStateRef.current.currentRotationY;
      }

      // Pulse engine core in engine mode
      if (animStateRef.current.engineCore) {
        const s = 1 + Math.sin(elapsedTime * 5) * 0.15;
        animStateRef.current.engineCore.scale.set(s, s, s);
      }

      // Rotate tire sensor ring
      if (animStateRef.current.tireRing) {
        animStateRef.current.tireRing.rotation.x += 0.03;
      }

      // Rotate radar ground rings
      radarRings.forEach((r, idx) => {
        r.rotation.z += 0.003 * (idx % 2 === 0 ? 1 : -1);
      });

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
      renderer.dispose();
    };
  }, []);

  const handleSelectMode = useCallback((newMode: DiagnosticMode) => {
    setMode(newMode);
    setScrollReactive(false); // User clicked a specific mode explicitly
  }, []);

  const handleReset = () => {
    setMode('overview');
    setScrollReactive(true);
    animStateRef.current.targetRotationY = 0;
    animStateRef.current.currentRotationY = 0;
  };

  const handleColorCycle = () => {
    setColorIndex((prev) => (prev + 1) % PAINT_COLORS.length);
  };

  // Status HUD texts based on mode and language
  const statusLabels: Record<DiagnosticMode, { en: string; ar: string; badge: string; badgeAr: string }> = {
    overview: {
      en: 'Vehicle Health: 96% Nominal • 42,500 km',
      ar: 'حالة المركبة: 96% منتظمة • العداد: 42,500 كم',
      badge: '3D Telemetry Twin',
      badgeAr: 'التوأم الرقمي الذكي'
    },
    engine: {
      en: 'Engine Diagnostics: Optimal • Oil Life: 82% (Next: 5,000 km)',
      ar: 'فحص المحرك: ممتاز • عمر الزيت: 82% (المتبقي: 5,000 كم)',
      badge: 'Engine & Oil Telemetry',
      badgeAr: 'تيليماتري المحرك والزيوت'
    },
    tires: {
      en: 'Tire Pressure: 35 PSI • Brake Pads: 7.8mm (Optimal)',
      ar: 'ضغط الإطارات: 35 PSI • تآكل الفرامل: 7.8mm (سليم)',
      badge: 'Tires & Brakes Sensor',
      badgeAr: 'حساسات الإطارات والفرامل'
    },
    workshops: {
      en: 'Service Map: 3 Nearby Repair Centers (Leaflet/OSM)',
      ar: 'خريطة الصيانة: 3 مراكز صيانة قريبة (Leaflet/OSM)',
      badge: 'Nearby Workshops Map',
      badgeAr: 'خريطة ورش الصيانة القريبة'
    }
  };

  return (
    <div className="car3d-container active" ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block', cursor: 'grab' }} />

      {/* Top Holographic Diagnostic Badge */}
      <div className="holo-badge" style={{ top: '0.75rem', left: '0.75rem' }}>
        <span className="holo-radar-dot"></span>
        <span>{isAr ? statusLabels[mode].badgeAr : statusLabels[mode].badge}</span>
      </div>

      {/* Dynamic Telemetry Status Bar */}
      <div
        className="car3d-status-bar"
        style={{
          position: 'absolute',
          bottom: '3.4rem',
          left: '0.75rem',
          right: '0.75rem',
          padding: '0.45rem 0.85rem',
          background: 'rgba(15, 23, 42, 0.82)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: '8px',
          fontSize: '0.78rem',
          color: '#e0f2fe',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'none',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
        }}
      >
        <span>{isAr ? statusLabels[mode].ar : statusLabels[mode].en}</span>
        {scrollReactive && (
          <span style={{ fontSize: '0.7rem', color: '#38bdf8', opacity: 0.9 }}>
            {isAr ? '⚡ يتفاعل مع السكرول' : '⚡ Scroll-Reactive'}
          </span>
        )}
      </div>

      {/* 3D HUD Diagnostic Stage Selector Toolbar */}
      <div className="car3d-hud-toolbar" style={{ bottom: '0.65rem' }}>
        <button
          type="button"
          className={`car3d-tool-btn ${mode === 'overview' ? 'active' : ''}`}
          onClick={() => handleSelectMode('overview')}
          title={isAr ? 'نظرة عامة على المركبة' : 'Overview 360'}
        >
          <span>{isAr ? '🌐 شامل' : '🌐 Overview'}</span>
        </button>

        <button
          type="button"
          className={`car3d-tool-btn ${mode === 'engine' ? 'active' : ''}`}
          onClick={() => handleSelectMode('engine')}
          title={isAr ? 'فحص المحرك والزيوت' : 'Engine Diagnostics'}
        >
          <span>{isAr ? '⚡ المحرك' : '⚡ Engine'}</span>
        </button>

        <button
          type="button"
          className={`car3d-tool-btn ${mode === 'tires' ? 'active' : ''}`}
          onClick={() => handleSelectMode('tires')}
          title={isAr ? 'تيليماتري الإطارات والفرامل' : 'Tires & Brakes'}
        >
          <span>{isAr ? '🛞 الإطارات' : '🛞 Tires'}</span>
        </button>

        <button
          type="button"
          className={`car3d-tool-btn ${mode === 'workshops' ? 'active' : ''}`}
          onClick={() => handleSelectMode('workshops')}
          title={isAr ? 'خريطة الورش القريبة' : 'Workshop Locator'}
        >
          <span>{isAr ? '📍 الورش' : '📍 Map'}</span>
        </button>

        <button
          type="button"
          className={`car3d-tool-btn ${isRotating ? 'active' : ''}`}
          onClick={() => setIsRotating((prev) => !prev)}
          title={isAr ? 'تشغيل/إيقاف الدوران التلقائي' : 'Toggle Auto-Rotation'}
        >
          <span>🔄</span>
        </button>

        <button
          type="button"
          className="car3d-tool-btn"
          onClick={handleColorCycle}
          title={`Color: ${PAINT_COLORS[colorIndex].name}`}
        >
          <span>🎨</span>
        </button>

        <button
          type="button"
          className="car3d-tool-btn"
          onClick={handleReset}
          title={isAr ? 'إعادة ضبط المنظور والسكرول' : 'Reset View & Auto-Scroll'}
        >
          <span>⟲</span>
        </button>
      </div>

      {/* Drag & Scroll Hint */}
      {showHint && (
        <div className="car3d-drag-hint" style={{ bottom: '5.8rem' }}>
          <span>{isAr ? '👆 اسحب للتدوير أو مرر الصفحة لتغيير الفحص' : '👆 Drag 360° or Scroll page to inspect'}</span>
        </div>
      )}
    </div>
  );
};
