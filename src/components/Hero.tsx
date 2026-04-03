'use client'

import { useState } from 'react'
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
}

export default function Hero({ onSearch }: HeroProps) {
  const [query, setQuery] = useState('')
  const [zone, setZone] = useState('Tutta Roma')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSearch({ query, category: 'tutte', zone })
    // scroll to results
    document.getElementById('aziende')?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleTag(category: Category, label: string) {
    setQuery(label)
    onSearch({ query: label, category, zone })
    document.getElementById('aziende')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative bg-[#0D1117] overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(ellipse, #E8D5A3 0%, transparent 70%)' }}
      />

      <div className="relative max-w-5xl mx-auto px-6 pt-8 pb-16">
        {/* Nav */}
        <nav className="flex items-center justify-between mb-16">
          <div className="font-serif text-xl text-white tracking-tight">
            Nol<span className="text-[#E8D5A3]">lev</span>
          </div>
          <a
            href="#aziende-cta"
            className="text-xs text-white/50 border border-white/15 px-4 py-2 rounded-full hover:bg-white/8 hover:text-white/90 transition-all duration-200"
          >
            Sei un&apos;azienda? →
          </a>
        </nav>

        {/* Eyebrow */}
        <p className="text-[11px] tracking-[3px] uppercase text-[#E8D5A3] mb-5 font-sans">
          Roma · Noleggio Attrezzatura Eventi
        </p>

        {/* Headline */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] text-white mb-6 max-w-[580px] leading-[1.08]">
          Trova chi noleggia{' '}
          <em className="text-[#E8D5A3] italic">quello che ti serve</em>,
          per la data che hai.
        </h1>

        <p className="text-white/50 text-[15px] leading-relaxed mb-10 max-w-[440px] font-sans font-light">
          Ledwall, audio, tensostrutture, luci — tutte le aziende di noleggio eventi
          di Roma in un posto solo.
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 bg-white rounded-[14px] p-[6px] pl-5 max-w-[600px] shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
        >
          <Search size={16} className="text-zinc-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca per attrezzatura…"
            className="flex-1 bg-transparent text-sm text-zinc-800 placeholder:text-zinc-400 outline-none font-sans min-w-0"
          />
          <div className="w-px h-6 bg-zinc-200 shrink-0" />
          <select
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="text-sm text-zinc-500 bg-transparent outline-none cursor-pointer font-sans pr-1 shrink-0"
          >
            {zones.map((z) => (
              <option key={z}>{z}</option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-[#0D1117] text-[#E8D5A3] text-sm font-medium px-5 py-3 rounded-[10px] whitespace-nowrap hover:bg-[#1a2332] transition-colors duration-200 shrink-0 font-sans"
          >
            Cerca
          </button>
        </form>

        {/* Quick tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {quickTags.map((tag) => (
            <button
              key={tag.label}
              onClick={() => handleTag(tag.category, tag.label)}
              className="text-xs text-white/50 border border-white/15 px-3 py-[5px] rounded-full hover:border-[#E8D5A3] hover:text-[#E8D5A3] transition-all duration-200 font-sans"
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex gap-10 mt-14 pt-10 border-t border-white/[0.08]">
          {[
            { n: '13+', l: 'Aziende verificate' },
            { n: '6', l: 'Categorie' },
            { n: 'Roma', l: 'Zona di lancio' },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-serif text-3xl text-white">{s.n}</div>
              <div className="text-xs text-white/40 mt-1 font-sans">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}