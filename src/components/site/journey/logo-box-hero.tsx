"use client";

import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { journey, clamp } from "@/lib/journey";

/**
 * Вступительная сцена по фирменному ролику мастерской:
 * чёрная коробка с золотым гравированным логотипом CRAFT.CHOCO.KHARKIV.
 * Какао-пыль собирается в логотип, тот проявляется, затем крышка
 * коробки открывается — внутри тёплое золотое свечение и расписные
 * конфеты (мраморная глазурь, как в видео).
 *
 * Хронология (после «Войти»):
 *  0.3–2.4с — частицы слетаются в логотип
 *  1.4–2.5с — логотип проявляется на крышке
 *  2.7–3.7с — частицы гаснут
 *  4.0–5.3с — крышка открывается, конфеты всплывают
 *  скролл > 0.075 — коробка улетает вверх, камера уходит в тоннель
 */

const LID_PIVOT: [number, number, number] = [0, 0.42, -1.18];

/* ------------------------- мраморная глазурь (canvas) ------------------------- */

/** Яркая мраморная глазурь — как на студийном фото наборов:
 *  смелые разводы синего/красного/жёлтого по кремовому базу. */
export function makeMarbleTexture(seed = 1): THREE.CanvasTexture {
  const rng = mulberry32(seed * 7919 + 13);
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#efe4d2";
  ctx.fillRect(0, 0, 256, 256);

  // насыщенные цветовые пятна — синий/красный/жёлтый/чёрный как на фото
  const palette = ["#2f66ad", "#c5392b", "#e8b33a", "#241712", "#8f1f1f", "#f6efe2"];
  for (let i = 0; i < 11; i++) {
    const x0 = rng() * 256;
    const y0 = rng() * 256;
    ctx.strokeStyle = palette[Math.floor(rng() * palette.length)];
    ctx.globalAlpha = 0.88;
    ctx.lineWidth = 22 + rng() * 34;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    const x1 = x0 + (rng() - 0.5) * 230;
    const y1 = y0 + (rng() - 0.5) * 230;
    ctx.quadraticCurveTo(
      x0 + (rng() - 0.5) * 210,
      y0 + (rng() - 0.5) * 210,
      x1,
      y1,
    );
    ctx.stroke();
  }
  // тонкие тёмные прожилки поверх
  ctx.globalAlpha = 0.55;
  for (let i = 0; i < 7; i++) {
    ctx.strokeStyle = "#1c110c";
    ctx.lineWidth = 2 + rng() * 3;
    ctx.beginPath();
    const sx = rng() * 256;
    const sy = rng() * 256;
    ctx.moveTo(sx, sy);
    ctx.quadraticCurveTo(sx + (rng() - 0.5) * 180, sy + (rng() - 0.5) * 180, sx + (rng() - 0.5) * 240, sy + (rng() - 0.5) * 240);
    ctx.stroke();
  }
  // кремовые блики
  ctx.globalAlpha = 0.85;
  for (let i = 0; i < 26; i++) {
    ctx.fillStyle = "#f6efe2";
    ctx.beginPath();
    ctx.arc(rng() * 256, rng() * 256, 2 + rng() * 7, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------ конфета-сфера ------------------------------ */

function CandySphere({
  position,
  radius,
  texture,
  seed,
  meshRef,
}: {
  position: [number, number, number];
  radius: number;
  texture: THREE.Texture;
  seed: number;
  meshRef?: React.Ref<THREE.Mesh>;
}) {
  return (
    <mesh ref={meshRef} position={position} rotation={[seed, seed * 1.7, 0]}>
      <sphereGeometry args={[radius, 26, 26]} />
      <meshPhysicalMaterial
        map={texture}
        roughness={0.14}
        metalness={0.06}
        clearcoat={1}
        clearcoatRoughness={0.16}
        envMapIntensity={2.4}
      />
    </mesh>
  );
}

/* ------------------------- частицы → логотип ------------------------- */

interface ParticleCloud {
  positions: Float32Array;
  colors: Float32Array;
  starts: Float32Array;
  targets: Float32Array;
  delays: Float32Array;
  phases: Float32Array;
}

function useLogoParticles(texture: THREE.Texture, count: number): ParticleCloud {
  return useMemo(() => {
    // сэмплируем яркие (медные) пиксели логотипа
    const G = 176;
    const positions: { x: number; y: number; r: number; g: number; b: number }[] = [];
    try {
      const img = texture.image as HTMLImageElement | undefined;
      if (img && img.width) {
        const canvas = document.createElement("canvas");
        canvas.width = G;
        canvas.height = G;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, G, G);
        const data = ctx.getImageData(0, 0, G, G).data;
        for (let py = 0; py < G; py++) {
          for (let px = 0; px < G; px++) {
            const i = (py * G + px) * 4;
            const r = data[i] / 255;
            const g = data[i + 1] / 255;
            const b = data[i + 2] / 255;
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            if (lum > 0.34) {
              positions.push({ x: px / G, y: py / G, r, g, b });
            }
          }
        }
      }
    } catch {
      /* canvas недоступен — фолбэк ниже */
    }
    if (positions.length === 0) {
      // фолбэк: кольцо
      for (let i = 0; i < 512; i++) {
        const a = (i / 512) * Math.PI * 2;
        positions.push({
          x: 0.5 + Math.cos(a) * 0.32,
          y: 0.5 + Math.sin(a) * 0.32,
          r: 0.85,
          g: 0.62,
          b: 0.35,
        });
      }
    }

    const starts = new Float32Array(count * 3);
    const targets = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const delays = new Float32Array(count);
    const phases = new Float32Array(count * 3);
    const gold = new THREE.Color("#e8c893");
    const c = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const s = positions[Math.floor(Math.random() * positions.length)];
      const jx = (Math.random() - 0.5) * 0.022;
      const jz = (Math.random() - 0.5) * 0.022;
      // логотип на крышке: плоскость 2.1×2.1, центр по z = 1.25
      targets[i * 3] = (s.x - 0.5) * 2.1 + jx;
      targets[i * 3 + 1] = 0.7 + Math.random() * 0.03;
      targets[i * 3 + 2] = 1.25 - (s.y - 0.5) * 2.1 + jz;

      starts[i * 3] = (Math.random() - 0.5) * 13;
      starts[i * 3 + 1] = 0.6 + (Math.random() - 0.5) * 9;
      starts[i * 3 + 2] = 1.25 - 4 - Math.random() * 8;

      delays[i] = Math.random() * 1.0;
      phases[i * 3] = Math.random() * Math.PI * 2;
      phases[i * 3 + 1] = Math.random() * Math.PI * 2;
      phases[i * 3 + 2] = Math.random() * Math.PI * 2;

      c.setRGB(
        Math.min(1, s.r * 1.4 + 0.1),
        Math.min(1, s.g * 1.4 + 0.08),
        Math.min(1, s.b * 1.4 + 0.06),
      );
      c.lerp(gold, 0.22);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions: new Float32Array(count * 3), colors, starts, targets, delays, phases };
  }, [texture, count]);
}

/* ------------------------------ сцена героя ------------------------------ */

function LogoBoxScene({ count }: { count: number }) {
  const logoTex = useTexture("/images/box-lid.webp");
  const marbleVariants = useMemo(
    () => [makeMarbleTexture(1), makeMarbleTexture(2), makeMarbleTexture(3)],
    [],
  );

  const rootRef = useRef<THREE.Group>(null);
  const swayRef = useRef<THREE.Group>(null);
  const lidPivotRef = useRef<THREE.Group>(null);
  const logoRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const frontLightRef = useRef<THREE.PointLight>(null);
  const innerLightRef = useRef<THREE.PointLight>(null);
  const backGlowRef = useRef<THREE.Mesh>(null);
  const candyRefs = useRef<(THREE.Mesh | null)[]>([]);

  const particles = useLogoParticles(logoTex, count);
  const pointsRef = useRef<THREE.Points>(null);

  // полный набор как на студийном фото: 2 ряда × 5 конфет,
  // лёгкий джиттер для естественности
  const CANDIES: [number, number, number][] = useMemo(() => {
    const rows: [number, number, number][] = [];
    const xs = [-1.12, -0.56, 0, 0.56, 1.12];
    const zs = [-0.52, 0.58];
    let s = 7;
    const rnd = () => {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
    for (const z of zs) {
      for (const x of xs) {
        rows.push([x + (rnd() - 0.5) * 0.07, 0.4 + (rnd() - 0.5) * 0.02, z + (rnd() - 0.5) * 0.07]);
      }
    }
    return rows;
  }, []);

  const backGlowTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
    grad.addColorStop(0, "rgba(255, 205, 140, 0.55)");
    grad.addColorStop(0.45, "rgba(255, 170, 90, 0.22)");
    grad.addColorStop(1, "rgba(255, 170, 90, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame(({ clock, size }) => {
    const t = clock.elapsedTime;
    const at = journey.started ? (performance.now() - journey.startTime) / 1000 : 0;

    // фазы сборки
    const conv = clamp((at - 0.35) / 2.1, 0, 1);
    const logoIn = clamp((at - 1.4) / 1.1, 0, 1);
    const pFade = 1 - clamp((at - 2.7) / 1.0, 0, 1);
    const lidK = clamp((at - 4.0) / 1.3, 0, 1);
    const lidE = lidK * lidK * (3 - 2 * lidK);

    // уход героя при скролле
    const heroGone = journey.progress > 0.075;
    const fade = clamp(1 - journey.progress / 0.075, 0, 1);

    // адаптивный масштаб (ширина вью на плоскости z=0 ≈ 8.06·aspect)
    const aspect = size.width / Math.max(1, size.height);
    const visW = 8.06 * aspect;
    const k = Math.min(1.42, (visW * 0.8) / 3.2) * (0.9 + 0.1 * conv) * (0.55 + 0.45 * fade);

    if (rootRef.current) {
      rootRef.current.visible = !heroGone;
      rootRef.current.position.y = (1 - fade) * 8.5;
      rootRef.current.position.z = -(1 - fade) * 3;
    }
    if (swayRef.current) {
      swayRef.current.scale.setScalar(k);
      swayRef.current.rotation.y = Math.sin(t * 0.28) * 0.14;
      swayRef.current.position.y = Math.sin(t * 0.55) * 0.05;
    }
    if (lidPivotRef.current) {
      lidPivotRef.current.rotation.x = -1.92 * lidE;
    }
    if (logoRef.current) {
      const m = logoRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = logoIn;
    }
    if (glowRef.current) {
      const m = glowRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = lidE * 0.3;
    }
    if (backGlowRef.current) {
      const m = backGlowRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.35 + logoIn * 0.5;
    }
    if (frontLightRef.current) {
      frontLightRef.current.intensity = 3 + logoIn * 6;
    }
    if (innerLightRef.current) {
      innerLightRef.current.intensity = lidE * 9;
    }

    // конфеты: покачивание + мягкое всплытие после открытия
    candyRefs.current.forEach((candy, i) => {
      if (!candy) return;
      candy.position.y = CANDIES[i][1] + lidE * (0.12 + (i % 5) * 0.022) + Math.sin(t * 0.9 + i * 1.9) * 0.014;
      candy.rotation.y = t * (0.25 + (i % 5) * 0.05) + i;
    });

    // частицы
    const pts = pointsRef.current;
    if (pts) {
      const posAttr = pts.geometry.getAttribute("position") as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      const { starts, targets, delays, phases } = particles;
      for (let i = 0; i < count; i++) {
        const d = clamp((at - 0.35 - delays[i]) / 1.7, 0, 1);
        const e = 1 - Math.pow(1 - d, 3);
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;
        const wob = (1 - e) * 0.85;
        arr[ix] = starts[ix] + (targets[ix] - starts[ix]) * e + Math.sin(t * 1.3 + phases[ix]) * wob;
        arr[iy] = starts[iy] + (targets[iy] - starts[iy]) * e + Math.cos(t * 1.1 + phases[iy]) * wob;
        arr[iz] = starts[iz] + (targets[iz] - starts[iz]) * e + Math.sin(t * 1.0 + phases[iz]) * wob;
      }
      posAttr.needsUpdate = true;
      const m = pts.material as THREE.PointsMaterial;
      m.opacity = 0.95 * pFade;
      pts.visible = pFade > 0.02 && !heroGone;
    }
  });

  return (
    <group ref={rootRef}>
      {/* медное свечение позади коробки */}
      {backGlowTexture && (
        <mesh ref={backGlowRef} position={[0, 1.7, -2.6]}>
          <planeGeometry args={[9, 9]} />
          <meshBasicMaterial
            map={backGlowTexture}
            transparent
            opacity={0.4}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
      )}
      <pointLight ref={frontLightRef} position={[0, 2.6, 4]} color="#ffcf9a" intensity={3} distance={16} decay={2} />

      <group ref={swayRef} position={[0, 1.12, 0]} rotation={[1.05, 0, 0]}>
        {/* основание коробки */}
        <RoundedBox args={[3.24, 0.4, 2.44]} radius={0.05} smoothness={4} position={[0, 0.2, 0]}>
          <meshPhysicalMaterial
            color="#161110"
            roughness={0.38}
            metalness={0.3}
            clearcoat={0.7}
            clearcoatRoughness={0.3}
            envMapIntensity={1.2}
          />
          <Edges scale={1.001} threshold={15} color="#8a6a3c" />
        </RoundedBox>

        {/* золотое свечение внутри */}
        <mesh ref={glowRef} position={[0, 0.415, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.9, 2.1]} />
          <meshBasicMaterial
            color="#ff9e50"
            transparent
            opacity={0}
            toneMapped={false}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <pointLight ref={innerLightRef} position={[0, 0.85, 0.3]} color="#ffd0a0" intensity={0} distance={9} decay={2} />

        {/* расписные конфеты в коробке — цвета как на студийном фото */}
        {CANDIES.map((pos, i) => (
          <CandySphere
            key={i}
            position={pos}
            radius={0.24}
            texture={marbleVariants[i % marbleVariants.length]}
            seed={i * 1.13}
            meshRef={(el) => {
              candyRefs.current[i] = el;
            }}
          />
        ))}

        {/* крышка с логотипом */}
        <group ref={lidPivotRef} position={LID_PIVOT}>
          <RoundedBox args={[3.3, 0.26, 2.5]} radius={0.05} smoothness={4} position={[0, 0.13, 1.25]}>
            <meshPhysicalMaterial
              color="#171211"
              roughness={0.34}
              metalness={0.32}
              clearcoat={0.8}
              clearcoatRoughness={0.26}
              envMapIntensity={1.3}
            />
            <Edges scale={1.001} threshold={15} color="#d9a85c" />
          </RoundedBox>
          {/* гравировка логотипа */}
          <mesh ref={logoRef} position={[0, 0.268, 1.25]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[2.1, 2.1]} />
            <meshBasicMaterial map={logoTex} transparent opacity={0} toneMapped={false} />
          </mesh>
        </group>

        {/* какао-пыль, собирающаяся в логотип */}
        <points ref={pointsRef} frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[particles.positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[particles.colors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.03}
            vertexColors
            transparent
            opacity={0.95}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
          />
        </points>
      </group>
    </group>
  );
}

export default function LogoBoxHero({ count = 9000 }: { count?: number }) {
  return (
    <Suspense fallback={null}>
      <LogoBoxScene count={count} />
    </Suspense>
  );
}
