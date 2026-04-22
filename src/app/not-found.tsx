import Link from 'next/link'

export const metadata = {
  title: 'Pagina non trovata',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-white">
      <div className="max-w-md text-center">
        <p className="text-[11px] tracking-[3px] uppercase text-zinc-500 mb-4 font-sans">
          404
        </p>
        <h1 className="font-serif text-3xl text-zinc-900 mb-4">
          Pagina non trovata.
        </h1>
        <p className="text-sm text-zinc-600 font-sans mb-8">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Link
          href="/"
          className="inline-block bg-ink text-gold text-sm font-medium px-6 py-3 rounded-xl hover:bg-ink-soft transition-colors font-sans"
        >
          Torna alla home
        </Link>
      </div>
    </main>
  )
}
