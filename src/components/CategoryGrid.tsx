'use client'

import { cn } from '@/lib/utils'
import { Category } from '@/lib/types'
import { categories } from '@/data/categories'

interface CategoryGridProps {
  active: Category | 'tutte'
  onChange: (cat: Category | 'tutte') => void
}

export default function CategoryGrid({ active, onChange }: CategoryGridProps) {
  return (
    <section
      aria-labelledby="categorie-title"
      className="max-w-5xl mx-auto px-6 py-16"
    >
      <p className="text-[11px] tracking-[3px] uppercase text-zinc-500 mb-2 font-sans">
        Categorie
      </p>
      <h2 id="categorie-title" className="font-serif text-[30px] text-zinc-900 mb-8">
        Di cosa hai bisogno?
      </h2>

      <div
        className="flex flex-wrap gap-2 mb-6"
        role="tablist"
        aria-label="Filtra per categoria"
      >
        <button
          type="button"
          role="tab"
          aria-selected={active === 'tutte'}
          onClick={() => onChange('tutte')}
          className={cn(
            'text-xs px-4 py-2 rounded-full border transition-all duration-200 font-sans focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
            active === 'tutte'
              ? 'bg-ink text-gold border-ink'
              : 'border-zinc-300 text-zinc-600 hover:border-zinc-500',
          )}
        >
          Tutte le categorie
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={active === cat.id}
            onClick={() => onChange(cat.id)}
            className={cn(
              'text-xs px-4 py-2 rounded-full border transition-all duration-200 font-sans focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
              active === cat.id
                ? 'bg-ink text-gold border-ink'
                : 'border-zinc-300 text-zinc-600 hover:border-zinc-500',
            )}
          >
            <span aria-hidden="true" className="mr-1">
              {cat.icon}
            </span>
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            aria-pressed={active === cat.id}
            aria-label={`Filtra per ${cat.label}`}
            onClick={() => onChange(cat.id)}
            className={cn(
              'text-left p-5 rounded-xl border transition-all duration-200 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
              active === cat.id
                ? 'border-ink bg-ink'
                : 'border-zinc-200 hover:border-zinc-400 bg-white',
            )}
          >
            <div className="text-xl mb-3" aria-hidden="true">
              {cat.icon}
            </div>
            <div
              className={cn(
                'text-sm font-medium mb-1 font-sans transition-colors',
                active === cat.id ? 'text-gold' : 'text-zinc-800',
              )}
            >
              {cat.label}
            </div>
            <div
              className={cn(
                'text-xs font-sans transition-colors',
                active === cat.id ? 'text-white/60' : 'text-zinc-500',
              )}
            >
              {cat.description}
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
