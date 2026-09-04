import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CUBE_FACES } from '../data/portfolioData';
import { RotateCw, Sparkles, Move3d } from 'lucide-react';

export default function HoloCube3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFace, setActiveFace] = useState<string>("AI");
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 420;
    const height = container.clientHeight || 420;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // Helpers to create futuristic HUD canvas textures for each face
    function createFaceTexture(faceData: typeof CUBE_FACES[0]): THREE.CanvasTexture {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(canvas);

      // Background with subtle holographic gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 512, 512);
      bgGrad.addColorStop(0, '#0c112e');
      bgGrad.addColorStop(0.5, '#141a42');
      bgGrad.addColorStop(1, '#080c24');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 512, 512);

      // Subtle cyber grid
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1.5;
      const step = 32;
      for (let x = 0; x <= 512; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
      for (let y = 0; y <= 512; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }

      // Neon outer border
      ctx.strokeStyle = faceData.color;
      ctx.lineWidth = 6;
      ctx.strokeRect(24, 24, 464, 464);

      // Tech corner brackets
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 8;
      const bracketLen = 40;
      // Top-left
      ctx.beginPath();
      ctx.moveTo(20, 20 + bracketLen);
      ctx.lineTo(20, 20);
      ctx.lineTo(20 + bracketLen, 20);
      ctx.stroke();
      // Top-right
      ctx.beginPath();
      ctx.moveTo(492 - bracketLen, 20);
      ctx.lineTo(492, 20);
      ctx.lineTo(492, 20 + bracketLen);
      ctx.stroke();
      // Bottom-left
      ctx.beginPath();
      ctx.moveTo(20, 492 - bracketLen);
      ctx.lineTo(20, 492);
      ctx.lineTo(20 + bracketLen, 492);
      ctx.stroke();
      // Bottom-right
      ctx.beginPath();
      ctx.moveTo(492 - bracketLen, 492);
      ctx.lineTo(492, 492);
      ctx.lineTo(492, 492 - bracketLen);
      ctx.stroke();

      // Top status code
      ctx.font = '600 20px "JetBrains Mono", monospace';
      ctx.fillStyle = '#60a5fa';
      ctx.textAlign = 'left';
      ctx.fillText(`SYS // 0${CUBE_FACES.indexOf(faceData) + 1}`, 45, 65);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#a78bfa';
      ctx.fillText("GARV.SH", 467, 65);

      // Center Icon
      ctx.font = '56px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(faceData.icon, 256, 175);

      // Main keyword
      ctx.font = '900 68px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = faceData.color;
      ctx.shadowBlur = 18;
      ctx.fillText(faceData.label, 256, 275);
      ctx.shadowBlur = 0;

      // Subtitle
      ctx.font = '700 22px "Outfit", sans-serif';
      ctx.fillStyle = faceData.color;
      ctx.fillText(`[ ${faceData.subtitle.toUpperCase()} ]`, 256, 335);

      // Bottom cyber bar
      ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.fillRect(100, 420, 312, 4);
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(100, 418, 80, 8);

      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 4;
      return texture;
    }

    // Cube Materials (Right, Left, Top, Bottom, Front, Back)
    // Three.js BoxGeometry material order: +X, -X, +Y, -Y, +Z, -Z
    const materials = CUBE_FACES.map((face) => {
      const tex = createFaceTexture(face);
      return new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.25,
        metalness: 0.65,
        transparent: true,
        opacity: 0.95,
      });
    });

    // Cube Mesh
    const cubeSize = 1.9;
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // Glowing wireframe edges
    const edgesGeom = new THREE.EdgesGeometry(geometry);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      linewidth: 2,
      transparent: true,
      opacity: 0.85,
    });
    const edges = new THREE.LineSegments(edgesGeom, edgesMat);
    cube.add(edges);

    // Outer cyber orbital rings
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    const ring1Geom = new THREE.TorusGeometry(2.3, 0.015, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.55,
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(2.5, 0.015, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.45,
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ringGroup.add(ring2);

    // Floating Cyber Dust / Particles
    const particleCount = 140;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xa78bfa,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLightPurple = new THREE.PointLight(0xa78bfa, 3, 20);
    pointLightPurple.position.set(4, 5, 4);
    scene.add(pointLightPurple);

    const pointLightCyan = new THREE.PointLight(0x06b6d4, 3, 20);
    pointLightCyan.position.set(-4, -5, -4);
    scene.add(pointLightCyan);

    // Interaction & Animation state
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0.4;
    let targetRotationY = 0.6;
    let isDragging = false;
    let previousPointerPosition = { x: 0, y: 0 };
    let clock = new THREE.Clock();

    // Mouse movement listener on window/container
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - previousPointerPosition.x;
        const deltaY = e.clientY - previousPointerPosition.y;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;
        previousPointerPosition = { x: e.clientX, y: e.clientY };
      } else {
        mouseX = normX * 0.5;
        mouseY = normY * 0.5;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousPointerPosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const domElement = renderer.domElement;
    domElement.style.touchAction = 'none';
    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Animation Loop
    let animationFrameId: number;
    let currentAuto = isAutoRotate;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Floating sine wave animation
      cube.position.y = Math.sin(elapsedTime * 1.8) * 0.12;
      ringGroup.position.y = cube.position.y;

      // Idle auto-spin if not dragging
      if (!isDragging && currentAuto) {
        targetRotationY += 0.005;
        targetRotationX = Math.sin(elapsedTime * 0.6) * 0.25 + mouseY * 0.4;
      }

      // Smooth damping interpolation
      cube.rotation.y += (targetRotationY + mouseX * 0.4 - cube.rotation.y) * 0.08;
      cube.rotation.x += (targetRotationX - mouseY * 0.4 - cube.rotation.x) * 0.08;

      // Orbit rings rotation
      ring1.rotation.z += 0.004;
      ring2.rotation.x += 0.005;

      // Particles subtle drift
      particles.rotation.y = elapsedTime * 0.02;

      // Determine the face most pointing towards the camera (Z axis)
      const vector = new THREE.Vector3(0, 0, 1);
      vector.applyQuaternion(cube.quaternion);

      // Simple active face feedback
      const euler = new THREE.Euler().setFromQuaternion(cube.quaternion, 'YXZ');
      const normRotY = ((euler.y % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const faceIdx = Math.floor(((normRotY + Math.PI / 6) / (Math.PI / 3)) % 6);
      if (CUBE_FACES[faceIdx]) {
        setActiveFace(CUBE_FACES[faceIdx].label);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    let resizeFrameId: number;
    const handleResize = () => {
      cancelAnimationFrame(resizeFrameId);
      resizeFrameId = requestAnimationFrame(() => {
        if (!container) return;
        const newWidth = Math.floor(container.clientWidth);
        const newHeight = Math.floor(container.clientHeight);
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight, false);
        }
      });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(resizeFrameId);
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      resizeObserver.disconnect();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
      geometry.dispose();
      materials.forEach((m) => {
        if (m.map) m.map.dispose();
        m.dispose();
      });
      edgesGeom.dispose();
      edgesMat.dispose();
      ring1Geom.dispose();
      ring1Mat.dispose();
      ring2Geom.dispose();
      ring2Mat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div id="hero-3d-wrapper" className="relative w-full aspect-square max-w-[420px] mx-auto flex items-center justify-center select-none">
      {/* Background glow halo */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#7c3aed]/20 via-[#06b6d4]/15 to-[#60a5fa]/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Artistic Flair Diamond Accent Geometry Layer */}
      <div className="absolute w-60 h-60 border-2 border-[#06b6d4]/40 rotate-[45deg] pointer-events-none -z-5 artistic-glow-cyan">
        <div className="w-44 h-44 border border-[#a78bfa]/40 absolute inset-0 m-auto" />
      </div>

      {/* Artistic Flair HUD Badge Tag */}
      <div className="absolute top-2 right-4 bg-[#0a0e27] px-2.5 py-1 border border-[#06b6d4] text-[10px] font-mono text-[#06b6d4] z-20 shadow-sm shadow-[#06b6d4]/30">
        3D_GEOMETRY_V1 // {activeFace}
      </div>

      <div className="absolute top-2 left-4 bg-[#0a0e27] px-2.5 py-1 border border-white/15 text-[10px] font-mono text-[#c7d2fe]/70 z-20">
        SYS//HOLO_MATRIX
      </div>

      {/* Three.js canvas container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center z-10"
        title="Click and drag to rotate the 3D cube"
      />

      {/* Bottom control pills in Artistic Flair theme */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-[#0a0e27]/90 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-sm shadow-lg text-xs font-mono">
        <span className="flex items-center gap-1 text-[#c7d2fe]">
          <Move3d className="w-3.5 h-3.5 text-[#06b6d4]" />
          <span className="hidden sm:inline">Drag to rotate</span>
          <span className="sm:hidden">Drag</span>
        </span>
        <span className="text-white/20">|</span>
        <button
          id="btn-cube-autorotate"
          type="button"
          onClick={() => setIsAutoRotate(!isAutoRotate)}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] uppercase tracking-wider font-semibold transition-colors ${
            isAutoRotate 
              ? 'bg-[#06b6d4]/20 text-[#06b6d4] border border-[#06b6d4]/40' 
              : 'text-[#c7d2fe]/70 hover:text-white border border-transparent'
          }`}
        >
          <RotateCw className={`w-3 h-3 ${isAutoRotate ? 'animate-spin' : ''}`} />
          <span>{isAutoRotate ? 'Auto: ON' : 'Auto: OFF'}</span>
        </button>
      </div>
    </div>
  );
}
