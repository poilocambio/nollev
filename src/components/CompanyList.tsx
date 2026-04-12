'use client'

import { Company, Category, SearchFilters } from '@/lib/types'
import CompanyCard from './CompanyCard'

interface CompanyListProps {
  companies: Company[]
  filters: SearchFilters
}

function filterCompanies(companies: Company[], filters: SearchFilters): Company[] {
  return companies.filter((c) => {
    // Category filter
    if (filters.category !== 'tutte' && !c.category.includes(filters.category)) return false

    // Zone filter
    if (filters.zone && filters.zone !== 'Tutta Roma' && c.zone !== filters.zone) return false

    // Text query
    if (filters.query) {
      const q = filters.query.toLowerCase()
      const searchable = [c.name, c.description, ...c.tags, c.zone].join(' ').toLowerCase()
      if (!searchable.includes(q)) return false
    }

    return true
  })
}

export default function CompanyList({ companies, filters }: CompanyListProps) {
  const results = filterCompanies(companies, filters)

  const activeLabel =
    filters.query
      ? `"${filters.query}"`
      : filters.category !== 'tutte'
      ? filters.category
      : 'tutte le categorie'

  return (
    <section id="aziende" className="max-w-5xl mx-auto px-6 pb-20">
      <div className="flex items-baseline gap-3 mb-6">
        <p className="text-[11px] tracking-[3px] uppercase text-zinc-400 font-sans">
          Aziende
        </p>
        <span className="text-xs text-zinc-400 font-sans">
          {results.length} risultati · {activeLabel}
        </span>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-20 border border-zinc-100 rounded-xl">
          <p className="text-3xl mb-3">🔍</p>
          <p className="text-zinc-500 font-sans text-sm">
            Nessuna azienda trovata per questa ricerca.
          </p>
          <p className="text-zinc-400 font-sans text-xs mt-1">
            Prova con un termine diverso o cambia categoria.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {results.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </section>
  )
}