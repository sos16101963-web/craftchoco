type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

/** Отправка события в GA4 и Clarity (если счётчики подключены). */
export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", name, params);
    window.clarity?.("event", name);
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

/** Отправка сигнала намерения заказа в Telegram мастерской через Beacon API */
export function trackIntent(
  channel: "viber" | "telegram" | "phone",
  productName?: string,
  price?: number
) {
  if (typeof window === "undefined") return;
  try {
    trackEvent("quick_order_click", { channel, product: productName, price });

    let source = "Прямий перехід на сайт";
    try {
      const stored = sessionStorage.getItem("crafo_traffic_source");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.source) source = parsed.source;
      }
    } catch {}

    const payload = JSON.stringify({ channel, productName, price, source });

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics/intent", payload);
    } else {
      fetch("/api/analytics/intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      });
    }
  } catch {}
}
