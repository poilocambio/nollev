import Link from 'next/link'

export const metadata = {
  title: 'Azienda non trovata',
  robots: { index: false, follow: false },
}

export default function CompanyNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-white">
      <div className="max-w-md text-center">
        <p className="text-[11px] tracking-[3px] uppercase text-zinc-500 mb-4 font-sans">
          Azienda non trovata
        </p>
        <h1 className="font-serif text-3xl text-zinc-900 mb-4">
          Questa scheda non esiste più.
        </h1>
        <p className="text-sm text-zinc-600 font-sans mb-8">
          L&apos;azienda potrebbe essere stata rimossa oppure lo slug è errato.
          Torna all&apos;elenco per trovare un&apos;altra azienda.
        </p>
        <Link
          href="/#aziende"
          className="inline-block bg-ink text-gold text-sm font-medium px-6 py-3 rounded-xl hover:bg-ink-soft transition-colors font-sans"
        >
          Vedi tutte le aziende
        </Link>
      </div>
    </main>
  )
}
