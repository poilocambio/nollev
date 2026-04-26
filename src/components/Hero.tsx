'use client'

import { useId, useState } from 'react'
import { Search } from 'lucide-react'
import { Category, SearchFilters } from '@/lib/types'
import { zones } from '@/data/companies'

const quickTags: { label: string; category: Category }[] = [
  { label: 'Ledwall', category: 'visual' },
  { label: 'Impianto audio', category: 'audio' },
  { label: 'Tensostruttura', category: 'strutture' },
  { label: 'Luci scenografiche', category: 'illuminazione' },
  { label: 'Gazebo', category: 'strutture' },
  { label: 'Palco', category: 'strutture' },
]

interface HeroProps {
  onSearch: (filters: SearchFilters) => void
  companyCount?: number
}

export default function Hero({ onSearch, companyCount }: HeroProps) {
  const queryId = useId()
  const zoneId = useId()
  const [query, setQuery] = useState('')
  const [zone, setZone] = useState('Tutta Roma')

  function scrollToResults() {
    document.getElementById('aziende')?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSearch({ query, category: 'tutte', zone })
    scrollToResults()
  }

  function handleTag(category: Category, label: string) {
    setQuery(label)
    onSearch({ query: label, category, zone })
    scrollToResults()
  }

  return (
    <section
      aria-label="Ricerca aziende di noleggio"
      className="relative bg-ink overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(ellipse, #E8D5A3 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 pt-8 pb-16">
        <nav
          aria-label="Navigazione principale"
          className="flex items-center justify-between mb-16"
        >
          <div className="font-serif text-xl text-white tracking-tight">
            Noleggia <span className="text-gold">Roma</span>
          </div>
          <a
            href="#aziende-cta"
            className="text-xs text-white/70 border border-white/15 px-4 py-2 rounded-full hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            Sei un&apos;azienda? →
          </a>
        </nav>

        <p className="text-[11px] tracking-[3px] uppercase text-gold mb-5 font-sans">
          Roma · Noleggio Attrezzatura Eventi
        </p>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] text-white mb-6 max-w-[580px] leading-[1.08]">
          Trova chi noleggia{' '}
          <em className="text-gold italic">quello che ti serve</em>, per la
          data che hai.
        </h1>

        <p className="text-white/70 text-[15px] leading-relaxed mb-10 max-w-[440px] font-sans font-light">
          Ledwall, audio, tensostrutture, luci — tutte le aziende di noleggio
          eventi di Roma in un posto solo.
        </p>

        <form
          onSubmit={handleSubmit}
          role="search"
          aria-label="Cerca attrezzatura"
          className="flex items-center gap-3 bg-white rounded-[14px] p-[6px] pl-5 max-w-[600px] shadow-[0_0_0_1px_rgba(255,255,255,0.1)] focus-within:shadow-[0_0_0_2px_#E8D5A3]"
        >
          <label htmlFor={queryId} className="sr-only">
            Cerca attrezzatura
          </label>
          <Search
            size={16}
            className="text-zinc-400 shrink-0"
            aria-hidden="true"
          />
          <input
            id={queryId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca per attrezzatura…"
            autoComplete="off"
            className="flex-1 bg-transparent text-sm text-zinc-800 placeholder:text-zinc-400 outline-none font-sans min-w-0"
          />
          <div className="w-px h-6 bg-zinc-200 shrink-0" aria-hidden="true" />
          <label htmlFor={zoneId} className="sr-only">
            Zona di Roma
          </label>
          <select
            id={zoneId}
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="text-sm text-zinc-600 bg-transparent outline-none cursor-pointer font-sans pr-1 shrink-0"
          >
            {zones.map((z) => (
              <option key={z}>{z}</option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-ink text-gold text-sm font-medium px-5 py-3 rounded-[10px] whitespace-nowrap hover:bg-ink-soft transition-colors duration-200 shrink-0 font-sans focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Cerca
          </button>
        </form>

        <div
          className="flex flex-wrap gap-2 mt-4"
          role="list"
          aria-label="Ricerche frequenti"
        >
          {quickTags.map((tag) => (
            <button
              key={tag.label}
              type="button"
              role="listitem"
              onClick={() => handleTag(tag.category, tag.label)}
              className="text-xs text-white/70 border border-white/15 px-3 py-[5px] rounded-full hover:border-gold hover:text-gold transition-all duration-200 font-sans focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {tag.label}
            </button>
          ))}
        </div>

        <dl className="flex gap-10 mt-14 pt-10 border-t border-white/[0.08]">
          {[
            {
              n: companyCount != null ? `${companyCount}` : '…',
              l: 'Aziende verificate',
            },
            { n: '6', l: 'Categorie' },
            { n: 'Roma', l: 'Zona di lancio' },
          ].map((s) => (
            <div key={s.l}>
              <dt className="sr-only">{s.l}</dt>
              <dd className="font-serif text-3xl text-white">{s.n}</dd>
              <dd
                className="text-xs text-white/60 mt-1 font-sans"
                aria-hidden="true"
              >
                {s.l}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
