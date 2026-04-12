'use client'

import { useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import CategoryGrid from '@/components/CategoryGrid'
import CompanyList from '@/components/CompanyList'
import HowItWorks from '@/components/HowItWorks'
import CtaBusiness from '@/components/CtaBusiness'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import { Company, Category, SearchFilters } from '@/lib/types'

const defaultFilters: SearchFilters = {
  query: '',
  category: 'tutte',
  zone: 'Tutta Roma',
}

export default function Home() {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters)
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCompanies() {
      setLoading(true)
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('verified', { ascending: false })
        .order('rating', { ascending: false })

      if (error) {
        setError('Errore nel caricamento delle aziende.')
        console.error(error)
      } else {
        setCompanies(data as Company[])
      }
      setLoading(false)
    }

    fetchCompanies()
  }, [])

  function handleSearch(f: SearchFilters) {
    setFilters(f)
  }

  function handleCategory(cat: Category | 'tutte') {
    setFilters((prev) => ({ ...prev, category: cat }))
  }

  return (
    <main>
      <Hero onSearch={handleSearch} />
      <CategoryGrid active={filters.category} onChange={handleCategory} />

      {loading && (
        <div className="max-w-5xl mx-auto px-6 pb-20">
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

      {error && (
        <div className="max-w-5xl mx-auto px-6 pb-20">
          <p className="text-sm text-red-500 font-sans">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <CompanyList companies={companies} filters={filters} />
      )}

      <HowItWorks />
      <CtaBusiness />
      <Footer />
    </main>
  )
}