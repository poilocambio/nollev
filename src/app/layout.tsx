import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nollev — Noleggio Attrezzatura Eventi Roma',
  description:
    'Trova aziende di noleggio attrezzatura per eventi a Roma. Ledwall, audio, tensostrutture, luci, gazebo — tutte in un posto solo. Contatto diretto via WhatsApp.',
  keywords: [
    'noleggio ledwall Roma',
    'noleggio audio eventi Roma',
    'noleggio tensostruttura Roma',
    'noleggio gazebo Roma',
    'attrezzatura eventi Roma',
    'noleggio impianto audio Roma',
    'noleggio luci eventi Roma',
  ],
  openGraph: {
    title: 'Nollev — Noleggio Attrezzatura Eventi Roma',
    description:
      'Trova aziende di noleggio attrezzatura per eventi a Roma. Contatto diretto, nessun intermediario.',
    type: 'website',
    locale: 'it_IT',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}