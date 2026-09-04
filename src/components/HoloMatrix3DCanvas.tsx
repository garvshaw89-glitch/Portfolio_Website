import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type HoloMatrixMode = 
  | 'matrix-rain' 
  | 'quantum-tesseract' 
  | 'cyber-sphere' 
  | 'dna-helix' 
  | 'wavefield-mesh';

export type HoloColorTheme = 'cyan' | 'purple' | 'emerald' | 'amber';

interface HoloMatrix3DCanvasProps {
  mode: HoloMatrixMode;
  colorTheme?: HoloColorTheme;
  interactive?: boolean;
  speed?: number;
  className?: string;
  onClick?: () => void;
}

export default function HoloMatrix3DCanvas({
  mode,
  colorTheme = 'cyan',
  interactive = true,
  speed = 1,
  className = "w-full h-full",
  onClick
}: HoloMatrix3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Color schemes
  const colors = {
    cyan: { primary: 0x06b6d4, secondary: 0x38bdf8, accent: 0xa78bfa, ambient: 0x0c4a6e },
    purple: { primary: 0xa78bfa, secondary: 0x7c3aed, accent: 0x06b6d4, ambient: 0x2e1065 },
    emerald: { primary: 0x10b981, secondary: 0x34d399, accent: 0x06b6d4, ambient: 0x064e3b },
    amber: { primary: 0xf59e0b, secondary: 0xfbbf24, accent: 0xec4899, ambient: 0x78350f },
  }[colorTheme];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 600;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 7;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.pointerEvents = 'none';
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Root Group for rotation and mouse interaction
    const matrixRoot = new THREE.Group();
    scene.add(matrixRoot);

    // Mouse tracking for 3D tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
      targetRotationY = mouseX * 0.8;
      targetRotationX = -mouseY * 0.8;
    };

    if (interactive) {
      container.addEventListener('mousemove', onMouseMove);
    }

    // Cleanable animate callback & mesh references
    let animationFrameId: number;
    let updateModeLogic: (time: number) => void = () => {};

    // =========================================================================
    // BUILD MODE 1: MATRIX RAIN & DATA VORTEX
    // =========================================================================
    if (mode === 'matrix-rain') {
      const glyphCount = 1800;
      const rainGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(glyphCount * 3);
      const velocities = new Float32Array(glyphCount);
      const opacities = new Float32Array(glyphCount);

      // Distribute in a 3D cylindrical vortex
      for (let i = 0; i < glyphCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 1.2 + Math.random() * 3.6;
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = Math.sin(angle) * radius;
        velocities[i] = 0.04 + Math.random() * 0.08;
        opacities[i] = Math.random();
      }

      rainGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      // Canvas-based matrix glowing square texture
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 64;
      pCanvas.height = 64;
      const pCtx = pCanvas.getContext('2d');
      if (pCtx) {
        pCtx.fillStyle = '#ffffff';
        pCtx.fillRect(16, 8, 32, 48);
        pCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        pCtx.fillRect(8, 4, 48, 56);
      }
      const pTexture = new THREE.CanvasTexture(pCanvas);

      const rainMaterial = new THREE.PointsMaterial({
        color: colors.primary,
        size: 0.14,
        map: pTexture,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const rainPoints = new THREE.Points(rainGeometry, rainMaterial);
      matrixRoot.add(rainPoints);

      // Central Torus Rings for Data Singularity
      const ringGeom = new THREE.TorusGeometry(1.6, 0.02, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({ 
        color: colors.secondary, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.6 
      });
      const ring1 = new THREE.Mesh(ringGeom, ringMat);
      const ring2 = new THREE.Mesh(ringGeom, ringMat);
      ring2.rotation.x = Math.PI / 2;
      matrixRoot.add(ring1);
      matrixRoot.add(ring2);

      // Outer Cyberspace Data Cage
      const cageGeom = new THREE.CylinderGeometry(3.6, 3.6, 8, 24, 8, true);
      const cageMat = new THREE.MeshBasicMaterial({
        color: colors.accent,
        wireframe: true,
        transparent: true,
        opacity: 0.15
      });
      const cage = new THREE.Mesh(cageGeom, cageMat);
      matrixRoot.add(cage);

      updateModeLogic = (time) => {
        const pos = rainGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < glyphCount; i++) {
          pos[i * 3 + 1] -= velocities[i] * speed;
          if (pos[i * 3 + 1] < -5) {
            pos[i * 3 + 1] = 5;
          }
        }
        rainGeometry.attributes.position.needsUpdate = true;

        ring1.rotation.x = time * 0.6 * speed;
        ring1.rotation.y = time * 0.4 * speed;
        ring2.rotation.y = -time * 0.5 * speed;
        ring2.rotation.z = time * 0.3 * speed;
        cage.rotation.y = time * 0.1 * speed;
      };
    }

    // =========================================================================
    // BUILD MODE 2: QUANTUM TESSERACT (4D HYPERCUBE)
    // =========================================================================
    else if (mode === 'quantum-tesseract') {
      const outerBoxGeom = new THREE.BoxGeometry(2.8, 2.8, 2.8);
      const outerBoxEdges = new THREE.EdgesGeometry(outerBoxGeom);
      const outerBoxMat = new THREE.LineBasicMaterial({ 
        color: colors.primary, 
        linewidth: 2,
        transparent: true,
        opacity: 0.85
      });
      const outerBox = new THREE.LineSegments(outerBoxEdges, outerBoxMat);
      matrixRoot.add(outerBox);

      // Inner Tesseract Cube
      const innerBoxGeom = new THREE.BoxGeometry(1.4, 1.4, 1.4);
      const innerBoxEdges = new THREE.EdgesGeometry(innerBoxGeom);
      const innerBoxMat = new THREE.LineBasicMaterial({ 
        color: colors.secondary, 
        transparent: true,
        opacity: 0.9 
      });
      const innerBox = new THREE.LineSegments(innerBoxEdges, innerBoxMat);
      matrixRoot.add(innerBox);

      // Core Singularity Crystal (Icosahedron)
      const coreGeom = new THREE.IcosahedronGeometry(0.65, 1);
      const coreMat = new THREE.MeshBasicMaterial({
        color: colors.accent,
        wireframe: true,
        transparent: true,
        opacity: 0.6
      });
      const coreMesh = new THREE.Mesh(coreGeom, coreMat);
      matrixRoot.add(coreMesh);

      // Connecting Hypercube Struts between outer and inner vertices
      const strutCount = 8;
      const strutGeom = new THREE.BufferGeometry();
      const strutPos = new Float32Array(strutCount * 2 * 3);
      const outerVertices = [
        [-1.4, -1.4, -1.4], [1.4, -1.4, -1.4], [1.4, 1.4, -1.4], [-1.4, 1.4, -1.4],
        [-1.4, -1.4, 1.4], [1.4, -1.4, 1.4], [1.4, 1.4, 1.4], [-1.4, 1.4, 1.4],
      ];
      const innerVertices = [
        [-0.7, -0.7, -0.7], [0.7, -0.7, -0.7], [0.7, 0.7, -0.7], [-0.7, 0.7, -0.7],
        [-0.7, -0.7, 0.7], [0.7, -0.7, 0.7], [0.7, 0.7, 0.7], [-0.7, 0.7, 0.7],
      ];
      for (let i = 0; i < 8; i++) {
        strutPos[i * 6] = outerVertices[i][0];
        strutPos[i * 6 + 1] = outerVertices[i][1];
        strutPos[i * 6 + 2] = outerVertices[i][2];
        strutPos[i * 6 + 3] = innerVertices[i][0];
        strutPos[i * 6 + 4] = innerVertices[i][1];
        strutPos[i * 6 + 5] = innerVertices[i][2];
      }
      strutGeom.setAttribute('position', new THREE.BufferAttribute(strutPos, 3));
      const strutMat = new THREE.LineBasicMaterial({ 
        color: colors.secondary, 
        transparent: true, 
        opacity: 0.45 
      });
      const struts = new THREE.LineSegments(strutGeom, strutMat);
      matrixRoot.add(struts);

      // Surrounding Quantum Vertex Glows
      const vertexGeom = new THREE.BufferGeometry();
      const vPos = new Float32Array(16 * 3);
      for (let i = 0; i < 8; i++) {
        vPos[i * 3] = outerVertices[i][0];
        vPos[i * 3 + 1] = outerVertices[i][1];
        vPos[i * 3 + 2] = outerVertices[i][2];
        vPos[(i + 8) * 3] = innerVertices[i][0];
        vPos[(i + 8) * 3 + 1] = innerVertices[i][1];
        vPos[(i + 8) * 3 + 2] = innerVertices[i][2];
      }
      vertexGeom.setAttribute('position', new THREE.BufferAttribute(vPos, 3));
      const vertexMat = new THREE.PointsMaterial({
        color: colors.primary,
        size: 0.18,
        transparent: true,
        opacity: 0.95
      });
      const vertexPoints = new THREE.Points(vertexGeom, vertexMat);
      matrixRoot.add(vertexPoints);

      // Atmospheric orbital rings
      const ringGeom = new THREE.RingGeometry(2.3, 2.35, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: colors.accent,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35
      });
      const tesseractRing = new THREE.Mesh(ringGeom, ringMat);
      matrixRoot.add(tesseractRing);

      updateModeLogic = (time) => {
        outerBox.rotation.x = time * 0.4 * speed;
        outerBox.rotation.y = time * 0.6 * speed;
        
        innerBox.rotation.x = -time * 0.7 * speed;
        innerBox.rotation.y = time * 0.9 * speed;
        
        coreMesh.rotation.y = time * 1.2 * speed;
        coreMesh.rotation.z = -time * 0.5 * speed;

        struts.rotation.x = time * 0.4 * speed;
        struts.rotation.y = time * 0.6 * speed;

        vertexPoints.rotation.x = time * 0.4 * speed;
        vertexPoints.rotation.y = time * 0.6 * speed;

        tesseractRing.rotation.z = time * 0.3 * speed;
        tesseractRing.rotation.x = Math.sin(time * 0.5) * 0.4;
      };
    }

    // =========================================================================
    // BUILD MODE 3: CYBERNETIC GEODESIC SPHERE
    // =========================================================================
    else if (mode === 'cyber-sphere') {
      const sphereGeom = new THREE.IcosahedronGeometry(2.0, 3);
      const sphereEdges = new THREE.EdgesGeometry(sphereGeom);
      const sphereMat = new THREE.LineBasicMaterial({
        color: colors.primary,
        transparent: true,
        opacity: 0.65
      });
      const sphereWire = new THREE.LineSegments(sphereEdges, sphereMat);
      matrixRoot.add(sphereWire);

      // Concentric Equator and Meridian Rings
      const ringGeom1 = new THREE.TorusGeometry(2.4, 0.015, 16, 100);
      const ringMat1 = new THREE.MeshBasicMaterial({ color: colors.secondary, transparent: true, opacity: 0.7 });
      const ring1 = new THREE.Mesh(ringGeom1, ringMat1);
      matrixRoot.add(ring1);

      const ringGeom2 = new THREE.TorusGeometry(2.7, 0.012, 16, 100);
      const ringMat2 = new THREE.MeshBasicMaterial({ color: colors.accent, transparent: true, opacity: 0.5 });
      const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
      ring2.rotation.x = Math.PI / 3;
      matrixRoot.add(ring2);

      const ringGeom3 = new THREE.TorusGeometry(3.0, 0.01, 16, 100);
      const ringMat3 = new THREE.MeshBasicMaterial({ color: colors.primary, transparent: true, opacity: 0.4 });
      const ring3 = new THREE.Mesh(ringGeom3, ringMat3);
      ring3.rotation.y = Math.PI / 3;
      matrixRoot.add(ring3);

      // Orbital Satellites / Nodes
      const satelliteCount = 120;
      const satGeom = new THREE.BufferGeometry();
      const satPos = new Float32Array(satelliteCount * 3);
      for (let i = 0; i < satelliteCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const rad = 2.15 + (Math.random() - 0.5) * 0.4;
        satPos[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
        satPos[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
        satPos[i * 3 + 2] = rad * Math.cos(phi);
      }
      satGeom.setAttribute('position', new THREE.BufferAttribute(satPos, 3));
      const satMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.08,
        transparent: true,
        opacity: 0.9
      });
      const satPoints = new THREE.Points(satGeom, satMat);
      matrixRoot.add(satPoints);

      // Scanner Laser Plane passing through sphere
      const scanGeom = new THREE.CircleGeometry(2.35, 48);
      const scanMat = new THREE.MeshBasicMaterial({
        color: colors.primary,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending
      });
      const scanPlane = new THREE.Mesh(scanGeom, scanMat);
      matrixRoot.add(scanPlane);

      updateModeLogic = (time) => {
        sphereWire.rotation.y = time * 0.3 * speed;
        sphereWire.rotation.x = time * 0.15 * speed;
        ring1.rotation.z = time * 0.5 * speed;
        ring2.rotation.y = -time * 0.4 * speed;
        ring3.rotation.x = time * 0.35 * speed;
        satPoints.rotation.y = -time * 0.2 * speed;
        
        // Oscillate scanner plane
        scanPlane.position.y = Math.sin(time * 2 * speed) * 1.8;
      };
    }

    // =========================================================================
    // BUILD MODE 4: CYBERNETIC DNA / BIO-MATRIX HELIX
    // =========================================================================
    else if (mode === 'dna-helix') {
      const rungCount = 60;
      const radius = 1.2;
      const heightSpan = 6.0;
      const strand1Pos = new Float32Array(rungCount * 3);
      const strand2Pos = new Float32Array(rungCount * 3);
      const rungsPos = new Float32Array(rungCount * 2 * 3);

      for (let i = 0; i < rungCount; i++) {
        const t = (i / rungCount) * Math.PI * 4;
        const y = ((i / rungCount) - 0.5) * heightSpan;
        const x1 = Math.cos(t) * radius;
        const z1 = Math.sin(t) * radius;
        const x2 = Math.cos(t + Math.PI) * radius;
        const z2 = Math.sin(t + Math.PI) * radius;

        strand1Pos[i * 3] = x1;
        strand1Pos[i * 3 + 1] = y;
        strand1Pos[i * 3 + 2] = z1;

        strand2Pos[i * 3] = x2;
        strand2Pos[i * 3 + 1] = y;
        strand2Pos[i * 3 + 2] = z2;

        rungsPos[i * 6] = x1;
        rungsPos[i * 6 + 1] = y;
        rungsPos[i * 6 + 2] = z1;
        rungsPos[i * 6 + 3] = x2;
        rungsPos[i * 6 + 4] = y;
        rungsPos[i * 6 + 5] = z2;
      }

      // Strand 1 Points
      const strand1Geom = new THREE.BufferGeometry();
      strand1Geom.setAttribute('position', new THREE.BufferAttribute(strand1Pos, 3));
      const strand1Mat = new THREE.PointsMaterial({
        color: colors.primary,
        size: 0.16,
        transparent: true,
        opacity: 0.95
      });
      const strand1Mesh = new THREE.Points(strand1Geom, strand1Mat);
      matrixRoot.add(strand1Mesh);

      // Strand 2 Points
      const strand2Geom = new THREE.BufferGeometry();
      strand2Geom.setAttribute('position', new THREE.BufferAttribute(strand2Pos, 3));
      const strand2Mat = new THREE.PointsMaterial({
        color: colors.accent,
        size: 0.16,
        transparent: true,
        opacity: 0.95
      });
      const strand2Mesh = new THREE.Points(strand2Geom, strand2Mat);
      matrixRoot.add(strand2Mesh);

      // Connecting rungs
      const rungsGeom = new THREE.BufferGeometry();
      rungsGeom.setAttribute('position', new THREE.BufferAttribute(rungsPos, 3));
      const rungsMat = new THREE.LineBasicMaterial({
        color: colors.secondary,
        transparent: true,
        opacity: 0.5
      });
      const rungsMesh = new THREE.LineSegments(rungsGeom, rungsMat);
      matrixRoot.add(rungsMesh);

      // Surrounding particle dust cloud
      const dustCount = 400;
      const dustGeom = new THREE.BufferGeometry();
      const dustPos = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount; i++) {
        dustPos[i * 3] = (Math.random() - 0.5) * 4.5;
        dustPos[i * 3 + 1] = (Math.random() - 0.5) * 7.0;
        dustPos[i * 3 + 2] = (Math.random() - 0.5) * 4.5;
      }
      dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
      const dustMat = new THREE.PointsMaterial({
        color: colors.secondary,
        size: 0.05,
        transparent: true,
        opacity: 0.4
      });
      const dustMesh = new THREE.Points(dustGeom, dustMat);
      matrixRoot.add(dustMesh);

      updateModeLogic = (time) => {
        matrixRoot.rotation.y = time * 0.7 * speed;
        dustMesh.rotation.y = -time * 0.2 * speed;
      };
    }

    // =========================================================================
    // BUILD MODE 5: DIGITAL TERRAIN / WAVE MATRIX
    // =========================================================================
    else if (mode === 'wavefield-mesh') {
      const gridSegments = 40;
      const planeGeom = new THREE.PlaneGeometry(8, 8, gridSegments, gridSegments);
      planeGeom.rotateX(-Math.PI / 2.3);

      const planeMat = new THREE.MeshBasicMaterial({
        color: colors.primary,
        wireframe: true,
        transparent: true,
        opacity: 0.55
      });
      const planeMesh = new THREE.Mesh(planeGeom, planeMat);
      matrixRoot.add(planeMesh);

      // Dot vertices over the mesh
      const dotMat = new THREE.PointsMaterial({
        color: colors.secondary,
        size: 0.07,
        transparent: true,
        opacity: 0.8
      });
      const dotMesh = new THREE.Points(planeGeom, dotMat);
      matrixRoot.add(dotMesh);

      // Central Pulsing Beacon
      const beaconGeom = new THREE.SphereGeometry(0.35, 16, 16);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: colors.accent,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });
      const beacon = new THREE.Mesh(beaconGeom, beaconMat);
      beacon.position.y = 0.8;
      matrixRoot.add(beacon);

      const posAttribute = planeGeom.attributes.position;
      const originalY = new Float32Array(posAttribute.count);
      for (let i = 0; i < posAttribute.count; i++) {
        originalY[i] = posAttribute.getY(i);
      }

      updateModeLogic = (time) => {
        for (let i = 0; i < posAttribute.count; i++) {
          const x = posAttribute.getX(i);
          const z = posAttribute.getZ(i);
          const dist = Math.sqrt(x * x + z * z);
          const wave = Math.sin(dist * 1.5 - time * 3 * speed) * 0.35 +
                       Math.cos(x * 0.8 + time * 2 * speed) * 0.2;
          posAttribute.setY(i, originalY[i] + wave);
        }
        posAttribute.needsUpdate = true;

        beacon.rotation.y = time * 1.5 * speed;
        beacon.position.y = 0.8 + Math.sin(time * 3 * speed) * 0.2;
      };
    }

    // =========================================================================
    // ANIMATION LOOP & RESIZE OBSERVER
    // =========================================================================
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera/root tilt dampening
      if (interactive) {
        matrixRoot.rotation.x += (targetRotationX - matrixRoot.rotation.x) * 0.05;
        matrixRoot.rotation.y += (targetRotationY - matrixRoot.rotation.y) * 0.05;
      }

      // Execute custom mode animation
      updateModeLogic(elapsedTime);

      renderer.render(scene, camera);
    };

    animate();

    let resizeFrameId: number;
    const resizeObserver = new ResizeObserver((entries) => {
      cancelAnimationFrame(resizeFrameId);
      resizeFrameId = requestAnimationFrame(() => {
        if (!container) return;
        const entry = entries[0];
        const newWidth = Math.floor(entry?.contentRect.width || container.clientWidth);
        const newHeight = Math.floor(entry?.contentRect.height || container.clientHeight);
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight, false);
        }
      });
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(resizeFrameId);
      if (interactive) {
        container.removeEventListener('mousemove', onMouseMove);
      }
      resizeObserver.disconnect();
      renderer.dispose();
      scene.clear();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [mode, colorTheme, interactive, speed, colors]);

  return (
    <div 
      ref={containerRef} 
      className={`relative cursor-pointer select-none overflow-hidden ${className}`}
      onClick={onClick}
    />
  );
}
