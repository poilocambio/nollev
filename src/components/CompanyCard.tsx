import Link from 'next/link'
import { MapPin, Star } from 'lucide-react'
import { Company } from '@/lib/types'
import { categories } from '@/data/categories'

interface CompanyCardProps {
  company: Company
}

const WhatsAppIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.123 1.524 5.855L0 24l6.336-1.504A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.802 9.802 0 01-5.014-1.377l-.36-.214-3.727.979.994-3.63-.235-.375A9.807 9.807 0 012.18 12C2.18 6.58 6.58 2.18 12 2.18S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
  </svg>
)

export default function CompanyCard({ company }: CompanyCardProps) {
  const cat = categories.find((c) => c.id === company.category[0])
  const initials = company.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const waLink = company.whatsapp
    ? `https://wa.me/${company.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
        `Ciao, ho trovato ${company.name} su Noleggia Roma e vorrei sapere la disponibilità per un evento.`,
      )}`
    : null

  return (
    <article
      aria-labelledby={`company-${company.id}-name`}
      className="relative flex items-center gap-5 p-5 md:p-6 rounded-xl border border-zinc-200 hover:border-zinc-300 bg-white transition-all duration-200 group has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ink"
    >
      <div
        aria-hidden="true"
        className="w-12 h-12 rounded-xl bg-ink flex items-center justify-center font-serif text-gold text-lg shrink-0"
      >
        {initials}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3
            id={`company-${company.id}-name`}
            className="text-sm font-medium text-zinc-900 font-sans truncate"
          >
            <Link
              href={`/azienda/${company.slug}`}
              className="outline-none after:absolute after:inset-0 after:content-[''] after:rounded-xl group-hover:text-ink-soft transition-colors"
            >
              {company.name}
            </Link>
          </h3>
          {company.verified && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 font-sans shrink-0">
              Verificata
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-zinc-500 font-sans">
          <span className="flex items-center gap-1">
            <MapPin size={11} aria-hidden="true" />
            <span className="sr-only">Zona: </span>
            Roma {company.zone}
          </span>
          {company.price_from ? (
            <span>
              da {company.price_from}€
              {company.price_unit ? `/${company.price_unit}` : ''}
            </span>
          ) : (
            <span>Prezzi su richiesta</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {cat && (
          <span className="hidden md:inline-flex text-[11px] px-2.5 py-1 rounded-full bg-ink text-gold font-sans">
            <span aria-hidden="true" className="mr-1">
              {cat.icon}
            </span>
            {cat.label}
          </span>
        )}

        {company.rating && (
          <span
            className="hidden md:inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 font-sans"
            aria-label={`Valutazione ${company.rating} su 5`}
          >
            <Star size={10} fill="currentColor" aria-hidden="true" />
            {company.rating}
          </span>
        )}

        {waLink && (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Contatta ${company.name} su WhatsApp`}
            className="relative z-10 flex items-center gap-1.5 bg-whatsapp text-white text-xs font-medium px-3 py-2 rounded-lg hover:bg-whatsapp-hover transition-colors duration-200 font-sans focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
          >
            <WhatsAppIcon />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        )}
      </div>
    </article>
  )
}
