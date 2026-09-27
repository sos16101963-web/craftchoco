"use client";

import { Suspense, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { journey, clamp, smoothstep } from "@/lib/journey";

/**
 * Шоколадный тоннель: осколки шоколада, золотая какао-пыль,
 * карамельные световые линии, три витрины с настоящими наборами
 * и «Врата вкуса» на выходе в каталог.
 */

const STATIONS: { pos: [number, number, number]; side: "left" | "right"; productId: string; image: string }[] = [
  { pos: [-2.6, 1.5, -12], side: "left", productId: "set-sixteen", image: "/images/set-sixteen.webp" },
  { pos: [2.6, 1.55, -26], side: "right", productId: "roses-marble", image: "/images/roses-marble.webp" },
  { pos: [-2.6, 1.5, -40], side: "left", productId: "art-bars", image: "/images/art-bars.webp" },
];

/** Метаданные витрин (id совпадают с STATIONS по индексу) */
export const STATION_META = [
  { productId: "set-sixteen", hint: "хит мастерской" },
  { productId: "roses-marble", hint: "хит мастерской" },
  { productId: "art-bars", hint: "новинка" },
];

/* ---------------------------------- осколки ---------------------------------- */

function ChocolateChunks({ count = 160 }: { count?: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const dummy = new THREE.Object3D();
    let i = 0;
    let guard = 0;
    while (i < count && guard < count * 40) {
      guard++;
      const z = 8 - Math.random() * 68;
      const angle = Math.random() * Math.PI * 2;
      const radius = 4.6 + Math.random() * 5.5;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.62 + 1.2;
      // не ставим осколки в центре коридора камеры
      if (Math.abs(x) < 2.2 && y < 3.4 && y > -0.5) continue;
      // и на линии взгляда у витрин (камера подходит вплотную к станции)
      if (
        y < 3.8 &&
        y > -0.8 &&
        STATIONS.some(
          (st) => (x - st.pos[0]) ** 2 + (z - st.pos[2]) ** 2 < 2.6 * 2.6,
        )
      )
        continue;
      dummy.position.set(x, y, z);
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );
      const s = 0.35 + Math.random() * 1.5;
      dummy.scale.set(s * 0.7, s, s * 0.7);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
      i++;
    }
    ref.current.count = i;
    ref.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  const highQuality = journey.quality === "high";

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]} frustumCulled={false}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={highQuality ? "#5a3214" : "#6b3d1c"}
        roughness={0.34}
        metalness={0.12}
        flatShading
        emissive="#2a1408"
        emissiveIntensity={0.35}
        envMapIntensity={1.1}
      />
    </instancedMesh>
  );
}

/* ------------------------------ золотая какао-пыль ------------------------------ */

function CocoaDust({ count = 1100 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const velocities = useRef<Float32Array>(new Float32Array(count));

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26;
      arr[i * 3 + 1] = Math.random() * 14 - 3;
      arr[i * 3 + 2] = 12 - Math.random() * 76;
      velocities.current[i] = 0.35 + Math.random() * 0.9;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const geo = ref.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = geo.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= velocities.current[i] * delta;
      arr[i * 3] += Math.sin(t * 0.7 + i) * 0.0028;
      if (arr[i * 3 + 1] < -3.5) arr[i * 3 + 1] = 11;
    }
    geo.needsUpdate = true;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#e8c893"
        size={0.05}
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/* ------------------------------ карамельные линии ------------------------------ */

function CaramelLines() {
  const tubes = useMemo(() => {
    const list: { pos: [number, number, number]; rot: number }[] = [];
    for (let i = 0; i < 16; i++) {
      const z = 4 - i * 4.4;
      const side = i % 2 === 0 ? -1 : 1;
      list.push({ pos: [side * 5.2, 2.4 + (i % 3) * 0.9, z], rot: 0.5 * side });
    }
    return list;
  }, []);

  return (
    <group>
      {tubes.map((t, i) => (
        <mesh key={i} position={t.pos} rotation={[0, 0, t.rot * 0.28]}>
          <boxGeometry args={[0.06, 0.06, 5.5]} />
          <meshStandardMaterial
            color={i % 4 === 0 ? "#fff1dd" : "#ffd9a0"}
            emissive={i % 4 === 0 ? "#ffe9cf" : "#ffb45e"}
            emissiveIntensity={2.4}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------ станция-витрина ------------------------------ */

function PhotoPlane({ image }: { image: string }) {
  const texture = useTexture(image);
  return (
    <group>
      {/* золотая рамка */}
      <mesh position={[0, 0, -0.012]}>
        <planeGeometry args={[3.44, 2.06]} />
        <meshBasicMaterial color="#d9a85c" toneMapped={false} />
      </mesh>
      <mesh>
        <planeGeometry args={[3.34, 1.96]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}

function ProductStation({
  index,
  position,
  side,
}: {
  index: number;
  position: [number, number, number];
  side: "left" | "right";
}) {
  const station = STATIONS[index];
  const [hovered, setHovered] = useState(false);
  const group = useRef<THREE.Group>(null);
  const photoGroup = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.position.y =
        position[1] + Math.sin(t * 0.7 + index * 2.1) * 0.12;
      const target = hovered ? 1.06 : 1;
      const s = THREE.MathUtils.lerp(group.current.scale.x, target, 0.12);
      group.current.scale.setScalar(s);
    }
    if (lightRef.current) {
      lightRef.current.intensity = hovered ? 16 : 8;
    }
    if (photoGroup.current) {
      photoGroup.current.rotation.y = Math.sin(t * 0.4 + index) * 0.08;
    }

  });

  const highQuality = journey.quality === "high";

  return (
    <group position={position}>
      <group
        ref={group}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        {/* шоколадный монолит */}
        <RoundedBox args={[2.8, 3.5, 1.2]} radius={0.14} smoothness={4}>
          <meshPhysicalMaterial
            color={highQuality ? "#3a1d0d" : "#4a2410"}
            roughness={0.18}
            metalness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.25}
            envMapIntensity={1.4}
          />
          <Edges scale={1.001} threshold={20} color="#d9a85c">
            <lineBasicMaterial
              color="#e8c893"
              transparent
              opacity={hovered ? 0.95 : 0.45}
            />
          </Edges>
        </RoundedBox>

        {/* фото настоящего набора поверх монолита */}
        <group ref={photoGroup} position={[0, 0.32, 0.78]}>
          <Suspense fallback={null}>
            <PhotoPlane image={station.image} />
          </Suspense>
        </group>
      </group>

      {/* свет станции */}
      <pointLight
        ref={lightRef}
        position={side === "left" ? [1.4, 1.2, 1.6] : [-1.4, 1.2, 1.6]}
        color="#ffdba8"
        intensity={8}
        distance={11}
        decay={2}
      />

      {/* орбита пралине вокруг витрины */}
      <PralineRing position={position} />
    </group>
  );
}

function PralineRing({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = 12;

  useLayoutEffect(() => {
    if (!ref.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + 0.3;
      const r = 1.9 + Math.random() * 0.9;
      dummy.position.set(
        position[0] + Math.cos(a) * r,
        -1.3 + Math.random() * 0.5,
        position[2] + Math.sin(a) * r * 0.7,
      );
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );
      const s = 0.12 + Math.random() * 0.24;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, [position]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]} frustumCulled={false}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#8a5426"
        roughness={0.28}
        metalness={0.15}
        emissive="#3a1d0d"
        emissiveIntensity={0.4}
      />
    </instancedMesh>
  );
}

/* -------------------------------- Врата вкуса -------------------------------- */

function TasteGate() {
  const ring = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);

  const glowTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(128, 128, 8, 128, 128, 128);
    grad.addColorStop(0, "rgba(255, 233, 207, 0.95)");
    grad.addColorStop(0.4, "rgba(255, 180, 94, 0.35)");
    grad.addColorStop(1, "rgba(255, 180, 94, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring.current) ring.current.rotation.z = t * 0.22;
    if (group.current) {
      const p = clamp(journey.progress, 0.78, 1);
      const k = smoothstep((p - 0.78) / 0.22);
      group.current.scale.setScalar(1 + k * 0.35);
      if (glow.current) {
        (glow.current.material as THREE.MeshBasicMaterial).opacity =
          0.3 + k * 0.32 + Math.sin(t * 2.4) * 0.05;
      }
    }
  });

  return (
    <group ref={group} position={[0, 1.7, -55]}>
      <mesh ref={ring}>
        <torusGeometry args={[2.7, 0.14, 16, 72]} />
        <meshStandardMaterial
          color="#ffdba8"
          emissive="#ffb45e"
          emissiveIntensity={2.4}
        />
      </mesh>
      <mesh rotation={[0, 0, 0.3]}>
        <torusGeometry args={[3.3, 0.05, 12, 72]} />
        <meshStandardMaterial
          color="#fff1dd"
          emissive="#ffe9cf"
          emissiveIntensity={1.8}
        />
      </mesh>
      {glowTexture && (
        <mesh ref={glow} position={[0, 0, -0.6]}>
          <planeGeometry args={[11, 11]} />
          <meshBasicMaterial
            map={glowTexture}
            transparent
            opacity={0.4}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
      <pointLight color="#ffdba8" intensity={26} distance={22} decay={2} />
    </group>
  );
}

/* ----------------------------------- пол ----------------------------------- */

function Floor() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.55, -24]}>
        <planeGeometry args={[80, 110]} />
        <meshStandardMaterial color="#0f0703" roughness={0.42} metalness={0.5} />
      </mesh>
      <gridHelper
        args={[90, 90, "#3a2412", "#241307"]}
        position={[0, -1.54, -24]}
      />
    </>
  );
}

/* ---------------------------------- тоннель ---------------------------------- */

export default function ChocolateTunnel() {
  return (
    <group>
      <ChocolateChunks />
      <CaramelLines />
      <CocoaDust />
      <Floor />
      {STATIONS.map((s, i) => (
        <ProductStation key={s.productId} index={i} position={s.pos} side={s.side} />
      ))}
      <TasteGate />
      <ambientLight intensity={0.24} color="#ffd9a0" />
    </group>
  );
}
