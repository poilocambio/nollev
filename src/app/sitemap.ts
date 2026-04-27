import type { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://noleggiaroma.it'
).replace(/\/$/, '')

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const { data } = await supabase
    .from('companies')
    .select('slug, created_at')

  const companyUrls: MetadataRoute.Sitemap = (data ?? [])
    .filter((row): row is { slug: string; created_at: string | null } =>
      typeof row.slug === 'string',
    )
    .map(({ slug, created_at }) => ({
      url: `${siteUrl}/azienda/${slug}`,
      lastModified: created_at ? new Date(created_at) : now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...companyUrls,
  ]
}
