"use client";

import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges, RoundedBox, useVideoTexture } from "@react-three/drei";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { makeMarbleTexture } from "./logo-box-hero";

/**
 * Декорации тоннеля по мотивам фирменного ролика мастерской:
 *  1) «Кино-экран» за Вратами вкуса — в финале маршрута играет
 *     сам бренд-ролик (коробка с логотипом → конфеты → шоколад → роза).
 *  2) Белая шоколадная роза с золотой пылью (кадр из видео).
 *  3) Расписные конфеты с мраморной глазурью, парящие вдоль коридора.
 */

/* ------------------------------ кино-экран ------------------------------ */

function Screen() {
  const video = useVideoTexture("/media/brand-intro.mp4", {
    muted: true,
    loop: true,
    autoplay: true,
  });

  return (
    <group position={[0, 1.8, -57.6]} rotation={[0, 0, 0]}>
      <RoundedBox args={[5.6, 3.42, 0.16]} radius={0.06} smoothness={3}>
        <meshStandardMaterial color="#2a1808" roughness={0.32} metalness={0.5} envMapIntensity={1.2} />
      </RoundedBox>
      <Edges scale={1.001} threshold={15} color="#d9a85c" />
      <mesh position={[0, 0, 0.088]}>
        <planeGeometry args={[5.22, 2.99]} />
        <meshBasicMaterial color="#d9a85c" toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0.095]}>
        <planeGeometry args={[5.1, 2.87]} />
        <meshBasicMaterial map={video} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 0, 1.8]} color="#ffdba8" intensity={6} distance={10} decay={2} />
    </group>
  );
}

function CinemaScreen() {
  return (
    <Suspense fallback={null}>
      <Screen />
    </Suspense>
  );
}

/* -------------------- белая шоколадная роза с золотом -------------------- */

const UP = new THREE.Vector3(0, 1, 0);
const tmpObj = new THREE.Object3D();

function colored(g: THREE.BufferGeometry, color: THREE.ColorRepresentation): THREE.BufferGeometry {
  const count = (g.getAttribute("position") as THREE.BufferAttribute).count;
  const c = new THREE.Color(color);
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = c.r;
    arr[i * 3 + 1] = c.g;
    arr[i * 3 + 2] = c.b;
  }
  g.setAttribute("color", new THREE.BufferAttribute(arr, 3));
  return g;
}

function place(
  g: THREE.BufferGeometry,
  color: THREE.ColorRepresentation,
  pos: [number, number, number],
  rot: [number, number, number] = [0, 0, 0],
  scale: [number, number, number] = [1, 1, 1],
): THREE.BufferGeometry {
  tmpObj.position.set(pos[0], pos[1], pos[2]);
  tmpObj.rotation.set(rot[0], rot[1], rot[2]);
  tmpObj.scale.set(scale[0], scale[1], scale[2]);
  tmpObj.updateMatrix();
  g.applyMatrix4(tmpObj.matrix);
  return colored(g, color);
}

function buildWhiteRoseGeometry(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  const cx = 0;
  const cy = 0;
  const cz = 0;
  const s = 1;
  const d = new THREE.Object3D();
  d.rotation.order = "YXZ";

  // сердцевина — белый шоколад
  parts.push(place(new THREE.SphereGeometry(0.1 * s, 12, 10), "#fff7ea", [cx, cy, cz], [0, 0, 0], [1, 0.85, 1]));

  // три кольца лепестков, часть — с золотым напылением
  const rings = [
    { n: 5, r: 0.075, pr: 0.14, tilt: 1.0, mul: 1.0 },
    { n: 8, r: 0.16, pr: 0.17, tilt: 0.58, mul: 0.94 },
    { n: 11, r: 0.26, pr: 0.19, tilt: 0.3, mul: 0.88 },
  ];
  rings.forEach((ring, ri) => {
    for (let i = 0; i < ring.n; i++) {
      const j = Math.sin((i + 1) * 12.9898 + ri * 78.233) * 0.14;
      const a = (i / ring.n) * Math.PI * 2 + ri * 0.55 + j;
      const lift = ring.r * Math.sin(ring.tilt) * 0.5 * s + j * 0.3;
      const gold = Math.sin(i * 3.7 + ri) > 0.55;
      const col = gold ? "#eed3a0" : ri === 0 ? "#fff7ea" : ri === 1 ? "#f7ecd8" : "#efdfc2";
      d.position.set(cx + Math.cos(a) * ring.r * s, cy + lift, cz + Math.sin(a) * ring.r * s);
      d.rotation.set(ring.tilt, Math.PI / 2 - a, 0);
      d.scale.set(1, 0.4, 0.8);
      d.updateMatrix();
      const g = new THREE.SphereGeometry(ring.pr * s, 9, 7);
      g.applyMatrix4(d.matrix);
      parts.push(colored(g, col));
    }
  });

  // короткая ножка-подставка
  parts.push(place(new THREE.CylinderGeometry(0.05, 0.07, 0.5, 10), "#e2cfa8", [0, -0.42, 0]));

  const merged = mergeGeometries(parts, false);
  if (!merged) throw new Error("white rose merge failed");
  parts.forEach((p) => p.dispose());
  return merged;
}

function WhiteRose() {
  const geometry = useMemo(() => buildWhiteRoseGeometry(), []);

  const sparkles = useMemo(() => {
    const n = 240;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 0.5 + Math.random() * 0.85;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = (Math.random() - 0.35) * 1.4;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    return arr;
  }, []);
  const sparkleRef = useRef<THREE.Points>(null);

  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.24;
      group.current.position.y = 2.45 + Math.sin(t * 0.6) * 0.07;
    }
    if (sparkleRef.current) {
      sparkleRef.current.rotation.y = -t * 0.4;
    }
  });

  return (
    <group ref={group} position={[-1.75, 2.45, -33]}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          vertexColors
          roughness={0.26}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.24}
          envMapIntensity={2.2}
        />
      </mesh>
      <points ref={sparkleRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[sparkles, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#e8c893"
          size={0.045}
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
      <pointLight position={[0.6, 0.6, 1.2]} color="#ffe2b8" intensity={4} distance={7} decay={2} />
    </group>
  );
}

/* ------------------- парящие расписные конфеты ------------------- */

function MarbledFloaters() {
  const marble = useMemo(() => makeMarbleTexture(), []);

  const items = useMemo(() => {
    const list: { pos: [number, number, number]; r: number; seed: number }[] = [];
    let z = -7;
    let side = 1;
    while (z > -52) {
      const r = 0.16 + Math.random() * 0.2;
      const x = side * (3.1 + Math.random() * 1.5);
      const y = 0.6 + Math.random() * 2.6;
      // не пересекаемся с кино-экраном (z −14…−20 справа)
      const nearScreen = side > 0 && z < -13.5 && z > -20.5;
      if (!nearScreen) list.push({ pos: [x, y, z], r, seed: Math.random() * 6 });
      z -= 3.4 + Math.random() * 2.6;
      side *= -1;
    }
    return list;
  }, []);

  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      child.rotation.y = t * (0.2 + (i % 5) * 0.06) + i;
      child.rotation.x = Math.sin(t * 0.35 + i) * 0.3;
      child.position.y += Math.sin(t * 0.55 + i * 1.7) * 0.0011;
    });
  });

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <mesh key={i} position={it.pos} rotation={[it.seed, it.seed * 1.7, 0]}>
          <sphereGeometry args={[it.r, 24, 24]} />
          <meshPhysicalMaterial
            map={marble}
            roughness={0.16}
            metalness={0.08}
            clearcoat={1}
            clearcoatRoughness={0.18}
            envMapIntensity={1.7}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function VideoScene() {
  return (
    <group>
      <CinemaScreen />
      <WhiteRose />
      <MarbledFloaters />
    </group>
  );
}
