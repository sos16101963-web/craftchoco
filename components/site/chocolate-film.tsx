"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { RefObject, ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

/* ————————————————————————————————————————————————
   Короткометражка «Одна конфета»
   Девять сцен: утро в Харькове → плитка Callebaut →
   ганаш 45 °C → мрамор → клеймо → коробка 16 → лента →
   эмоция → финал. Скролл = перемотка фильма.
———————————————————————————————————————————————— */

type Camera = {
  s0: number;
  s1: number;
  x0?: number;
  x1?: number;
  y0?: number;
  y1?: number;
  r0?: number;
  r1?: number;
};

type Fx = "shimmer" | "sweep" | "glow";

type Scene = {
  src: string;
  alt: string;
  no: string;
  kicker: string;
  hook: ReactNode;
  camera: Camera;
  fx?: Fx;
  grade?: string;
  press?: boolean;
  finale?: boolean;
};

const SCENES: Scene[] = [
  {
    src: "/images/hero.jpg",
    alt: "Фирменные шоколадные бруски CraftChocoKharkiv с золотым логотипом мастерской на тёмном фоне",
    no: "01",
    kicker: "Глава I · Утро",
    hook: (
      <>
        Харьков ещё спит. А у нас уже пахнет тёплым шоколадом. Это история{" "}
        <span className="gold-text">одной конфеты</span> — листайте, кино началось.
      </>
    ),
    camera: { s0: 1.07, s1: 1.2, y0: 2, y1: 0 },
    grade: "sepia(0.16) saturate(1.04) brightness(0.98)",
  },
  {
    src: "/images/mini-tiles.jpg",
    alt: "Мини-плитки бельгийского шоколада Callebaut в мастерской CraftChocoKharkiv",
    no: "02",
    kicker: "Глава II · Бельгийское начало",
    hook: (
      <>
        Всё начинается с плитки Callebaut. <span className="gold-text">100% Бельгия</span> — без
        компромиссов и замен.
      </>
    ),
    camera: { s0: 1.34, s1: 1.12 },
    fx: "shimmer",
  },
  {
    src: "/images/craft.jpg",
    alt: "Руки мастера готовят шоколадный ганаш вручную при температуре 45 °C",
    no: "03",
    kicker: "Глава III · Сорок пять градусов",
    hook: (
      <>
        Ганаш мешается вручную: <span className="gold-text">45 °C</span> и полчаса непрерывного
        движения. Конфета не прощает спешки.
      </>
    ),
    camera: { s0: 1.08, s1: 1.3 },
    grade: "contrast(1.05) saturate(1.05)",
  },
  {
    src: "/images/art-bars.webp",
    alt: "Авторские шоколадные плитки с мраморным рисунком ручной работы",
    no: "04",
    kicker: "Глава IV · Мрамор",
    hook: (
      <>
        Мраморный узор — не краска, а <span className="gold-text">застывшее движение</span>{" "}
        шоколада. Двух одинаковых не существует.
      </>
    ),
    camera: { s0: 1.16, s1: 1.34, r0: -1.6, r1: 0.8 },
  },
  {
    src: "/images/spheres-marble.jpg",
    alt: "Шоколадные сферы с мраморным узором, закрытые вручную и с клеймом мастера",
    no: "05",
    kicker: "Глава V · Клеймо",
    hook: (
      <>
        Каждая конфета закрывается и клеймится вручную. Без{" "}
        <span className="gold-text">клейма мастера</span> в коробку не попадает.
      </>
    ),
    camera: { s0: 1.05, s1: 1.42 },
    press: true,
    grade: "contrast(1.06)",
  },
  {
    src: "/images/set-sixteen.webp",
    alt: "Фирменный набор из 16 конфет с фруктовыми ганашами в красной коробке",
    no: "06",
    kicker: "Глава VI · Шестнадцать мест",
    hook: (
      <>
        Шестнадцать конфет — и каждая на своём месте. Коробка собирается{" "}
        <span className="gold-text">под эмоцию</span>, а не под вес.
      </>
    ),
    camera: { s0: 1.44, s1: 1.1 },
    fx: "glow",
  },
  {
    src: "/images/envelope-gift.jpg",
    alt: "Шоколадный конверт-поздравление с лентой — момент вручения подарка",
    no: "07",
    kicker: "Глава VII · Лента",
    hook: (
      <>
        Лента затянута, бант на месте. Остаётся самое трудное —{" "}
        <span className="gold-text">отдать и не выдать себя</span>.
      </>
    ),
    camera: { s0: 1.22, s1: 1.24, x0: -2.6, x1: 2.6 },
    fx: "sweep",
  },
  {
    src: "/images/flowers-six.jpg",
    alt: "Шоколадный букет из шести цветов ручной работы — эмоция получателя",
    no: "08",
    kicker: "Глава VIII · Эмоция",
    hook: (
      <>
        Секунда тишины — и лицо человека, который понял:{" "}
        <span className="gold-text">его любят</span>. Ради этого всё и затевалось.
      </>
    ),
    camera: { s0: 1.1, s1: 1.26 },
    fx: "glow",
  },
  {
    src: "/images/set-combo.jpg",
    alt: "Комбинированный подарочный набор ручной работы — финал фильма",
    no: "09",
    kicker: "Глава IX · Финал",
    title: "Одна конфета. Одна эмоция. Ваша.",
    hook: (
      <>
        Выберите готовую историю из коллекции — или напишите, и{" "}
        <span className="gold-text">соберём коробку под ваш повод</span>.
      </>
    ),
    camera: { s0: 1.18, s1: 1.06 },
    finale: true,
  },
];

const N = SCENES.length;
const FADE = 0.22; // длительность кроссфейда (доля сцены)
const FILM_SECONDS = 96; // «хронометраж» для времякода
const smooth = (x: number) => x * x * (3 - 2 * x); // smoothstep
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const pad2 = (n: number) => String(n).padStart(2, "0");

/* ——— Частицы: какао-пыль, пар над ганашем, искры ——— */
function FilmParticles({
  activeScene,
  sectionRef,
}: {
  activeScene: RefObject<number>;
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    type P = {
      x: number;
      y: number;
      r: number;
      vy: number;
      sway: number;
      phase: number;
      a: number;
      steam?: boolean;
    };
    const dust: P[] = Array.from({ length: w < 640 ? 14 : 26 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.6,
      vy: 0.018 + Math.random() * 0.05,
      sway: 6 + Math.random() * 18,
      phase: Math.random() * Math.PI * 2,
      a: 0.1 + Math.random() * 0.22,
    }));
    const steam: P[] = [];
    let visible = true;
    let raf = 0;
    let t = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(section);

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      const scene = activeScene.current ?? 0;
      const boost = scene === 5 ? 2.1 : 1; // сцена «Коробка» — искры
      for (const d of dust) {
        d.y -= d.vy * 0.016;
        if (d.y < -0.05) {
          d.y = 1.05;
          d.x = Math.random();
        }
        const x = d.x * w + Math.sin(t * 0.7 + d.phase) * d.sway;
        const tw = 0.55 + 0.45 * Math.sin(t * 1.3 + d.phase * 2);
        ctx.beginPath();
        ctx.fillStyle = `rgba(226,190,122,${Math.min(0.5, d.a * tw * boost)})`;
        ctx.arc(x, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      // пар над ганашем — только в сцене III
      if (scene === 2 && steam.length < 36 && Math.random() < 0.4) {
        steam.push({
          x: w * (0.4 + Math.random() * 0.2),
          y: h + 30,
          r: 24 + Math.random() * 44,
          vy: 1.1 + Math.random() * 1.6,
          sway: 10 + Math.random() * 22,
          phase: Math.random() * Math.PI * 2,
          a: 0.13 + Math.random() * 0.1,
          steam: true,
        });
      }
      for (let i = steam.length - 1; i >= 0; i--) {
        const s = steam[i];
        s.y -= s.vy;
        s.a *= 0.988;
        if (s.a < 0.012 || s.y < -s.r) {
          steam.splice(i, 1);
          continue;
        }
        const x = s.x + Math.sin(t + s.phase) * s.sway * (1 + s.y / h);
        const g = ctx.createRadialGradient(x, s.y, 0, x, s.y, s.r);
        g.addColorStop(0, `rgba(255,238,214,${s.a})`);
        g.addColorStop(1, "rgba(255,238,214,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [activeScene, sectionRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[55] h-full w-full"
    />
  );
}

/* ——— Сам фильм ——— */
export function ChocolateFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const skipRef = useRef<HTMLAnchorElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const botBarRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(0);
  const completedRef = useRef(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const update = () => {
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const runway = Math.max(section.offsetHeight - vh, 1);
      const p = clamp01(-rect.top / runway);
      const u = p * N;

      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;

      // letterbox: въезжает в начале, глубже в финале
      const intro = smooth(clamp01(u / 0.55));
      const outro = smooth(clamp01((u - (N - 1 + 0.45)) / 0.5));
      const barVh = 5 * intro + 3.5 * outro;
      if (topBarRef.current) topBarRef.current.style.height = `${barVh}vh`;
      if (botBarRef.current) botBarRef.current.style.height = `${barVh}vh`;

      // HUD
      const idx = Math.min(N - 1, Math.floor(u));
      if (counterRef.current) {
        counterRef.current.textContent = `${pad2(idx + 1)} / ${pad2(N)}`;
      }
      if (tcRef.current) {
        const t = p * FILM_SECONDS;
        const ff = Math.floor((t % 1) * 24);
        tcRef.current.textContent = `00:${pad2(Math.floor(t / 60))}:${pad2(Math.floor(t % 60))}:${pad2(ff)}`;
      }
      if (skipRef.current) {
        const show = u > 1.15;
        skipRef.current.style.opacity = show ? "1" : "0";
        skipRef.current.style.visibility = show ? "visible" : "hidden";
      }

      // сцены: камера + кроссфейд + эффекты
      sceneRefs.current.forEach((el, i) => {
        if (!el) return;
        const local = clamp01(u - i);
        let opacity = 1;
        if (i > 0) opacity = Math.min(1, local / FADE);
        if (i < N - 1) opacity = Math.min(opacity, (1 - local) / FADE);
        const e = smooth(local);
        const c = SCENES[i].camera;
        let scale = c.s0 + (c.s1 - c.s0) * e;
        if (SCENES[i].press) {
          // «удар клейма» — короткий панч в середине сцены
          const k = local > 0.55 && local < 0.78 ? Math.sin(((local - 0.55) / 0.23) * Math.PI) : 0;
          scale += k * 0.055;
        }
        const x = (c.x0 ?? 0) + ((c.x1 ?? 0) - (c.x0 ?? 0)) * e;
        const y = (c.y0 ?? 0) + ((c.y1 ?? 0) - (c.y0 ?? 0)) * e;
        const r = (c.r0 ?? 0) + ((c.r1 ?? 0) - (c.r0 ?? 0)) * e;
        el.style.opacity = String(opacity);
        el.style.transform = reduced
          ? "scale(1)"
          : `scale(${scale}) translate(${x}%, ${y}%) rotate(${r}deg)`;
        el.style.visibility = opacity <= 0.012 ? "hidden" : "visible";

        const fx = fxRefs.current[i];
        if (fx && SCENES[i].fx) {
          if (SCENES[i].fx === "glow") {
            fx.style.opacity = String(
              0.16 + 0.18 * (0.5 + 0.5 * Math.sin(local * Math.PI * 2 * 1.6)),
            );
          } else {
            const t2 = clamp01((local - 0.12) / 0.72);
            fx.style.transform = `translateX(${-100 + t2 * 400}%) skewX(-14deg)`;
            fx.style.opacity = String(Math.sin(t2 * Math.PI));
          }
        }
      });

      // титры
      textRefs.current.forEach((el, i) => {
        if (!el) return;
        const local = clamp01(u - i);
        const inOp = i === 0 ? 1 : clamp01((local - 0.05) / 0.13);
        const outOp = SCENES[i].finale ? 1 : clamp01((0.86 - local) / 0.12);
        const op = Math.min(inOp, outOp);
        el.style.opacity = String(op);
        el.style.transform = reduced
          ? undefined
          : `translateY(${(1 - inOp) * 46 - (1 - outOp) * 36}px)`;
        el.style.visibility = op <= 0.01 ? "hidden" : "visible";
      });

      // события + активная глава
      if (idx !== activeIdxRef.current) {
        activeIdxRef.current = idx;
        setActive(idx);
        if (idx > 0) trackEvent("film_progress", { scene: idx + 1, of: N });
      }
      if (p >= 0.985 && !completedRef.current) {
        completedRef.current = true;
        trackEvent("film_complete");
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const jumpTo = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const runway = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.55) / N) * runway, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-choco-950"
      style={{ height: `calc(${N * 112}vh + 10vh)` }}
      aria-label="Короткометражка «Одна конфета»: путь шоколада от плитки Callebaut до эмоции подарка"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-choco-950 text-cream supports-[height:100svh]:h-svh">
        {/* Сцены */}
        {SCENES.map((s, i) => (
          <div
            key={s.src}
            ref={(el) => {
              sceneRefs.current[i] = el;
            }}
            className="pointer-events-none absolute inset-0 will-change-transform"
            style={{ opacity: i === 0 ? 1 : 0, zIndex: i + 1 }}
          >
            <div
              className="absolute inset-0"
              style={s.grade ? { filter: s.grade } : undefined}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i < 2}
                loading={i < 2 ? undefined : "eager"}
                sizes="100vw"
                quality={80}
                className="object-cover"
              />
            </div>
            {/* градиент для читаемости титров */}
            <div className="absolute inset-0 bg-gradient-to-t from-choco-950/96 via-choco-950/62 to-choco-950/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-choco-950/70 via-transparent to-choco-950/30" />

            {/* световые эффекты */}
            {(s.fx === "shimmer" || s.fx === "sweep") && (
              <div
                ref={(el) => {
                  fxRefs.current[i] = el;
                }}
                aria-hidden
                className="absolute inset-y-0 left-0 w-1/2 opacity-0"
                style={{
                  background:
                    s.fx === "shimmer"
                      ? "linear-gradient(100deg, transparent 30%, rgba(214,177,105,0.22) 50%, rgba(255,238,200,0.30) 54%, transparent 72%)"
                      : "linear-gradient(100deg, transparent 34%, rgba(255,244,222,0.13) 52%, transparent 68%)",
                }}
              />
            )}
            {s.fx === "glow" && (
              <div
                ref={(el) => {
                  fxRefs.current[i] = el;
                }}
                aria-hidden
                className="absolute inset-0 opacity-0"
                style={{
                  background:
                    "radial-gradient(60% 52% at 50% 42%, rgba(233,196,124,0.20), transparent 72%)",
                }}
              />
            )}
          </div>
        ))}

        {/* старт из темноты + виньетка */}
        <div aria-hidden className="film-intro pointer-events-none absolute inset-0 z-[45] bg-black" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[46]"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(10,5,2,0.55) 100%)",
          }}
        />

        {/* пар и какао-пыль */}
        <FilmParticles activeScene={activeIdxRef} sectionRef={sectionRef} />

        {/* титры */}
        {SCENES.map((s, i) => (
          <div
            key={`t-${s.src}`}
            ref={(el) => {
              textRefs.current[i] = el;
            }}
            className="pointer-events-none absolute inset-0 z-[60]"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            {/* гигантский номер главы */}
            <div
              aria-hidden
              className="absolute -right-[1vw] bottom-[4vh] select-none font-display text-[24vw] font-bold leading-none text-white/[0.045] sm:text-[19vw]"
            >
              {s.no}
            </div>

            <div className="absolute inset-x-0 bottom-0">
              {/* тёмная подушка под титрами */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[75%] bg-[radial-gradient(72%_90%_at_28%_92%,rgba(21,12,7,0.94),transparent_80%)] sm:h-[68%]"
              />
              <div className="relative mx-auto w-full max-w-7xl px-4 pb-[clamp(4.5rem,12vh,7rem)] sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                  <p className="divider-gold text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-400 sm:text-xs">
                    {s.kicker}
                  </p>

                  {i === 0 && (
                    <h1 className="mt-[clamp(0.8rem,2vh,1.25rem)] font-display text-[clamp(2.1rem,min(7.2vh,9vw),4.5rem)] font-bold leading-[1.08] [text-shadow:0_2px_28px_rgba(10,5,2,0.9)]">
                      Шоколад, который <span className="gold-text">дарит эмоции</span>
                    </h1>
                  )}

                  {s.finale && s.title && (
                    <h2 className="mt-[clamp(0.8rem,2vh,1.25rem)] font-display text-[clamp(2rem,min(7vh,8.6vw),4.25rem)] font-bold leading-[1.08] [text-shadow:0_2px_28px_rgba(10,5,2,0.9)]">
                      <span className="gold-text">{s.title}</span>
                    </h2>
                  )}

                  <p className="mt-[clamp(0.9rem,2.2vh,1.25rem)] max-w-2xl font-display text-[clamp(1.05rem,min(4.4vh,5.6vw),2.4rem)] font-semibold leading-snug [text-shadow:0_1px_18px_rgba(10,5,2,0.85)]">
                    {s.hook}
                  </p>

                  {i === 0 && (
                    <div className="mt-[clamp(1.2rem,3.2vh,2rem)] flex flex-wrap items-center gap-x-8 gap-y-3">
                      <span className="pointer-events-none flex items-center gap-2 text-sm font-medium text-cream/60">
                        <span className="inline-block animate-bounce" aria-hidden>
                          ↓
                        </span>
                        Листайте — кино началось
                      </span>
                      <a
                        href="#catalog"
                        className="pointer-events-auto text-sm font-semibold text-cream/60 underline-offset-4 transition-colors hover:text-gold-300 hover:underline"
                      >
                        Сразу к конфетам →
                      </a>
                    </div>
                  )}

                  {s.finale && (
                    <div className="pointer-events-auto mt-[clamp(1.2rem,3.2vh,2rem)] flex flex-wrap items-center gap-5">
                      <a
                        href="#catalog"
                        className="inline-flex h-14 items-center justify-center rounded-full bg-gold-500 px-9 text-base font-bold text-choco-950 shadow-[0_16px_40px_-12px_rgba(196,154,74,0.55)] transition-all hover:-translate-y-0.5 hover:bg-gold-400"
                      >
                        Выбрать эмоцию →
                      </a>
                      <a
                        href="#contacts"
                        className="text-sm font-semibold text-cream/75 underline-offset-4 transition-colors hover:text-gold-300 hover:underline"
                      >
                        Написать мастеру — 096 253 56 10
                      </a>
                      <span className="text-sm font-medium text-cream/55">
                        От 3 000 ₴ — бесплатная доставка · По Харькову — в день заказа
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* кино-зерно */}
        <div aria-hidden className="film-grain pointer-events-none absolute -inset-[10%] z-[70]" />

        {/* letterbox — кино-полосы */}
        <div
          ref={topBarRef}
          aria-hidden
          className="absolute inset-x-0 top-0 z-[80] bg-black"
          style={{ height: 0 }}
        />
        <div
          ref={botBarRef}
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-[80] bg-black"
          style={{ height: 0 }}
        />

        {/* HUD: бренд */}
        <div className="pointer-events-none absolute left-4 top-20 z-[90] sm:left-8 sm:top-24">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cream/55 sm:text-[11px]">
            Craft Choco · Kharkiv
          </p>
          <p className="mt-1 font-display text-sm italic text-gold-300/80 sm:text-base">
            короткометражка «Одна конфета»
          </p>
        </div>

        {/* HUD: времякод и счётчик сцен */}
        <div className="pointer-events-none absolute right-4 top-20 z-[90] text-right font-mono text-[11px] tracking-[0.2em] text-cream/55 sm:right-8 sm:top-24 sm:text-xs">
          <p>
            TC <span ref={tcRef}>00:00:00:00</span>
          </p>
          <p className="mt-1 text-gold-300/80">
            SC <span ref={counterRef}>01 / 09</span>
          </p>
        </div>

        {/* навигация по главам (десктоп) */}
        <nav
          aria-label="Главы фильма"
          className="absolute right-6 top-1/2 z-[90] hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
        >
          {SCENES.map((s, i) => (
            <button
              key={`d-${s.src}`}
              type="button"
              onClick={() => jumpTo(i)}
              aria-label={`Перейти к главе ${i + 1}: ${s.kicker}`}
              aria-current={active === i}
              className={`h-2.5 w-2.5 rounded-full border transition-all ${
                active === i
                  ? "scale-125 border-gold-400 bg-gold-400"
                  : "border-cream/40 bg-transparent hover:border-gold-300"
              }`}
            />
          ))}
        </nav>

        {/* пропустить фильм */}
        <a
          ref={skipRef}
          href="#catalog"
          className="absolute bottom-7 right-4 z-[90] text-xs font-semibold uppercase tracking-[0.2em] text-cream/50 underline-offset-4 opacity-0 transition-opacity duration-500 hover:text-gold-300 hover:underline sm:right-8 sm:text-sm"
          style={{ visibility: "hidden" }}
        >
          Пропустить фильм ↓
        </a>

        {/* прогресс-бар с засечками */}
        <div className="absolute inset-x-0 bottom-0 z-[90] h-[3px] bg-white/10">
          <div
            ref={barRef}
            className="h-full origin-left bg-gold-400"
            style={{ transform: "scaleX(0)" }}
          />
          {SCENES.slice(1).map((s, i) => (
            <span
              key={`tick-${s.src}`}
              aria-hidden
              className="absolute top-0 h-full w-px bg-choco-950/70"
              style={{ left: `${((i + 1) / N) * 100}%` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
