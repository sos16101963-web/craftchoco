/**
 * Общее мутабельное состояние 3D-погружения «Одна конфета».
 * Пишется одним scroll-listener'ом на странице, читается в useFrame (r3f)
 * и в rAF-циклах оверлеев — без ре-рендеров React на каждый кадр.
 */

export type JourneyMode = "3d" | "static";

export interface JourneyState {
  /** 0..1 — прогресс скролла по 3D-маршруту */
  progress: number;
  /** пользователь нажал «Войти» на прелоадере */
  started: boolean;
  /** performance.now() на момент старта (таймлайн сборки букета) */
  startTime: number;
  /** нормализованная позиция мыши -1..1 (параллакс камеры) */
  mouse: { x: number; y: number };
  /** режим: полный 3D или статический fallback */
  mode: JourneyMode;
  /** качественный уровень: физические материалы только на desktop */
  quality: "high" | "low";
}

export const journey: JourneyState = {
  progress: 0,
  started: false,
  startTime: 0,
  mouse: { x: 0, y: 0 },
  mode: "3d",
  quality: "high",
};

// отладочный доступ (используется для диагностики таймлайна)
if (typeof window !== "undefined") {
  (window as unknown as { __jj?: JourneyState }).__jj = journey;
}

/** Высота обёртки маршрута в vh (скролл-расстояние = JOURNEY_VH - 100) */
export const JOURNEY_VH = 540;

/** Количество секций оверлеев: герой, 3 товара, финал-«врата вкуса» */
export const OVERLAY_SECTIONS = 5;

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export const smoothstep = (t: number) => {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
};

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
