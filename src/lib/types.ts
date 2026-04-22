export type Category =
  | 'audio'
  | 'visual'
  | 'illuminazione'
  | 'strutture'
  | 'arredi'
  | 'strumenti'

const categoryValues: readonly Category[] = [
  'audio',
  'visual',
  'illuminazione',
  'strutture',
  'arredi',
  'strumenti',
]

export interface Company {
  id: string
  name: string
  slug: string
  category: Category[]
  description: string
  zone: string
  phone: string
  whatsapp: string
  website?: string
  email?: string
  price_from?: number
  price_unit?: string
  rating?: number
  review_count?: number
  verified: boolean
  image_url?: string
  tags: string[]
  created_at: string
}

export interface CategoryMeta {
  id: Category
  label: string
  description: string
  icon: string
  keywords: string[]
}

export interface SearchFilters {
  query: string
  category: Category | 'tutte'
  zone: string
}

function isString(v: unknown): v is string {
  return typeof v === 'string'
}

function isCategory(v: unknown): v is Category {
  return isString(v) && (categoryValues as readonly string[]).includes(v)
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every(isString)
}

function isCategoryArray(v: unknown): v is Category[] {
  return Array.isArray(v) && v.every(isCategory)
}

export function parseCompany(raw: unknown): Company | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>

  if (!isString(r.id) || !isString(r.name) || !isString(r.slug)) return null
  if (!isCategoryArray(r.category)) return null
  if (!isString(r.description) || !isString(r.zone)) return null
  if (!isString(r.phone) || !isString(r.whatsapp)) return null
  if (typeof r.verified !== 'boolean') return null
  if (!isStringArray(r.tags)) return null
  if (!isString(r.created_at)) return null

  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    category: r.category,
    description: r.description,
    zone: r.zone,
    phone: r.phone,
    whatsapp: r.whatsapp,
    website: isString(r.website) ? r.website : undefined,
    email: isString(r.email) ? r.email : undefined,
    price_from: typeof r.price_from === 'number' ? r.price_from : undefined,
    price_unit: isString(r.price_unit) ? r.price_unit : undefined,
    rating: typeof r.rating === 'number' ? r.rating : undefined,
    review_count:
      typeof r.review_count === 'number' ? r.review_count : undefined,
    verified: r.verified,
    image_url: isString(r.image_url) ? r.image_url : undefined,
    tags: r.tags,
    created_at: r.created_at,
  }
}

export function parseCompanies(raw: unknown): Company[] {
  if (!Array.isArray(raw)) return []
  return raw
    .map(parseCompany)
    .filter((c): c is Company => c !== null)
}
