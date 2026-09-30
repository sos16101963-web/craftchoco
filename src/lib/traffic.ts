export function initTrafficTracker() {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem("crafo_traffic_source")) return;

    const ref = document.referrer || "";
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source") || "";
    const utmMedium = params.get("utm_medium") || "";
    const utmCampaign = params.get("utm_campaign") || "";

    let source = "Прямий перехід на сайт";

    const lowerRef = ref.toLowerCase();
    const lowerUtm = utmSource.toLowerCase();

    if (lowerRef.includes("youtube.com") || lowerRef.includes("youtu.be") || lowerUtm.includes("youtube")) {
      source = "YouTube";
    } else if (lowerRef.includes("tiktok.com") || lowerUtm.includes("tiktok")) {
      source = "TikTok";
    } else if (lowerRef.includes("instagram.com") || lowerUtm.includes("instagram")) {
      source = "Instagram";
    } else if (
      lowerRef.includes("facebook.com") ||
      lowerRef.includes("fb.com") ||
      lowerUtm.includes("facebook") ||
      params.has("fbclid")
    ) {
      source = "Facebook";
    } else if (lowerRef.includes("google.") || lowerUtm.includes("google")) {
      source = "Google (Пошук)";
    } else if (lowerRef.includes("t.me") || lowerRef.includes("telegram") || lowerUtm.includes("telegram")) {
      source = "Telegram";
    } else if (lowerRef && !lowerRef.includes(window.location.hostname)) {
      try {
        source = new URL(ref).hostname;
      } catch {
        source = ref;
      }
    }

    sessionStorage.setItem(
      "crafo_traffic_source",
      JSON.stringify({
        source,
        referrer: ref,
        landingPage: window.location.pathname,
        utmSource,
        utmMedium,
        utmCampaign,
      })
    );
  } catch {}
}

export function getTrafficSource(): string {
  if (typeof window === "undefined") return "Прямий перехід на сайт";
  try {
    const data = sessionStorage.getItem("crafo_traffic_source");
    if (data) {
      const parsed = JSON.parse(data);
      return parsed.source || "Прямий перехід на сайт";
    }
  } catch {}
  return "Прямий перехід на сайт";
}
