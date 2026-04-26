import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-dm-sans',
})

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-dm-serif',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://noleggiaroma.it'

export const viewport: Viewport = {
  themeColor: '#0D1117',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Noleggia Roma — Noleggio Attrezzatura Eventi',
    template: '%s · Noleggia Roma',
  },
  description:
    'Trova aziende di noleggio attrezzatura per eventi a Roma. Ledwall, audio, tensostrutture, luci, gazebo — tutte in un posto solo. Contatto diretto via WhatsApp.',
  applicationName: 'Noleggia Roma',
  keywords: [
    'noleggio attrezzatura Roma',
    'noleggio ledwall Roma',
    'noleggio audio eventi Roma',
    'noleggio tensostruttura Roma',
    'noleggio gazebo Roma',
    'attrezzatura eventi Roma',
    'noleggio impianto audio Roma',
    'noleggio luci eventi Roma',
    'noleggio matrimonio Roma',
    'fornitori eventi Roma',
  ],
  authors: [{ name: 'Noleggia Roma' }],
  creator: 'Noleggia Roma',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Noleggia Roma — Noleggio Attrezzatura Eventi',
    description:
      'Trova aziende di noleggio attrezzatura per eventi a Roma. Contatto diretto, nessun intermediario.',
    url: siteUrl,
    siteName: 'Noleggia Roma',
    type: 'website',
    locale: 'it_IT',
    images: [
    {
      url: '/og.png',
      width: 1200,
      height: 630,
      alt: 'Noleggia Roma — Noleggio attrezzatura eventi a Roma',
    },
  ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noleggia Roma — Noleggio Attrezzatura Eventi',
    description:
      'Trova aziende di noleggio attrezzatura per eventi a Roma. Contatto diretto, nessun intermediario.',
    images: ['/og.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'directory',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Noleggia Roma',
  url: siteUrl,
  inLanguage: 'it-IT',
  description:
    'Directory delle aziende di noleggio attrezzatura per eventi a Roma.',
  publisher: {
    '@type': 'Organization',
    name: 'Noleggia Roma',
    url: siteUrl,
    areaServed: {
      '@type': 'City',
      name: 'Roma',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body>
        <a href="#main" className="skip-to-content">
          Vai al contenuto
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  )
}
