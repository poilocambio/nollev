export type Category =
  | 'audio'
  | 'visual'
  | 'illuminazione'
  | 'strutture'
  | 'arredi'
  | 'strumenti'

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