"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { journey, clamp } from "@/lib/journey";

/**
 * Первый кадр погружения: букет шоколадных цветов — как настоящий
 * «Букет, который не завянет» из каталога мастерской. Собирается из тысяч
 * частиц какао-пыли, затем проявляется глянцевое тело.
 * Полностью процедурная геометрия — внешних ассетов нет.
 *
 * Палитра повторяет реальные цветы мастерской: коралловая роза,
 * бирюзовый ранункулюс, медная роза, солнечный подсолнух,
 * чёрный георгин с золотыми каплями.
 */

const UP = new THREE.Vector3(0, 1, 0);
const tmpObj = new THREE.Object3D();

type Part = THREE.BufferGeometry;

/** Красит геометрию вершинным цветом */
function colored(g: THREE.BufferGeometry, color: THREE.ColorRepresentation): Part {
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

/** Ставит геометрию в позицию/поворот/масштаб и красит */
function place(
  g: THREE.BufferGeometry,
  color: THREE.ColorRepresentation,
  pos: [number, number, number],
  rot: [number, number, number] = [0, 0, 0],
  scale: [number, number, number] = [1, 1, 1],
): Part {
  tmpObj.position.set(pos[0], pos[1], pos[2]);
  tmpObj.rotation.set(rot[0], rot[1], rot[2]);
  tmpObj.scale.set(scale[0], scale[1], scale[2]);
  tmpObj.updateMatrix();
  g.applyMatrix4(tmpObj.matrix);
  return colored(g, color);
}

/** Стебель-цилиндр от точки a к точке b */
function stem(
  a: THREE.Vector3,
  b: THREE.Vector3,
  r: number,
  color: THREE.ColorRepresentation,
): Part {
  const dir = b.clone().sub(a);
  const len = Math.max(0.001, dir.length());
  const g = new THREE.CylinderGeometry(r * 0.6, r, len, 7, 1);
  const q = new THREE.Quaternion().setFromUnitVectors(UP, dir.normalize());
  const m = new THREE.Matrix4().compose(
    a.clone().add(b).multiplyScalar(0.5),
    q,
    new THREE.Vector3(1, 1, 1),
  );
  g.applyMatrix4(m);
  return colored(g, color);
}

/** Роза: сердцевина + три кольца лепестков-«чашечек» */
function addRose(
  parts: Part[],
  cx: number,
  cy: number,
  cz: number,
  s: number,
  petal: string,
  core: string,
) {
  const d = new THREE.Object3D();
  d.rotation.order = "YXZ"; // сначала yaw наружу, потом наклон лепестка

  // сердцевина
  parts.push(
    place(
      new THREE.SphereGeometry(0.105 * s, 12, 10),
      core,
      [cx, cy, cz],
      [0, 0, 0],
      [1, 0.82, 1],
    ),
  );

  const rings = [
    { n: 5, r: 0.08, pr: 0.15, tilt: 1.0, mul: 1.0 },
    { n: 7, r: 0.17, pr: 0.185, tilt: 0.6, mul: 0.93 },
    { n: 10, r: 0.27, pr: 0.21, tilt: 0.32, mul: 0.86 },
  ];

  rings.forEach((ring, ri) => {
    const col = new THREE.Color(petal).multiplyScalar(ring.mul);
    for (let i = 0; i < ring.n; i++) {
      const j1 = Math.sin((i + 1) * 12.9898 + ri * 78.233 + cx * 37) * 0.14;
      const a = (i / ring.n) * Math.PI * 2 + ri * 0.55 + j1;
      const lift = ring.r * Math.sin(ring.tilt) * 0.5 * s + j1 * 0.3;
      d.position.set(cx + Math.cos(a) * ring.r * s, cy + lift, cz + Math.sin(a) * ring.r * s);
      d.rotation.set(ring.tilt, Math.PI / 2 - a, 0);
      d.scale.set(1, 0.42, 0.8);
      d.updateMatrix();
      const g = new THREE.SphereGeometry(ring.pr * s, 9, 7);
      g.applyMatrix4(d.matrix);
      parts.push(colored(g, col));
    }
  });
}

/** Бутон: конус + чашелистики */
function addBud(
  parts: Part[],
  cx: number,
  cy: number,
  cz: number,
  tiltZ: number,
  color: string,
) {
  parts.push(place(new THREE.ConeGeometry(0.11, 0.3, 10), color, [cx, cy, cz], [0, 0, tiltZ]));
  parts.push(
    place(
      new THREE.SphereGeometry(0.06, 8, 6),
      "#4a3520",
      [cx - Math.sin(tiltZ) * 0.1, cy - 0.12, cz],
      [0, 0, tiltZ * 0.5],
      [1, 0.7, 1],
    ),
  );
}

/** Мержит все части букета в одну геометрию (локальные координаты: y 0…~2.05) */
function buildBouquetGeometry(): THREE.BufferGeometry {
  const parts: Part[] = [];
  const GOLD = "#d9a05b";
  const STEM_C = "#4a3520";

  // ——— обёртка-конус (тёмный крафт) с золотым кантом и лентой ———
  parts.push(
    place(new THREE.CylinderGeometry(0.5, 0.24, 0.68, 26, 1, true), "#3a2412", [0, 0.34, 0]),
  );
  parts.push(
    place(new THREE.TorusGeometry(0.5, 0.03, 10, 40), GOLD, [0, 0.68, 0], [Math.PI / 2, 0, 0]),
  );
  parts.push(
    place(new THREE.TorusGeometry(0.385, 0.042, 10, 40), GOLD, [0, 0.4, 0], [Math.PI / 2, 0, 0]),
  );

  // ——— цветы: палитра реального набора «Букет, который не завянет» ———
  const FLOWERS = [
    { c: [0, 1.58, 0.0], s: 1.0, petal: "#45220f", core: "#d9a05b" }, // чёрный георгин, золотая середина
    { c: [-0.5, 1.4, 0.06], s: 0.95, petal: "#e87a50", core: "#8a2f1d" }, // коралловая роза
    { c: [0.5, 1.44, 0.08], s: 0.93, petal: "#52c0b6", core: "#1f5c57" }, // бирюзовый ранункулюс
    { c: [-0.25, 1.22, 0.4], s: 0.88, petal: "#d18a42", core: "#7a4a1e" }, // медная роза
    { c: [0.26, 1.26, 0.38], s: 0.86, petal: "#f5bd4e", core: "#6b4413" }, // солнечный подсолнух
    { c: [0.0, 1.14, 0.5], s: 0.84, petal: "#f5e6cc", core: "#d9a05b" }, // белый пион (белый шоколад)
    { c: [0.0, 1.48, -0.36], s: 0.88, petal: "#d18a42", core: "#7a4a1e" }, // медная роза сзади
  ];
  const BUDS = [
    { c: [-0.64, 1.08, 0.04], tilt: 0.55, col: "#dd8258" },
    { c: [0.62, 1.12, 0.02], tilt: -0.5, col: "#d18a42" },
  ];

  // стебли (сначала, чтобы цветы легли поверх)
  for (const f of FLOWERS) {
    parts.push(
      stem(
        new THREE.Vector3(0, 0.58, 0),
        new THREE.Vector3(f.c[0], f.c[1] - 0.1, f.c[2]),
        0.026,
        STEM_C,
      ),
    );
  }
  for (const b of BUDS) {
    parts.push(
      stem(
        new THREE.Vector3(0, 0.6, 0),
        new THREE.Vector3(b.c[0], b.c[1] - 0.13, b.c[2]),
        0.022,
        STEM_C,
      ),
    );
  }

  // шоколадные листья — прикрывают стебли
  parts.push(
    place(new THREE.SphereGeometry(0.22, 9, 7), "#4d5a30", [-0.44, 0.8, 0.24], [0.2, 0.6, 0.45], [1, 0.24, 0.52]),
  );
  parts.push(
    place(new THREE.SphereGeometry(0.21, 9, 7), "#43502a", [0.45, 0.84, 0.22], [-0.15, -0.7, -0.4], [1, 0.24, 0.5]),
  );
  parts.push(
    place(new THREE.SphereGeometry(0.2, 9, 7), "#4d5a30", [0.05, 0.9, -0.38], [0.1, 2.6, 0.25], [1, 0.24, 0.5]),
  );
  parts.push(
    place(new THREE.SphereGeometry(0.18, 9, 7), "#43502a", [-0.2, 0.74, 0.4], [0.3, 1.8, 0.5], [1, 0.24, 0.5]),
  );
  parts.push(
    place(new THREE.SphereGeometry(0.18, 9, 7), "#4d5a30", [0.24, 0.72, 0.38], [-0.25, -1.9, -0.5], [1, 0.24, 0.5]),
  );

  // цветы и бутоны
  for (const f of FLOWERS) {
    addRose(parts, f.c[0], f.c[1], f.c[2], f.s, f.petal, f.core);
  }
  for (const b of BUDS) {
    addBud(parts, b.c[0], b.c[1], b.c[2], b.tilt, b.col);
  }

  const merged = mergeGeometries(parts, false);
  if (!merged) throw new Error("bouquet merge failed");
  parts.forEach((p) => p.dispose());
  merged.computeBoundingSphere();
  return merged;
}

interface ChocolateBouquetProps {
  count?: number;
}

export default function ChocolateBouquet({ count = 12000 }: ChocolateBouquetProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const groupRef = useRef<THREE.Group>(null);

  const { geometry, particles } = useMemo(() => {
    const geo = buildBouquetGeometry();
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
    const cream = new THREE.Color("#f3e3c3");
    const c = new THREE.Color();

    for (let i = 0; i < count; i++) {
      sampler.sample(tmp);
      targets[i * 3] = tmp.x;
      targets[i * 3 + 1] = tmp.y;
      targets[i * 3 + 2] = tmp.z;

      // старт — рассеянное облако вокруг
      starts[i * 3] = (Math.random() - 0.5) * 14;
      starts[i * 3 + 1] = 1.0 + (Math.random() - 0.5) * 10;
      starts[i * 3 + 2] = -5 - Math.random() * 9;

      delays[i] = Math.random() * 1.1;
      phases[i * 3] = Math.random() * Math.PI * 2;
      phases[i * 3 + 1] = Math.random() * Math.PI * 2;
      phases[i * 3 + 2] = Math.random() * Math.PI * 2;

      const pick = Math.random();
      c.copy(pick < 0.4 ? gold : pick < 0.72 ? cocoa : pick < 0.94 ? deep : cream);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    return {
      geometry: geo,
      particles: { positions, colors, starts, targets, delays, phases },
    };
  }, [count]);

  useFrame(({ clock, size }) => {
    const points = pointsRef.current;
    const body = bodyRef.current;
    if (!points || !body) return;

    const t = clock.elapsedTime;
    const at = journey.started ? (performance.now() - journey.startTime) / 1000 : 0;
    const assembly = clamp(at / 2.8, 0, 1);

    // герой уходит, как только погружение началось
    const heroGone = journey.progress > 0.075;
    const fade = clamp(1 - journey.progress / 0.075, 0, 1);

    // адаптивный масштаб: на портрете букет чуть крупнее и выше от заголовка
    const aspect = size.width / Math.max(1, size.height);
    const comp = aspect >= 1 ? 1 : clamp(0.55 / aspect, 1, 1.25);
    const baseY = aspect >= 1 ? 1.18 : 1.34;
    if (groupRef.current) {
      groupRef.current.scale.setScalar(0.96 * comp);
      groupRef.current.position.y = heroGone ? 7.5 : baseY;
      groupRef.current.position.z = heroGone ? -5 : 0;
      groupRef.current.rotation.x = 0.2; // лёгкий наклон к камере
      groupRef.current.rotation.y = t * 0.22;
    }

    const posAttr = points.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const { starts, targets, delays, phases } = particles;

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
    }
    posAttr.needsUpdate = true;

    const reveal = clamp((assembly - 0.84) / 0.16, 0, 1);
    const pMat = points.material as THREE.PointsMaterial;
    pMat.opacity = (1 - reveal * 0.82) * (heroGone ? 0 : 1);
    points.visible = !heroGone && pMat.opacity > 0.02;

    const bodyMat = body.material as THREE.MeshPhysicalMaterial;
    bodyMat.opacity = reveal;
    body.visible = reveal > 0.01 && !heroGone;
    if (body.visible) body.position.y = Math.sin(t * 0.5) * 0.03;
    if (glowRef.current) glowRef.current.intensity = reveal * 6.5 * fade;
  });

  return (
    <group>
      <group ref={groupRef}>
        {/* какао-пыль, собирающаяся в букет */}
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

        {/* глянцевое тело букета */}
        <mesh ref={bodyRef} geometry={geometry} position={[0, 0, 0]} visible={false}>
          <meshPhysicalMaterial
            vertexColors
            roughness={0.22}
            metalness={0.06}
            clearcoat={1}
            clearcoatRoughness={0.28}
            transparent
            opacity={0}
            envMapIntensity={2.6}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* золотое свечение перед букетом */}
        <pointLight
          ref={glowRef}
          position={[0, 1.35, 2.6]}
          color="#ffc16e"
          intensity={0}
          distance={18}
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
