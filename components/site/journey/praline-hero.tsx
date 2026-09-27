"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { journey, clamp, easeOutCubic } from "@/lib/journey";

/**
 * Первый кадр погружения: премиальный трюфель собирается из тысяч
 * светящихся частиц «какао-пыли», затем проявляется глянцевое тело.
 * Полностью процедурная геометрия — внешних ассетов нет.
 */

function buildTruffleGeometry(): THREE.BufferGeometry {
  const geo = new THREE.IcosahedronGeometry(1.35, 6);
  const pos = geo.getAttribute("position") as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    // органичные «бугорки» трюфеля: три слоя псевдошума по направлению вершины
    const n =
      0.055 * Math.sin(v.x * 4.7 + v.y * 3.1) +
      0.04 * Math.sin(v.y * 6.3 + v.z * 5.2) +
      0.03 * Math.sin(v.z * 8.9 + v.x * 7.4);
    v.multiplyScalar(1 + n);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

interface PralineHeroProps {
  count?: number;
}

export default function PralineHero({ count = 12000 }: PralineHeroProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const groupRef = useRef<THREE.Group>(null);

  const { geometry, particles } = useMemo(() => {
    const geo = buildTruffleGeometry();
    const body = new THREE.Mesh(geo, new THREE.MeshBasicMaterial());
    const sampler = new MeshSurfaceSampler(body).build();

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const starts = new Float32Array(count * 3);
    const targets = new Float32Array(count * 3);
    const delays = new Float32Array(count);
    const phases = new Float32Array(count * 3);

    const tmp = new THREE.Vector3();
    const gold = new THREE.Color("#e8c893");
    const cocoa = new THREE.Color("#b97c46");
    const deep = new THREE.Color("#7a4a24");
    const c = new THREE.Color();

    for (let i = 0; i < count; i++) {
      sampler.sample(tmp);
      targets[i * 3] = tmp.x;
      targets[i * 3 + 1] = tmp.y + 1.1; // тело трюфеля на высоте взгляда камеры
      targets[i * 3 + 2] = tmp.z;

      // старт — рассеянное облако вокруг
      starts[i * 3] = (Math.random() - 0.5) * 16;
      starts[i * 3 + 1] = 1.1 + (Math.random() - 0.5) * 11;
      starts[i * 3 + 2] = -6 - Math.random() * 10;

      delays[i] = Math.random() * 1.1;
      phases[i * 3] = Math.random() * Math.PI * 2;
      phases[i * 3 + 1] = Math.random() * Math.PI * 2;
      phases[i * 3 + 2] = Math.random() * Math.PI * 2;

      const pick = Math.random();
      c.copy(pick < 0.42 ? gold : pick < 0.75 ? cocoa : deep);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    return {
      geometry: geo,
      particles: { positions, colors, starts, targets, delays, phases },
    };
  }, [count]);

  const assemblyRef = useRef(0);

  useFrame(({ clock }) => {
    const points = pointsRef.current;
    const body = bodyRef.current;
    if (!points || !body) return;

    const t = clock.elapsedTime;
    const at = journey.started ? (performance.now() - journey.startTime) / 1000 : 0;
    const assembly = clamp(at / 2.8, 0, 1);
    assemblyRef.current = assembly;

    // герой уходит, как только погружение началось
    const heroGone = journey.progress > 0.075;
    const fade = clamp(1 - journey.progress / 0.075, 0, 1);

    const posAttr = points.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const {
      starts,
      targets,
      delays,
      phases,
    } = particles;

    const k = easeOutCubic(assembly);

    for (let i = 0; i < count; i++) {
      const d = clamp((at - delays[i]) / 1.7, 0, 1);
      const e = 1 - Math.pow(1 - d, 3);
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      const wobble = (1 - e) * 0.9;
      arr[ix] =
        starts[ix] + (targets[ix] - starts[ix]) * e +
        Math.sin(t * 1.4 + phases[ix]) * wobble;
      arr[iy] =
        starts[iy] + (targets[iy] - starts[iy]) * e +
        Math.cos(t * 1.2 + phases[iy]) * wobble;
      arr[iz] =
        starts[iz] + (targets[iz] - starts[iz]) * e +
        Math.sin(t * 1.1 + phases[iz]) * wobble;
      void k;
    }
    posAttr.needsUpdate = true;

    const reveal = clamp((assembly - 0.84) / 0.16, 0, 1);
    const pMat = points.material as THREE.PointsMaterial;
    pMat.opacity = (1 - reveal * 0.82) * (heroGone ? 0 : 1);
    points.visible = !heroGone && pMat.opacity > 0.02;

    const bodyMat = body.material as THREE.MeshPhysicalMaterial;
    bodyMat.opacity = reveal;
    body.visible = reveal > 0.01 && !heroGone;
    if (glowRef.current) glowRef.current.intensity = reveal * 3.4 * fade;

    if (groupRef.current) {
      // трюфель медленно вращается, при уходе камеры — плывёт вверх
      groupRef.current.rotation.y = t * 0.22;
      groupRef.current.position.y = heroGone ? 6.5 : 0;
      groupRef.current.position.z = heroGone ? -5 : 0;
    }
  });

  const highQuality = journey.quality === "high";

  return (
    <group>
      <group ref={groupRef}>
        {/* трюфель из частиц */}
        <points ref={pointsRef} frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[particles.positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[particles.colors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.032}
            vertexColors
            transparent
            opacity={0.95}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
          />
        </points>

        {/* глянцевое тело трюфеля */}
        <mesh ref={bodyRef} geometry={geometry} position={[0, 1.1, 0]} visible={false}>
          <meshPhysicalMaterial
            color={highQuality ? "#6b3a1a" : "#6b3d1c"}
            roughness={0.18}
            metalness={0.08}
            clearcoat={1}
            clearcoatRoughness={0.22}
            transparent
            opacity={0}
            envMapIntensity={2.1}
          />
        </mesh>

        {/* золотое свечение под трюфелем */}
        <pointLight
          ref={glowRef}
          position={[0, 0.4, 1.6]}
          color="#ffc16e"
          intensity={0}
          distance={14}
          decay={2}
        />
      </group>

      {/* парящие плоды какао на заднем плане */}
      <CacaoPods />
    </group>
  );
}

/** Плоды какао: вытянутые сферы с рёбрами, медленно дрейфуют */
function CacaoPods() {
  const pods = useMemo(() => {
    const list: { pos: [number, number, number]; rot: number; scale: number }[] = [];
    for (let i = 0; i < 7; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      list.push({
        pos: [
          side * (4.6 + Math.random() * 3.4), // по сторонам полётного коридора
          0.8 + Math.random() * 3.4,
          -3 - Math.random() * 9,
        ],
        rot: Math.random() * Math.PI,
        scale: 0.7 + Math.random() * 0.7,
      });
    }
    return list;
  }, []);

  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.children.forEach((pod, i) => {
      pod.rotation.y = t * 0.14 + i;
      pod.rotation.z = Math.sin(t * 0.3 + i * 1.7) * 0.22;
      pod.position.y += Math.sin(t * 0.5 + i * 2.1) * 0.0012;
    });
  });

  return (
    <group ref={group}>
      {pods.map((pod, i) => (
        <group key={i} position={pod.pos} rotation={[pod.rot, 0, 0]} scale={pod.scale}>
          <mesh>
            <sphereGeometry args={[0.5, 20, 20]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? "#6b3d1c" : "#7b4a24"}
              roughness={0.52}
              metalness={0.05}
              flatShading
            />
          </mesh>
          {/* рёбра плода */}
          {[0, 1, 2, 3].map((r) => (
            <mesh key={r} rotation={[0, 0, (r * Math.PI) / 4]}>
              <torusGeometry args={[0.5, 0.022, 8, 40]} />
              <meshStandardMaterial color="#5a3214" roughness={0.5} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}
