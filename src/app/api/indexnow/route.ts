import { NextResponse } from "next/server";
import sitemap from "@/app/sitemap";
import { site } from "@/lib/site";

const INDEXNOW_KEY = "6e0f826922f6400981377ffc52e370a8";

async function submitIndexNow() {
  const entries = sitemap();
  const urlList = entries.map((entry) => entry.url);
  const host = new URL(site.url).hostname;

  const payload = JSON.stringify({
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${site.url}/${INDEXNOW_KEY}.txt`,
    urlList,
  });

  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "User-Agent": "CraftChoco-IndexNow/1.0",
  };

  const [indexnowRes, bingRes] = await Promise.all([
    fetch("https://api.indexnow.org/indexnow", { method: "POST", headers, body: payload }),
    fetch("https://www.bing.com/indexnow", { method: "POST", headers, body: payload }),
  ]);

  return NextResponse.json({
    ok: indexnowRes.ok && bingRes.ok,
    count: urlList.length,
    indexnow: indexnowRes.status,
    bing: bingRes.status,
  });
}

export async function GET() {
  return submitIndexNow();
}

export async function POST() {
  return submitIndexNow();
}
