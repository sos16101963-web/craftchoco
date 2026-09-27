"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import LogoBoxHero from "./logo-box-hero";
import VideoScene from "./video-scene";
import ChocolateTunnel from "./chocolate-tunnel";
import { journey, clamp, smoothstep } from "@/lib/journey";

/**
 * Камера-риг: 5 станций (герой-коробка с логотипом → 3 витрины → Врата вкуса).
 * Позиция интерполируется по progress скролла + параллакс мышью.
 */

const STATIONS: { pos: THREE.Vector3; look: THREE.Vector3 }[] = [
  // 0 — герой: чёрная коробка с золотым логотипом мастерской (вид сверху-спереди)
  { pos: new THREE.Vector3(0, 2.7, 9.8), look: new THREE.Vector3(0, 1.15, 0) },
  // 1 — станция «Праздник без повода» (слева, z=-12); смотрим в центр фото (y≈1.8)
  {
    pos: new THREE.Vector3(1.35, 1.85, -7.4),
    look: new THREE.Vector3(-2.6, 1.8, -12),
  },
  // 2 — станция «Объятия любимого» (справа, z=-26)
  {
    pos: new THREE.Vector3(-1.35, 1.9, -21.4),
    look: new THREE.Vector3(2.6, 1.85, -26),
  },
  // 3 — станция «Искусство во плоти» (слева, z=-40)
  {
    pos: new THREE.Vector3(1.35, 1.85, -35.4),
    look: new THREE.Vector3(-2.6, 1.8, -40),
  },
  // 4 — Врата вкуса
  { pos: new THREE.Vector3(0, 1.75, -48.5), look: new THREE.Vector3(0, 1.7, -55) },
];

function CameraRig() {
  const pos = useRef(new THREE.Vector3(0, 2.7, 9.8));
  const look = useRef(new THREE.Vector3(0, 1.15, 0));
  const tmp = useRef({
    a: new THREE.Vector3(),
    b: new THREE.Vector3(),
  });

  useFrame(({ camera, clock, size }) => {
    const tmpA = tmp.current.a;
    const tmpB = tmp.current.b;
    const p = clamp(journey.progress, 0, 1);
    const v = p * (STATIONS.length - 1);
    const i = Math.min(Math.floor(v), STATIONS.length - 2);
    const local = smoothstep(v - i);

    tmpA.lerpVectors(STATIONS[i].pos, STATIONS[i + 1].pos, local);
    tmpB.lerpVectors(STATIONS[i].look, STATIONS[i + 1].look, local);

    // на узких экранах отъезжаем вдоль линии взгляда, чтобы фото витрины влезло по ширине
    const aspect = size.width / Math.max(1, size.height);
    const backoff = Math.max(1, 0.95 / Math.pow(aspect, 0.7));
    tmpA.sub(tmpB).multiplyScalar(backoff).add(tmpB);

    const t = clock.elapsedTime;
    // параллакс мышью + лёгкое дыхание
    tmpA.x += journey.mouse.x * 0.45;
    tmpA.y += -journey.mouse.y * 0.25 + Math.sin(t * 0.55) * 0.06;
    tmpB.x += journey.mouse.x * 0.2;
    void tmpA; void tmpB; // мутация только ref-объектов

    pos.current.lerp(tmpA, 0.09);
    look.current.lerp(tmpB, 0.09);

    camera.position.copy(pos.current);
    camera.lookAt(look.current);
  });

  return null;
}

import type { Locale } from "@/lib/i18n";

export interface JourneyCanvasProps {
  active: boolean;
  particleCount: number;
  locale?: Locale;
}

export default function JourneyCanvas({ active, particleCount, locale = "uk" }: JourneyCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      camera={{ fov: 42, near: 0.1, far: 140, position: [0, 2.7, 9.8] }}
      style={{ background: "#150a05" }}
    >
      <color attach="background" args={["#150a05"]} />
      <fogExp2 attach="fog" args={["#150a05", 0.048]} />

      <CameraRig />

      <LogoBoxHero count={particleCount} />
      <ChocolateTunnel />
      <VideoScene />

      {/* процедурное тёплое окружение — без внешних HDR-файлов */}
      <Environment resolution={256}>
        <Lightformer
          intensity={2.4}
          color="#ffdba8"
          position={[0, 6, -8]}
          scale={[12, 3, 1]}
        />
        <Lightformer
          intensity={1.5}
          color="#ffb46e"
          position={[-8, 2, -20]}
          scale={[3, 8, 1]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <Lightformer
          intensity={1.5}
          color="#ffb46e"
          position={[8, 2, -35]}
          scale={[3, 8, 1]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <Lightformer
          intensity={1.2}
          color="#ffe9cf"
          position={[0, 3, -54]}
          scale={[6, 6, 1]}
        />
        <Lightformer
          intensity={0.9}
          color="#fff6ea"
          position={[0, 9, 6]}
          scale={[10, 2, 1]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </Environment>
    </Canvas>
  );
}
