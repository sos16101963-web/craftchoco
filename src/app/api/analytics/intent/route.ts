import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8946140766:AAHsVrskyjsMMLyomSNcduNpqBP5_S1FCpk";
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || "1149100939";

interface IntentData {
  channel: "viber" | "telegram" | "phone";
  productName?: string;
  price?: number;
  source?: string;
}

export async function POST(req: Request) {
  try {
    const data: IntentData = await req.json();
    const { channel, productName, price, source } = data;

    const channelEmoji =
      channel === "viber" ? "🟣 Viber" : channel === "telegram" ? "🔵 Telegram" : "📞 Звонок";

    const lines = [
      `⚡ <b>Клиент нажал «Быстрый заказ»!</b>`,
      `━━━━━━━━━━━━━━━━━━`,
      `💬 <b>Канал:</b> ${channelEmoji}`,
      productName ? `🍫 <b>Набор:</b> «${productName}»` : null,
      price ? `💰 <b>Цена:</b> ${price} ₴` : null,
      source ? `🌐 <b>Источник:</b> ${source}` : null,
      `⏰ <i>Клиент переходит в мессенджер для связи с мастером</i>`,
    ].filter(Boolean);

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: lines.join("\n"),
        parse_mode: "HTML",
      }),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
