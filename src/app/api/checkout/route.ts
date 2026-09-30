import { NextResponse } from "next/server";

interface OrderItem {
  id?: string;
  name: string;
  qty: number;
  price: number;
}

interface OrderRequest {
  name: string;
  phone: string;
  items: OrderItem[];
  total: number;
  locale?: string;
}

export async function POST(req: Request) {
  try {
    const data: OrderRequest = await req.json();

    const { name, phone, items, total, locale } = data;

    if (!name?.trim() || !phone?.trim() || !items?.length) {
      return NextResponse.json(
        { ok: false, error: "Invalid order data" },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN || "8946140766:AAHsVrskyjsMMLyomSNcduNpqBP5_S1FCpk";
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Форматування красивого повідомлення для Telegram
    const now = new Date().toLocaleString("uk-UA", {
      timeZone: "Europe/Kyiv",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const itemsText = items
      .map(
        (it) =>
          `• <b>${it.name}</b> × ${it.qty} = <b>${it.price * it.qty} ₴</b>`
      )
      .join("\n");

    const message = `🍫 <b>НОВЕ ЗАМОВЛЕННЯ НА САЙТІ CRAFO!</b>
━━━━━━━━━━━━━━━━━━━━
👤 <b>Клієнт:</b> ${name}
📞 <b>Телефон:</b> <a href="tel:${phone}">${phone}</a>
💬 <b>Viber:</b> <a href="viber://chat?number=${encodeURIComponent(phone.replace(/[^0-9+]/g, ""))}">Написати у Viber</a>
✈️ <b>Telegram:</b> <a href="https://t.me/${phone.replace(/[^0-9+]/g, "")}">Написати у Telegram</a>

📦 <b>Склад замовлення:</b>
${itemsText}

💰 <b>Разом до сплати:</b> <b>${total} ₴</b>
🕐 <b>Час:</b> ${now}
🌐 <b>Мова замовлення:</b> ${locale === "ru" ? "RU" : "UK"}
━━━━━━━━━━━━━━━━━━━━
🔗 <i>Сайт: crafo.com.ua</i>`;

    if (botToken && chatId) {
      const tgRes = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "HTML",
            disable_web_page_preview: true,
          }),
        }
      );

      const tgJson = await tgRes.json();
      if (!tgRes.ok || !tgJson.ok) {
        console.error("Telegram API Error:", tgJson);
      }
    } else {
      console.warn(
        "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set. Order logged:",
        { name, phone, total }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Order processing error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
