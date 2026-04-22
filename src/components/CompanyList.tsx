'use client'

import { SearchX } from 'lucide-react'
import { Company, SearchFilters } from '@/lib/types'
import { categories } from '@/data/categories'
import CompanyCard from './CompanyCard'

interface CompanyListProps {
  companies: Company[]
  filters: SearchFilters
}

function categoryLabel(id: string): string {
  return categories.find((c) => c.id === id)?.label ?? id
}

function categoryKeywords(ids: string[]): string {
  return ids
    .flatMap((id) => {
      const meta = categories.find((c) => c.id === id)
      return meta ? [meta.label, ...meta.keywords] : []
    })
    .join(' ')
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function filterCompanies(
  companies: Company[],
  filters: SearchFilters,
): Company[] {
  return companies.filter((c) => {
    if (
      filters.category !== 'tutte' &&
      !c.category.includes(filters.category)
    ) {
      return false
    }

    if (
      filters.zone &&
      filters.zone !== 'Tutta Roma' &&
      c.zone !== filters.zone
    ) {
      return false
    }

    if (filters.query.trim()) {
      const q = normalize(filters.query.trim())
      const searchable = normalize(
        [
          c.name,
          c.description,
          c.zone,
          c.tags.join(' '),
          categoryKeywords(c.category),
        ].join(' '),
      )
      if (!searchable.includes(q)) return false
    }

    return true
  })
}

export default function CompanyList({ companies, filters }: CompanyListProps) {
  const results = filterCompanies(companies, filters)

  const activeLabel = filters.query.trim()
    ? `"${filters.query.trim()}"`
    : filters.category !== 'tutte'
      ? categoryLabel(filters.category)
      : 'tutte le categorie'

  const resultCountLabel = `${results.length} ${
    results.length === 1 ? 'risultato' : 'risultati'
  }`

  return (
    <section
      id="aziende"
      aria-labelledby="aziende-title"
      className="max-w-5xl mx-auto px-6 pb-20"
    >
      <div className="flex items-baseline gap-3 mb-6">
        <h2
          id="aziende-title"
          className="text-[11px] tracking-[3px] uppercase text-zinc-400 font-sans font-normal"
        >
          Aziende
        </h2>
        <span
          className="text-xs text-zinc-400 font-sans"
          aria-live="polite"
        >
          {resultCountLabel} · {activeLabel}
        </span>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-20 border border-zinc-100 rounded-xl">
          <SearchX
            size={28}
            className="mx-auto mb-3 text-zinc-400"
            aria-hidden="true"
          />
          <p className="text-zinc-500 font-sans text-sm">
            Nessuna azienda trovata per questa ricerca.
          </p>
          <p className="text-zinc-400 font-sans text-xs mt-1">
            Prova con un termine diverso o cambia categoria.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3 list-none p-0 m-0">
          {results.map((company) => (
            <li key={company.id}>
              <CompanyCard company={company} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
