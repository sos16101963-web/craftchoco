type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Отправка события в GA4 (если счётчик подключён). */
export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", name, params);
  } catch {
    /* аналитика не должна ломать сайт */
  }
}

/** Отправка стандартного события в Facebook Pixel (если пиксель подключён). */
export function trackFb(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  try {
    window.fbq?.("track", name, params);
  } catch {
    /* пиксель не должен ломать сайт */
  }
}
