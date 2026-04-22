'use client'

import { useCallback, useEffect, useState } from 'react'
import Hero from '@/components/Hero'
import CategoryGrid from '@/components/CategoryGrid'
import CompanyList from '@/components/CompanyList'
import HowItWorks from '@/components/HowItWorks'
import CtaBusiness from '@/components/CtaBusiness'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import {
  Category,
  Company,
  SearchFilters,
  parseCompanies,
} from '@/lib/types'

const defaultFilters: SearchFilters = {
  query: '',
  category: 'tutte',
  zone: 'Tutta Roma',
}

type Status = 'loading' | 'error' | 'ready'

export default function Home() {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters)
  const [companies, setCompanies] = useState<Company[]>([])
  const [status, setStatus] = useState<Status>('loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('verified', { ascending: false })
        .order('rating', { ascending: false })

      if (cancelled) return

      if (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(error)
        }
        setStatus('error')
      } else {
        setCompanies(parseCompanies(data))
        setStatus('ready')
      }
    })()

    return () => {
      cancelled = true
    }
  }, [attempt])

  const retry = useCallback(() => {
    setStatus('loading')
    setAttempt((n) => n + 1)
  }, [])

  function handleSearch(f: SearchFilters) {
    setFilters(f)
  }

  function handleCategory(cat: Category | 'tutte') {
    setFilters((prev) => ({ ...prev, category: cat }))
  }

  return (
    <main id="main">
      <Hero onSearch={handleSearch} />
      <CategoryGrid active={filters.category} onChange={handleCategory} />

      {status === 'loading' && (
        <div
          className="max-w-5xl mx-auto px-6 pb-20"
          role="status"
          aria-live="polite"
          aria-label="Caricamento aziende"
        >
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 rounded-xl bg-zinc-100 animate-pulse"
              />
            ))}
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="max-w-5xl mx-auto px-6 pb-20" role="alert">
          <div className="text-center py-16 border border-red-100 rounded-xl bg-red-50/50">
            <p className="text-sm text-red-600 font-sans mb-4">
              Errore nel caricamento delle aziende.
            </p>
            <button
              type="button"
              onClick={retry}
              className="text-xs bg-ink text-gold px-5 py-2.5 rounded-lg hover:bg-ink-soft transition-colors font-sans"
            >
              Riprova
            </button>
          </div>
        </div>
      )}

      {status === 'ready' && (
        <CompanyList companies={companies} filters={filters} />
      )}

      <HowItWorks />
      <CtaBusiness />
      <Footer />
    </main>
  )
}
