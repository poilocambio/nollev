import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Globe,
  Mail,
  MapPin,
  Phone,
  Star,
} from 'lucide-react'
import Footer from '@/components/Footer'
import { categories } from '@/data/categories'
import { supabase } from '@/lib/supabase'
import {
  Company,
  parseCompanies,
  parseCompany,
} from '@/lib/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://noleggiaroma.it'

async function getCompany(slug: string): Promise<Company | null> {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error || !data) return null
  return parseCompany(data)
}

async function getRelated(
  category: string,
  excludeSlug: string,
): Promise<Company[]> {
  const { data } = await supabase
    .from('companies')
    .select('*')
    .contains('category', [category])
    .neq('slug', excludeSlug)
    .limit(3)

  return parseCompanies(data)
}

export async function generateStaticParams() {
  const { data, error } = await supabase
    .from('companies')
    .select('slug')

  if (error || !data) return []

  return data
    .filter((row): row is { slug: string } => typeof row.slug === 'string')
    .map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const company = await getCompany(slug)

  if (!company) {
    return {
      title: 'Azienda non trovata',
      robots: { index: false, follow: false },
    }
  }

  const cat = categories.find((c) => c.id === company.category[0])
  const categoryLabel = cat?.label ?? 'noleggio attrezzatura eventi'
  const description = `${company.name} — ${categoryLabel} a Roma ${company.zone}. ${company.description}`.slice(
    0,
    160,
  )

  return {
    title: `${company.name} — ${categoryLabel} Roma`,
    description,
    alternates: {
      canonical: `/azienda/${company.slug}`,
    },
    openGraph: {
      title: `${company.name} · Noleggia Roma`,
      description,
      url: `${siteUrl}/azienda/${company.slug}`,
      type: 'website',
      locale: 'it_IT',
      siteName: 'Noleggia Roma',
      images: company.image_url ? [{ url: company.image_url }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${company.name} · Noleggia Roma`,
      description,
    },
  }
}

function buildWhatsAppLink(whatsapp: string, companyName: string) {
  if (!whatsapp) return null
  const number = whatsapp.replace(/\D/g, '')
  if (!number) return null
  const text = encodeURIComponent(
    `Ciao, ho trovato ${companyName} su Noleggia Roma e vorrei sapere la disponibilità per un evento.`,
  )
  return `https://wa.me/${number}?text=${text}`
}

function buildJsonLd(company: Company) {
  const cat = categories.find((c) => c.id === company.category[0])
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/azienda/${company.slug}`,
    name: company.name,
    description: company.description,
    url: `${siteUrl}/azienda/${company.slug}`,
    telephone: company.phone || undefined,
    email: company.email || undefined,
    image: company.image_url || undefined,
    priceRange: company.price_from ? `da €${company.price_from}` : undefined,
    areaServed: {
      '@type': 'City',
      name: 'Roma',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: `Roma ${company.zone}`.trim(),
      addressRegion: 'RM',
      addressCountry: 'IT',
    },
    aggregateRating:
      company.rating && company.review_count
        ? {
            '@type': 'AggregateRating',
            ratingValue: company.rating,
            reviewCount: company.review_count,
          }
        : undefined,
    category: cat?.label,
    sameAs: company.website ? [company.website] : undefined,
  }
}

export default async function CompanyPage({ params }: PageProps) {
  const { slug } = await params
  const company = await getCompany(slug)

  if (!company) notFound()

  const cat = categories.find((c) => c.id === company.category[0])
  const related = await getRelated(company.category[0], company.slug)
  const initials = company.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  const waLink = buildWhatsAppLink(company.whatsapp, company.name)
  const jsonLd = buildJsonLd(company)

  return (
    <main id="main">
      <section className="relative bg-ink overflow-hidden">
        <div className="absolute inset-0 grid-pattern" aria-hidden="true" />

        <div className="relative max-w-4xl mx-auto px-6 pt-8 pb-16">
          <nav
            aria-label="Percorso di navigazione"
            className="flex items-center gap-2 mb-10 text-xs text-white/60 font-sans"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-gold transition-colors"
            >
              <ArrowLeft size={12} aria-hidden="true" />
              Noleggia Roma
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/#aziende"
              className="hover:text-gold transition-colors"
            >
              Aziende
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/80 truncate">{company.name}</span>
          </nav>

          <div className="flex items-start gap-5 mb-8">
            <div
              aria-hidden="true"
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center font-serif text-gold text-2xl md:text-3xl shrink-0"
            >
              {initials}
            </div>

            <div className="flex-1 min-w-0">
              {cat && (
                <p className="text-[11px] tracking-[3px] uppercase text-gold mb-2 font-sans">
                  <span aria-hidden="true" className="mr-1">
                    {cat.icon}
                  </span>
                  {cat.label}
                </p>
              )}
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-3">
                {company.name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70 font-sans">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} aria-hidden="true" />
                  Roma {company.zone}
                </span>
                {company.rating && (
                  <span
                    className="flex items-center gap-1.5"
                    aria-label={`Valutazione ${company.rating} su 5${
                      company.review_count
                        ? ` basata su ${company.review_count} recensioni`
                        : ''
                    }`}
                  >
                    <Star
                      size={12}
                      fill="currentColor"
                      className="text-gold"
                      aria-hidden="true"
                    />
                    {company.rating}
                    {company.review_count && (
                      <span className="text-white/50">
                        ({company.review_count})
                      </span>
                    )}
                  </span>
                )}
                {company.verified && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/80 font-sans">
                    Verificata
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {waLink && (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Contatta ${company.name} su WhatsApp`}
                className="inline-flex items-center gap-2 bg-whatsapp text-white text-sm font-medium px-5 py-3 rounded-xl hover:bg-whatsapp-hover transition-colors font-sans focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.123 1.524 5.855L0 24l6.336-1.504A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.802 9.802 0 01-5.014-1.377l-.36-.214-3.727.979.994-3.63-.235-.375A9.807 9.807 0 012.18 12C2.18 6.58 6.58 2.18 12 2.18S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
                </svg>
                Contatta su WhatsApp
              </a>
            )}
            {company.phone && (
              <a
                href={`tel:${company.phone.replace(/\s/g, '')}`}
                aria-label={`Chiama ${company.name}`}
                className="inline-flex items-center gap-2 bg-white/5 text-white text-sm font-medium px-5 py-3 rounded-xl hover:bg-white/10 transition-colors font-sans border border-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <Phone size={14} aria-hidden="true" />
                Chiama
              </a>
            )}
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visita il sito di ${company.name}`}
                className="inline-flex items-center gap-2 bg-white/5 text-white text-sm font-medium px-5 py-3 rounded-xl hover:bg-white/10 transition-colors font-sans border border-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <Globe size={14} aria-hidden="true" />
                Sito web
              </a>
            )}
            {company.email && (
              <a
                href={`mailto:${company.email}`}
                aria-label={`Invia email a ${company.name}`}
                className="inline-flex items-center gap-2 bg-white/5 text-white text-sm font-medium px-5 py-3 rounded-xl hover:bg-white/10 transition-colors font-sans border border-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <Mail size={14} aria-hidden="true" />
                Email
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-[11px] tracking-[3px] uppercase text-zinc-500 mb-3 font-sans font-normal">
              Descrizione
            </h2>
            <p className="text-zinc-700 text-base leading-relaxed font-sans font-light whitespace-pre-line">
              {company.description}
            </p>

            {company.tags.length > 0 && (
              <div className="mt-10">
                <h2 className="text-[11px] tracking-[3px] uppercase text-zinc-500 mb-3 font-sans font-normal">
                  Servizi e specializzazioni
                </h2>
                <ul className="flex flex-wrap gap-2 list-none p-0">
                  {company.tags.map((tag) => (
                    <li
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-full border border-zinc-200 text-zinc-700 bg-white font-sans"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="md:col-span-1">
            <div className="rounded-2xl border border-zinc-200 p-6 bg-white space-y-5">
              <div>
                <h3 className="text-[11px] tracking-[3px] uppercase text-zinc-500 mb-2 font-sans font-normal">
                  Fascia prezzo
                </h3>
                <p className="text-zinc-900 font-sans text-sm">
                  {company.price_from
                    ? `da ${company.price_from}€${company.price_unit ? ` / ${company.price_unit}` : ''}`
                    : 'Su richiesta'}
                </p>
              </div>

              <div>
                <h3 className="text-[11px] tracking-[3px] uppercase text-zinc-500 mb-2 font-sans font-normal">
                  Zona coperta
                </h3>
                <p className="text-zinc-900 font-sans text-sm">
                  Roma {company.zone}
                </p>
              </div>

              {cat && (
                <div>
                  <h3 className="text-[11px] tracking-[3px] uppercase text-zinc-500 mb-2 font-sans font-normal">
                    Categoria
                  </h3>
                  <Link
                    href={`/#aziende`}
                    className="inline-flex items-center gap-1 text-sm text-zinc-900 font-sans hover:text-ink-soft transition-colors"
                  >
                    <span aria-hidden="true">{cat.icon}</span> {cat.label}
                  </Link>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section
          aria-labelledby="related-title"
          className="max-w-4xl mx-auto px-6 pb-20"
        >
          <h2
            id="related-title"
            className="text-[11px] tracking-[3px] uppercase text-zinc-500 mb-6 font-sans font-normal"
          >
            Altre aziende simili
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 list-none p-0">
            {related.map((r) => {
              const rCat = categories.find((c) => c.id === r.category[0])
              return (
                <li key={r.id}>
                  <Link
                    href={`/azienda/${r.slug}`}
                    className="block p-5 rounded-xl border border-zinc-200 hover:border-zinc-400 bg-white transition-colors group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    <div className="text-[11px] tracking-[3px] uppercase text-zinc-500 mb-2 font-sans">
                      {rCat && (
                        <span aria-hidden="true" className="mr-1">
                          {rCat.icon}
                        </span>
                      )}
                      {rCat?.label ?? 'Azienda'}
                    </div>
                    <div className="text-sm font-medium text-zinc-900 font-sans mb-1 group-hover:text-ink-soft transition-colors">
                      {r.name}
                    </div>
                    <div className="text-xs text-zinc-500 font-sans">
                      Roma {r.zone}
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  )
}
