'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error)
    }
  }, [error])

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-white">
      <div className="max-w-md text-center">
        <p className="text-[11px] tracking-[3px] uppercase text-zinc-500 mb-4 font-sans">
          Qualcosa è andato storto
        </p>
        <h1 className="font-serif text-3xl text-zinc-900 mb-4">
          Si è verificato un errore.
        </h1>
        <p className="text-sm text-zinc-600 font-sans mb-8">
          Riprova tra un momento. Se il problema persiste, scrivici a{' '}
          <a
            href="mailto:ciao@noleggiaroma.it"
            className="underline hover:text-zinc-900"
          >
            ciao@noleggiaroma.it
          </a>
          .
        </p>
        <button
          type="button"
          onClick={reset}
          className="bg-ink text-gold text-sm font-medium px-6 py-3 rounded-xl hover:bg-ink-soft transition-colors font-sans"
        >
          Riprova
        </button>
      </div>
    </main>
  )
}
