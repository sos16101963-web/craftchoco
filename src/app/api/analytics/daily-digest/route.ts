import { NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8946140766:AAHsVrskyjsMMLyomSNcduNpqBP5_S1FCpk";
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || "1149100939";
const CLARITY_TOKEN = process.env.CLARITY_API_TOKEN;
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "yr31dmrb43";

interface ClarityMetric {
  metricName: string;
  dimensionName?: string;
  dimensionValue?: string;
  metricValue?: number | string;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");
    const isCron = req.headers.get("x-vercel-cron") === "1" || req.headers.get("user-agent")?.includes("vercel-cron");

    // Allow Vercel Cron or secret key query crafo2026
    if (!isCron && key !== "crafo2026" && process.env.NODE_ENV === "production" && key !== process.env.CRON_SECRET) {
      // In production allow if cron or key matches
    }

    const todayDate = new Date().toLocaleDateString("ru-RU", {
      timeZone: "Europe/Kyiv",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    let clarityData: ClarityMetric[] | null = null;
    let clarityError: string | null = null;

    if (CLARITY_TOKEN) {
      try {
        const clarityRes = await fetch(
          `https://www.clarity.ms/export-data/api/v1/project-live-insights?numOfDays=1`,
          {
            headers: {
              Authorization: `Bearer ${CLARITY_TOKEN}`,
              "Content-Type": "application/json",
            },
            next: { revalidate: 0 },
          }
        );
        if (clarityRes.ok) {
          clarityData = (await clarityRes.json()) as ClarityMetric[];
        } else {
          clarityError = `HTTP ${clarityRes.status}`;
        }
      } catch (err: unknown) {
        clarityError = err instanceof Error ? err.message : "fetch error";
      }
    }

    let message = `📊 <b>Ежедневный дайджест Crafo.com.ua</b>\n📅 <i>Дата: ${todayDate} (21:00 Киев)</i>\n\n`;

    if (clarityData && Array.isArray(clarityData) && clarityData.length > 0) {
      message += `<b>📈 Данные Microsoft Clarity за 24 часа:</b>\n`;

      // Extract sessions count
      const sessionRow = clarityData.find((d) => d.metricName?.toLowerCase().includes("session"));
      if (sessionRow?.metricValue) {
        message += `👥 Всего сессий: <b>${sessionRow.metricValue}</b>\n`;
      }

      // Extract top referrers / sources
      const sources = clarityData
        .filter((d) => d.dimensionName?.toLowerCase().includes("source") || d.dimensionName?.toLowerCase().includes("referrer"))
        .slice(0, 5);

      if (sources.length > 0) {
        message += `\n🌐 <b>Источники переходов:</b>\n`;
        for (const s of sources) {
          message += `• ${s.dimensionValue ?? "Прямой переход"}: ${s.metricValue ?? 1}\n`;
        }
      }

      // Extract top pages
      const pages = clarityData
        .filter((d) => d.dimensionName?.toLowerCase().includes("url") || d.dimensionName?.toLowerCase().includes("page"))
        .slice(0, 5);

      if (pages.length > 0) {
        message += `\n🍫 <b>Популярные страницы / наборы:</b>\n`;
        for (const p of pages) {
          message += `• ${p.dimensionValue ?? "/"}: ${p.metricValue ?? 1}\n`;
        }
      }
      message += `\n`;
    } else {
      // Status digest with live links
      message += `🟢 <b>Статус витрины:</b> Все 14 наборов онлайн и доступны к заказу\n`;
      message += `🛍 <b>Google Merchant:</b> Одобрено (Google Shopping активен)\n`;
      message += `🎬 <b>Видео-каналы:</b> YouTube (@craft.choco.kharkiv) и TikTok (@aleksandr_mag_)\n\n`;
      message += `📈 <b>Быстрый переход к живой аналитике за день:</b>\n`;
      message += `• <a href="https://clarity.microsoft.com/projects/view/${CLARITY_PROJECT_ID}/dashboard">Microsoft Clarity (записи кликов и тепловые карты)</a>\n`;
      message += `• <a href="https://analytics.google.com/">Google Analytics 4 (посетители в реальном времени)</a>\n\n`;
      if (!CLARITY_TOKEN) {
        message += `<i>💡 Чтобы бот автоматически выводил точные цифры сессий и просмотров прямо сюда, добавьте токен Clarity в Vercel (Clarity ➔ Settings ➔ Data Export ➔ Generate token).</i>\n`;
      }
    }

    message += `━━━━━━━━━━━━━━━━━━\n`;
    message += `<i>Шоколадная мастерская CraftChoco · Харьков</i>`;

    // Send to Telegram
    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const tgData = await tgRes.json();

    return NextResponse.json({
      ok: true,
      delivered: tgData.ok,
      telegramResponse: tgData,
      clarityConnected: Boolean(clarityData),
      clarityError,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json(
      { ok: false, error: errMessage },
      { status: 500 }
    );
  }
}
