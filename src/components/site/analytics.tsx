import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-KN1ZWRMSWZ";
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? "yr31dmrb43";

/**
 * Счётчики аналитики: Google Analytics 4 и Facebook Pixel.
 * Подключаются автоматически, когда заданы переменные окружения
 * NEXT_PUBLIC_GA_ID (вида G-XXXXXXXXXX) и NEXT_PUBLIC_FB_PIXEL_ID.
 * Без них компонент не рендерит ничего — сайт остаётся чистым.
 */
export function Analytics() {
  return (
    <>
      {GA_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { currency: 'UAH' });
            `}
          </Script>
        </>
      ) : null}

      {FB_PIXEL_ID ? (
        <>
          <Script id="fb-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      ) : null}

      <Script id="crafo-traffic-tracker" strategy="afterInteractive">
        {`
          try {
            if (!sessionStorage.getItem('crafo_traffic_source')) {
              var ref = document.referrer || '';
              var params = new URLSearchParams(window.location.search);
              var utm = (params.get('utm_source') || '').toLowerCase();
              var lowerRef = ref.toLowerCase();
              var source = 'Прямий перехід на сайт';
              if (lowerRef.indexOf('youtube.com') !== -1 || lowerRef.indexOf('youtu.be') !== -1 || utm.indexOf('youtube') !== -1) {
                source = 'YouTube';
              } else if (lowerRef.indexOf('tiktok.com') !== -1 || utm.indexOf('tiktok') !== -1) {
                source = 'TikTok';
              } else if (lowerRef.indexOf('instagram.com') !== -1 || utm.indexOf('instagram') !== -1) {
                source = 'Instagram';
              } else if (lowerRef.indexOf('facebook.com') !== -1 || lowerRef.indexOf('fb.com') !== -1 || utm.indexOf('facebook') !== -1 || params.has('fbclid')) {
                source = 'Facebook';
              } else if (lowerRef.indexOf('google.') !== -1 || utm.indexOf('google') !== -1) {
                source = 'Google (Пошук)';
              } else if (lowerRef.indexOf('t.me') !== -1 || lowerRef.indexOf('telegram') !== -1 || utm.indexOf('telegram') !== -1) {
                source = 'Telegram';
              } else if (lowerRef && lowerRef.indexOf(window.location.hostname) === -1) {
                try {
                  source = new URL(ref).hostname;
                } catch(e) {
                  source = ref;
                }
              }
              sessionStorage.setItem('crafo_traffic_source', JSON.stringify({ source: source, referrer: ref }));
            }
          } catch(e) {}
        `}
      </Script>

      {CLARITY_ID ? (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      ) : null}
    </>
  );
}
