"use client";

import { useState } from "react";
import { Clock, MapPin, MessageCircle, Phone, PhoneCall, Send, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { site } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { toast } from "sonner";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const messengerIcons = {
  Viber: MessageCircle,
  WhatsApp: Phone,
  Telegram: Send,
} as const;

const messengerColors: Record<string, string> = {
  Viber: "text-[#a78bfa] group-hover:bg-[#6f5df1] group-hover:text-white",
  WhatsApp: "text-[#4ade80] group-hover:bg-[#118159] group-hover:text-white",
  Telegram: "text-[#60a5fa] group-hover:bg-[#197cae] group-hover:text-white",
};

export function ContactCta({ locale }: { locale: Locale }) {
  const t = getDict(locale).contacts;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error(t.errFields);
      return;
    }
    if (!/^[+0-9\s()\-]{10,18}$/.test(phone.trim())) {
      toast.error(t.errPhone);
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setName("");
      setPhone("");
      toast.success(t.success, { description: t.successText(name.trim()) });
    }, 900);
  };

  return (
    <section id="contacts" className="scroll-mt-20 bg-cream py-20 lg:py-28" aria-label={t.aria}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-choco-950 text-cream shadow-2xl">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="texture-cocoa p-8 sm:p-12 lg:p-14">
              <p className="divider-gold text-[13px] font-semibold uppercase tracking-[0.3em] text-gold-400">
                {t.kicker}
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
                {t.h2a} <span className="gold-text">{t.h2b}</span>
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-cream/75">
                {t.sub}
              </p>

              <address className="mt-9 grid gap-4 not-italic">
                {site.messengers.map((m) => {
                  const Icon = messengerIcons[m.name as keyof typeof messengerIcons];
                  return (
                    <a
                      key={m.name}
                      href={m.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("contact_click", { channel: m.name })}
                      className="group flex items-center gap-4"
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] transition-colors ${
                          messengerColors[m.name]
                        }`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm text-cream/60">{m.name}</span>
                        <span className="font-bold text-cream group-hover:text-gold-300">{m.hint}</span>
                      </span>
                    </a>
                  );
                })}
                <a
                  href={site.phoneHref}
                  onClick={() => trackEvent("contact_click", { channel: "phone" })}
                  className="group flex items-center gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-choco-950">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm text-cream/60">{t.call}</span>
                    <span className="font-bold text-cream group-hover:text-gold-300">{site.phoneShort}</span>
                  </span>
                </a>
                <a
                  href={site.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("contact_click", { channel: "youtube" })}
                  className="group flex items-center gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-[#f87171] transition-colors group-hover:bg-[#ff0000] group-hover:text-white">
                    <Youtube className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm text-cream/60">YouTube</span>
                    <span className="font-bold text-cream group-hover:text-gold-300">@craft.choco.kharkiv</span>
                  </span>
                </a>
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-gold-400">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm text-cream/60">{t.where}</span>
                    <span className="font-bold text-cream">{t.whereValue}</span>
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-gold-400">
                    <Clock className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm text-cream/60">{t.online}</span>
                    <span className="font-bold text-cream">{t.onlineValue}</span>
                  </span>
                </div>
              </address>
            </div>

            <div className="flex items-center border-t border-white/10 bg-white/[0.03] p-8 sm:p-12 lg:border-l lg:border-t-0">
              <form onSubmit={handleSubmit} className="w-full" aria-label={t.formTitle}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-400">
                  <PhoneCall className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-3xl font-bold">{t.formTitle}</h3>
                <p className="mt-2.5 leading-relaxed text-cream/70">
                  {t.formText}
                </p>
                <div className="mt-7 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="callback-name" className="text-cream/85">
                      {t.yourName}
                    </Label>
                    <Input
                      id="callback-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.namePlaceholder}
                      maxLength={50}
                      className="h-12 rounded-xl border-white/15 bg-white/[0.06] text-cream placeholder:text-cream/40 focus-visible:ring-gold-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="callback-phone" className="text-cream/85">
                      {t.phone}
                    </Label>
                    <Input
                      id="callback-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+380 (__) ___-__-__"
                      maxLength={18}
                      className="h-12 rounded-xl border-white/15 bg-white/[0.06] text-cream placeholder:text-cream/40 focus-visible:ring-gold-500"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={sending}
                    className="h-13 w-full rounded-full bg-gold-500 py-3.5 text-base font-bold text-choco-950 transition-colors hover:bg-gold-400 disabled:opacity-60"
                  >
                    {sending ? t.sending : t.submit}
                  </Button>
                  <p className="text-center text-xs leading-relaxed text-cream/50">
                    {t.privacy}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
