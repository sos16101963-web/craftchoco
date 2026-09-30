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
  source?: string;
}

const cityNames: Record<string, string> = {
  Kharkiv: "Харків",
  Kyiv: "Київ",
  Dnipro: "Дніпро",
  Odesa: "Одеса",
  Lviv: "Львів",
  Zaporizhzhia: "Запоріжжя",
  Poltava: "Полтава",
  Sumy: "Суми",
  Chernihiv: "Чернігів",
  Cherkasy: "Черкаси",
  Vinnytsia: "Вінниця",
  Zhytomyr: "Житомир",
  Rivne: "Рівне",
  Khmelnytskyi: "Хмельницький",
  Chernivtsi: "Чернівці",
  Ternopil: "Тернопіль",
  IvanoFrankivsk: "Івано-Франківськ",
  Uzhhorod: "Ужгород",
  Lutsk: "Луцьк",
  Mykolaiv: "Миколаїв",
  Kropyvnytskyi: "Кропивницький",
  KryvyiRih: "Кривий Ріг",
  Kremenchuk: "Кременчук",
};

export async function POST(req: Request) {
  try {
    const data: OrderRequest = await req.json();

    const { name, phone, items, total, locale, source } = data;

    if (!name?.trim() || !phone?.trim() || !items?.length) {
      return NextResponse.json(
        { ok: false, error: "Invalid order data" },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN || "8946140766:AAHsVrskyjsMMLyomSNcduNpqBP5_S1FCpk";
    const chatId = process.env.TELEGRAM_CHAT_ID || "1149100939";

    // Визначення геолокації та пристрою
    const rawCity = req.headers.get("x-vercel-ip-city");
    const cityDecoded = rawCity ? decodeURIComponent(rawCity) : "";
    const displayCity = cityNames[cityDecoded] || cityDecoded || "Україна";

    const ua = req.headers.get("user-agent") || "";
    let device = "💻 Комп'ютер / Ноутбук";
    if (/iphone|ipad|ipod/i.test(ua)) {
      device = "📱 iPhone (iOS)";
    } else if (/android/i.test(ua)) {
      device = "📱 Android";
    } else if (/mobile/i.test(ua)) {
      device = "📱 Мобільний телефон";
    }

    const trafficSource = source?.trim() || "Прямий перехід на сайт";

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

📍 <b>Звідки прийшов:</b> ${trafficSource}
🏙️ <b>Місто:</b> ${displayCity}
📱 <b>Пристрій:</b> ${device}

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
        return NextResponse.json({ ok: false, error: tgJson });
      }
      return NextResponse.json({ ok: true, sent: true, message_id: tgJson.result?.message_id });
    } else {
      console.warn(
        "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set. Order logged:",
        { name, phone, total }
      );
      return NextResponse.json({ ok: false, error: "Credentials missing", botTokenSet: Boolean(botToken), chatIdSet: Boolean(chatId) });
    }
  } catch (error) {
    console.error("Order processing error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
