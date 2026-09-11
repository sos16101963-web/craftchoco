import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['cyrillic', 'latin'], 
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800']
})

const montserrat = Montserrat({ 
  subsets: ['cyrillic', 'latin'], 
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600']
})

export const metadata: Metadata = {
  title: 'Craft Choco Kharkiv | Элитный бельгийский шоколад ручной работы',
  description: 'Премиальные изделия из 100% бельгийского шоколада Callebaut в Харькове. Мы не продаем конфеты, мы создаем орудие для выражения ваших самых глубоких эмоций: любви, благодарности, извинений. Уникальный дизайн, элитная упаковка, индивидуальный подход.',
  keywords: 'элитный шоколад Харьков, премиум шоколад ручной работы, шоколад Callebaut на заказ, крафтовые конфеты, корпоративные VIP подарки, шоколадные наборы премиум, дорогие подарки Харьков, подарок девушке, шоколад с эмоциями',
  openGraph: {
    title: 'Craft Choco Kharkiv | Искусство выражать чувства',
    description: 'Когда обычных слов недостаточно. Эксклюзивные шоколадные наборы ручной работы в Харькове из настоящего шоколада Callebaut.',
    url: 'https://craft-choco-kharkiv.vercel.app',
    siteName: 'Craft Choco Kharkiv',
    locale: 'ru_UA',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${playfair.variable} ${montserrat.variable} font-sans bg-[#0F0B0A] text-[#EBE3D5] antialiased`}>
        {children}
      </body>
    </html>
  )
}
