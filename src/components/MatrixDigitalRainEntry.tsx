import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  FastForward, 
  ShieldCheck, 
  Eye, 
  Zap 
} from 'lucide-react';

export type MatrixColorTheme = 'matrix-green' | 'cyber-cyan';

interface MatrixDigitalRainEntryProps {
  onEnter: () => void;
  autoBypassSeconds?: number;
}

// Digital glyph characters (Katakana, Alphanumerics, Cyber symbols)
const MATRIX_CHARS = 
  'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ1234567890ABCDEFXYZ<>{}[]/*+=~$_#@';

export default function MatrixDigitalRainEntry({
  onEnter,
  autoBypassSeconds = 10
}: MatrixDigitalRainEntryProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [colorTheme, setColorTheme] = useState<MatrixColorTheme>('matrix-green');
  const [isZoomingThrough, setIsZoomingThrough] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(autoBypassSeconds);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Audio synthesis reference
  const audioContextRef = useRef<AudioContext | null>(null);

  // Auto-bypass countdown timer
  useEffect(() => {
    if (isPaused || isZoomingThrough) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          triggerEnterTransition();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, isZoomingThrough]);

  // Keyboard shortcut: Press ENTER to access, ESC to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        triggerEnterTransition();
      } else if (e.key === 'Escape') {
        handleImmediateSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cybernetic audio synthesis via Web Audio API
  const playCyberSound = (type: 'beep' | 'warp') => {
    if (!audioEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (type === 'beep') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'warp') {
        // Futuristic hyperdrive sweep
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.7);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, now);
        filter.frequency.exponentialRampToValueAtTime(8000, now + 0.6);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.85);
      }
    } catch {
      // Ignore audio policy errors
    }
  };

  // Immediate bypass
  const handleImmediateSkip = () => {
    playCyberSound('beep');
    onEnter();
  };

  // Zoom-through camera transition into the 3D matrix
  const triggerEnterTransition = useCallback(() => {
    if (isZoomingThrough) return;
    setIsZoomingThrough(true);
    playCyberSound('warp');

    // Wait for zoom fly-through animation to complete before unmounting
    setTimeout(() => {
      onEnter();
    }, 750);
  }, [isZoomingThrough, onEnter]);

  // ----------------------------------------------------------------------
  // THREE.JS 3D MATRIX RAIN ENGINE
  // ----------------------------------------------------------------------
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(colorTheme === 'matrix-green' ? 0x0d0f12 : 0x080b14);
    scene.fog = new THREE.FogExp2(
      colorTheme === 'matrix-green' ? 0x0d0f12 : 0x080b14, 
      0.002
    );

    // CAMERA SETUP
    const camera = new THREE.PerspectiveCamera(65, width / height, 1, 2000);
    camera.position.set(0, 0, 180);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    // COLOR THEME PALETTE
    const palette = colorTheme === 'matrix-green'
      ? {
          headColor: new THREE.Color(0xf0fff4), // pure glowing neon white-green
          brightColor: new THREE.Color(0x00ff66), // matrix radioactive green
          dimColor: new THREE.Color(0x008f39),   // darker matrix trailing
          accentGlow: 0x00ff66
        }
      : {
          headColor: new THREE.Color(0xe0f7ff), // bright ice white-cyan
          brightColor: new THREE.Color(0x00f3ff), // cyber electric cyan
          dimColor: new THREE.Color(0x0284c7),   // deep cyber blue trailing
          accentGlow: 0x00f3ff
        };

    // 1. GENERATE PROCEDURAL GLYPH TEXTURE ATLAS
    const atlasCanvas = document.createElement('canvas');
    const ATLAS_SIZE = 1024;
    const GRID_CELLS = 8; // 8x8 = 64 glyphs
    const CELL_SIZE = ATLAS_SIZE / GRID_CELLS;
    atlasCanvas.width = ATLAS_SIZE;
    atlasCanvas.height = ATLAS_SIZE;
    const ctx = atlasCanvas.getContext('2d')!;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, ATLAS_SIZE, ATLAS_SIZE);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${CELL_SIZE * 0.72}px "Courier New", monospace`;

    // Render characters into 8x8 cells
    for (let i = 0; i < 64; i++) {
      const col = i % GRID_CELLS;
      const row = Math.floor(i / GRID_CELLS);
      const x = col * CELL_SIZE + CELL_SIZE / 2;
      const y = row * CELL_SIZE + CELL_SIZE / 2;
      const char = MATRIX_CHARS[i % MATRIX_CHARS.length];

      // Subtle glow blur for crisp texturing
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 6;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(char, x, y);
      ctx.shadowBlur = 0;
    }

    const glyphTexture = new THREE.CanvasTexture(atlasCanvas);
    glyphTexture.minFilter = THREE.LinearMipmapLinearFilter;
    glyphTexture.magFilter = THREE.LinearFilter;

    // 2. CONSTRUCT 3D MATRIX RAIN STREAMS
    // Each stream is a vertical column floating at random (X, Z) with falling glyphs
    const NUM_STREAMS = 130;
    const GLYPHS_PER_STREAM = 24;
    const TOTAL_GLYPHS = NUM_STREAMS * GLYPHS_PER_STREAM;

    const planeGeometry = new THREE.PlaneGeometry(8, 12);

    // Custom Instanced Material using shader chunk modification for UV offsets & Colors
    const instancedMaterial = new THREE.MeshBasicMaterial({
      map: glyphTexture,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    instancedMaterial.customProgramCacheKey = () => 'matrix-instanced-rain';

    // Inject UV atlas offset in vertex shader
    instancedMaterial.onBeforeCompile = (shader) => {
      shader.vertexShader = `
        attribute vec2 aUvOffset;
        ${shader.vertexShader}
      `.replace(
        '#include <uv_vertex>',
        `
        #include <uv_vertex>
        #ifdef USE_MAP
        vMapUv = (vMapUv / 8.0) + aUvOffset;
        #endif
        `
      );
    };

    // Attribute array and InstancedBufferAttribute for UV atlas cell offset
    const uvOffsets = new Float32Array(TOTAL_GLYPHS * 2);
    const uvOffsetAttribute = new THREE.InstancedBufferAttribute(uvOffsets, 2);
    uvOffsetAttribute.setUsage(THREE.DynamicDrawUsage);
    planeGeometry.setAttribute('aUvOffset', uvOffsetAttribute);

    const instancedMesh = new THREE.InstancedMesh(planeGeometry, instancedMaterial, TOTAL_GLYPHS);
    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    // Stream metadata to drive the physics and cascading animations
    interface StreamData {
      x: number;
      z: number;
      speed: number;
      length: number;
      headY: number;
      glyphIndices: number[];
      flickerTimers: number[];
    }

    const streams: StreamData[] = [];
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    for (let s = 0; s < NUM_STREAMS; s++) {
      // Distribute streams in a wide 3D cylinder volume around the camera
      const angle = Math.random() * Math.PI * 2;
      const radius = 60 + Math.random() * 450;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius - 80;

      const glyphIndices: number[] = [];
      const flickerTimers: number[] = [];
      for (let g = 0; g < GLYPHS_PER_STREAM; g++) {
        glyphIndices.push(Math.floor(Math.random() * 64));
        flickerTimers.push(Math.random() * 30);
      }

      streams.push({
        x,
        z,
        speed: 1.4 + Math.random() * 2.8,
        length: GLYPHS_PER_STREAM,
        headY: 350 + Math.random() * 600,
        glyphIndices,
        flickerTimers
      });
    }

    // Add Ambient Volumetric Matrix Dust
    const dustGeometry = new THREE.BufferGeometry();
    const dustCount = 600;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 800;
      dustPositions[i + 1] = (Math.random() - 0.5) * 800;
      dustPositions[i + 2] = (Math.random() - 0.5) * 900;
    }
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      color: palette.accentGlow,
      size: 2.2,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const dustPoints = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustPoints);

    scene.add(instancedMesh);

    // 3. PARALLAX & MOUSE TRACKING
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / width) * 2 - 1;
      const normY = -(e.clientY / height) * 2 + 1;
      mouseX = normX * 40;
      mouseY = normY * 25;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // 4. ANIMATION LOOP
    let animationFrameId: number;
    let lastTime = performance.now();
    let warpVelocity = 0;

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Parallax smooth interpolation
      targetCameraX += (mouseX - targetCameraX) * 0.04;
      targetCameraY += (mouseY - targetCameraY) * 0.04;

      if (isZoomingThrough) {
        // Hyper-acceleration warp forward into the matrix
        warpVelocity += delta * 1200;
        camera.position.z -= warpVelocity * delta;
        camera.fov = THREE.MathUtils.lerp(camera.fov, 115, 0.08);
        camera.updateProjectionMatrix();
        dustPoints.position.z += warpVelocity * delta * 0.5;
      } else {
        camera.position.x = targetCameraX;
        camera.position.y = targetCameraY;
        camera.lookAt(0, 0, -200);
      }

      // Gently rotate dust particles
      dustPoints.rotation.y += 0.0008;

      let instanceIdx = 0;

      // Update Streams and Glyphs
      for (let s = 0; s < NUM_STREAMS; s++) {
        const stream = streams[s];

        // Move head downward
        stream.headY -= stream.speed * 60 * delta;
        if (stream.headY < -400) {
          stream.headY = 400 + Math.random() * 200;
        }

        const glyphSpacing = 14;

        for (let g = 0; g < stream.length; g++) {
          const yPos = stream.headY + g * glyphSpacing;

          // Occasionally morph characters for digital flicker
          stream.flickerTimers[g] -= delta;
          if (stream.flickerTimers[g] <= 0) {
            stream.glyphIndices[g] = Math.floor(Math.random() * 64);
            stream.flickerTimers[g] = 0.2 + Math.random() * 3.5;
          }

          // Compute UV offset for this glyph in the 8x8 atlas
          const charIdx = stream.glyphIndices[g];
          const col = charIdx % 8;
          const row = 7 - Math.floor(charIdx / 8); // flipped for texture coord
          uvOffsets[instanceIdx * 2] = col / 8;
          uvOffsets[instanceIdx * 2 + 1] = row / 8;

          // Compute Position
          dummy.position.set(stream.x, yPos, stream.z);

          // Subtle billboard angle towards center
          dummy.rotation.set(0, 0, 0);
          dummy.scale.set(1, 1, 1);
          dummy.updateMatrix();
          instancedMesh.setMatrixAt(instanceIdx, dummy.matrix);

          // Head of the stream glows brightest, trailing glyphs fade out
          const isHead = g === 0;
          const trailFactor = 1 - g / stream.length;

          if (isHead) {
            color.copy(palette.headColor);
          } else if (trailFactor > 0.6) {
            color.copy(palette.brightColor).multiplyScalar(trailFactor);
          } else {
            color.copy(palette.dimColor).multiplyScalar(Math.max(trailFactor, 0.15));
          }

          instancedMesh.setColorAt(instanceIdx, color);
          instanceIdx++;
        }
      }

      uvOffsetAttribute.needsUpdate = true;
      instancedMesh.instanceMatrix.needsUpdate = true;
      if (instancedMesh.instanceColor) {
        instancedMesh.instanceColor.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 5. CLEANUP & MEMORY MANAGEMENT ON UNMOUNT
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js objects
      planeGeometry.dispose();
      instancedMaterial.dispose();
      glyphTexture.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [colorTheme, isZoomingThrough]);

  return (
    <div 
      className={`fixed inset-0 z-50 overflow-hidden select-none transition-all duration-700 ${
        isZoomingThrough 
          ? 'scale-110 opacity-0 pointer-events-none filter blur-sm' 
          : 'scale-100 opacity-100'
      } ${
        colorTheme === 'matrix-green' ? 'bg-[#0d0f12] text-[#e0e7ff]' : 'bg-[#080b14] text-[#e0e7ff]'
      }`}
    >
      {/* 3D WebGL Canvas Layer */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 w-full h-full cursor-crosshair"
      />

      {/* Futuristic CRT Scanlines Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.35)_51%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

      {/* Cybernetic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,7,10,0.85)_100%)] pointer-events-none" />

      {/* TOP SCI-FI STATUS BAR */}
      <header className="relative z-20 border-b border-white/10 bg-black/60 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span 
              className={`w-2.5 h-2.5 rounded-full animate-ping ${
                colorTheme === 'matrix-green' ? 'bg-[#00ff66]' : 'bg-[#00f3ff]'
              }`} 
            />
            <Terminal 
              className={`w-4 h-4 ${
                colorTheme === 'matrix-green' ? 'text-[#00ff66]' : 'text-[#00f3ff]'
              }`} 
            />
          </div>

          <div className="font-mono text-xs sm:text-sm font-bold tracking-widest text-white uppercase flex items-center gap-2">
            <span>SYS // PROTOCOL</span>
            <span className="text-white/30">•</span>
            <span className={colorTheme === 'matrix-green' ? 'text-[#00ff66]' : 'text-[#00f3ff]'}>
              NEURAL MATRIX STREAM
            </span>
          </div>
        </div>

        {/* Action Controls & Skip Option */}
        <div className="flex items-center gap-2 sm:gap-4 font-mono text-xs">
          {/* Color Scheme Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded bg-white/5 border border-white/10">
            <button
              type="button"
              onClick={() => {
                setColorTheme('matrix-green');
                playCyberSound('beep');
              }}
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                colorTheme === 'matrix-green'
                  ? 'bg-[#00ff66]/20 text-[#00ff66] border border-[#00ff66]/50'
                  : 'text-white/50 hover:text-white'
              }`}
              title="Matrix Green"
            >
              Matrix
            </button>
            <button
              type="button"
              onClick={() => {
                setColorTheme('cyber-cyan');
                playCyberSound('beep');
              }}
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                colorTheme === 'cyber-cyan'
                  ? 'bg-[#00f3ff]/20 text-[#00f3ff] border border-[#00f3ff]/50'
                  : 'text-white/50 hover:text-white'
              }`}
              title="Cyber Cyan"
            >
              Cyber
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="p-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            title={audioEnabled ? "Disable audio synthesis" : "Enable audio synthesis"}
          >
            {audioEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#00ff66]" /> : <VolumeX className="w-3.5 h-3.5 text-white/40" />}
          </button>

          {/* Direct Skip Button */}
          <button
            type="button"
            id="skip-intro-btn"
            onClick={handleImmediateSkip}
            className="px-3 py-1.5 rounded-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-[11px] tracking-wider uppercase flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <FastForward className="w-3 h-3 text-[#00ff66]" />
            <span>Skip Intro</span>
          </button>
        </div>
      </header>

      {/* CENTERPIECE CALL-TO-ACTION TERMINAL HUD */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
        
        {/* Terminal Reticle Card */}
        <div className="relative max-w-lg w-full p-6 sm:p-8 rounded-sm bg-black/75 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-center">
          
          {/* Sci-Fi Decorative Corner Brackets */}
          <span className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${colorTheme === 'matrix-green' ? 'border-[#00ff66]' : 'border-[#00f3ff]'}`} />
          <span className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${colorTheme === 'matrix-green' ? 'border-[#00ff66]' : 'border-[#00f3ff]'}`} />
          <span className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${colorTheme === 'matrix-green' ? 'border-[#00ff66]' : 'border-[#00f3ff]'}`} />
          <span className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${colorTheme === 'matrix-green' ? 'border-[#00ff66]' : 'border-[#00f3ff]'}`} />

          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] sm:text-[11px] text-white/80 uppercase tracking-widest mb-4">
            <ShieldCheck className={`w-3.5 h-3.5 ${colorTheme === 'matrix-green' ? 'text-[#00ff66]' : 'text-[#00f3ff]'}`} />
            <span>Secure WebGL Mainframe Initialized</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl font-extrabold font-mono tracking-tight text-white mb-2">
            GARV SHAW <span className={colorTheme === 'matrix-green' ? 'text-[#00ff66]' : 'text-[#00f3ff]'}>// DIGITAL SPACE</span>
          </h1>

          <p className="text-xs sm:text-sm text-white/70 font-mono mb-6 max-w-sm mx-auto leading-relaxed">
            Move your cursor to navigate 3D depth parallax. Access system terminal to explore full portfolio and projects.
          </p>

          {/* MAIN ACCESS BUTTON */}
          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              id="enter-portfolio-hero-btn"
              onClick={triggerEnterTransition}
              disabled={isZoomingThrough}
              className={`group relative w-full sm:w-auto px-8 sm:px-10 py-4 rounded-sm font-mono text-sm sm:text-base font-bold uppercase tracking-widest text-black cursor-pointer transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-3 ${
                colorTheme === 'matrix-green'
                  ? 'bg-[#00ff66] hover:bg-[#22ff7c] shadow-[0_0_30px_rgba(0,255,102,0.45)]'
                  : 'bg-[#00f3ff] hover:bg-[#38f7ff] shadow-[0_0_30px_rgba(0,243,255,0.45)]'
              }`}
            >
              <Zap className="w-5 h-5 fill-current" />
              <span>{isZoomingThrough ? 'INITIALIZING WARP...' : 'ENTER PORTFOLIO'}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>

            {/* Keyboard shortcut hint */}
            <div className="text-[11px] font-mono text-white/40 tracking-wide mt-1">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-bold font-mono text-[10px]">ENTER</kbd> to enter or <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-bold font-mono text-[10px]">ESC</kbd> to skip
            </div>
          </div>

          {/* Auto-bypass countdown ticker */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-pulse" />
              <span>Auto-bypassing in: <strong className="text-white">{secondsRemaining}s</strong></span>
            </div>

            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="text-white/60 hover:text-white underline cursor-pointer"
            >
              {isPaused ? 'Resume timer' : 'Pause timer'}
            </button>
          </div>

        </div>

      </div>

      {/* BOTTOM FOOTER TELEMETRY */}
      <footer className="relative z-20 border-t border-white/10 bg-black/60 backdrop-blur-md px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between text-[11px] font-mono text-white/50">
        <div className="flex items-center gap-4">
          <span>WEBGL 3D MATRIX ENGINE</span>
          <span className="text-white/20">•</span>
          <span>DEPTH: 2000 Z-UNITS</span>
        </div>

        <div className="flex items-center gap-2">
          <Eye className="w-3 h-3 text-emerald-400" />
          <span>60 FPS GPU-ACCELERATED INSTANCED MESH</span>
        </div>
      </footer>
    </div>
  );
}
