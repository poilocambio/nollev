'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
import CategoryGrid from '@/components/CategoryGrid'
import CompanyList from '@/components/CompanyList'
import HowItWorks from '@/components/HowItWorks'
import CtaBusiness from '@/components/CtaBusiness'
import Footer from '@/components/Footer'
import { companies } from '@/data/companies'
import { Category, SearchFilters } from '@/lib/types'

const defaultFilters: SearchFilters = {
  query: '',
  category: 'tutte',
  zone: 'Tutta Roma',
}

export default function Home() {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters)

  function handleSearch(f: SearchFilters) {
    setFilters(f)
  }

  function handleCategory(cat: Category | 'tutte') {
    setFilters((prev) => ({ ...prev, category: cat }))
  }

  return (
    <main>
      <Hero onSearch={handleSearch} />
      <CategoryGrid active={filters.category} onChange={handleCategory} />
      <CompanyList companies={companies} filters={filters} />
      <HowItWorks />
      <CtaBusiness />
      <Footer />
    </main>
  )
}