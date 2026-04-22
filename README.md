# Noleggia Roma

Directory specializzata che mette in contatto chi organizza eventi a Roma con le aziende che noleggiano attrezzatura professionale.

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Supabase · Vercel

---

## Setup locale

### 1. Clona il repo e installa le dipendenze

```bash
git clone https://github.com/TUO_USERNAME/noleggiaroma.git
cd noleggiaroma
npm install
```

### 2. Crea il file `.env.local`

```bash
cp .env.example .env.local
```

Apri `.env.local` e inserisci le credenziali Supabase (Dashboard → Project Settings → API) e l'URL pubblico del sito.

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_SITE_URL=https://noleggiaroma.it
```

### 3. Avvia il server di sviluppo

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

---

## Setup Supabase

1. Crea un nuovo progetto su [supabase.com](https://supabase.com).
2. Crea una tabella `companies` con lo schema definito in `src/lib/types.ts` (campi: `id`, `name`, `slug`, `category` (array), `description`, `zone`, `phone`, `whatsapp`, `website`, `email`, `price_from`, `price_unit`, `rating`, `review_count`, `verified`, `image_url`, `tags` (array), `created_at`).
3. Abilita la Row Level Security con una policy `SELECT` pubblica sulla tabella.
4. Copia URL e anon key in `.env.local`.

---

## Deploy su Vercel

```bash
git add .
git commit -m "feat: release"
git push origin main
```

Vercel fa il deploy automatico ad ogni push su `main`.

**Variabili d'ambiente su Vercel** (Dashboard → Project → Settings → Environment Variables):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`

Vercel Analytics è integrato lato codice (`@vercel/analytics`) — attivalo dal dashboard del progetto.

---

## Struttura del progetto

```
src/
  app/
    page.tsx          Landing page
    layout.tsx        Font, metadata, JSON-LD, Analytics
    globals.css       Tailwind v4 @theme, reset, utility
    error.tsx         Error boundary globale
    not-found.tsx     Pagina 404
    robots.ts         robots.txt dinamico
    sitemap.ts        sitemap.xml dinamico
  components/
    Hero.tsx          Hero + ricerca
    CategoryGrid.tsx  Griglia 6 categorie
    CompanyCard.tsx   Card azienda
    CompanyList.tsx   Lista filtrata
    HowItWorks.tsx    I 3 step
    CtaBusiness.tsx   Sezione per le aziende
    Footer.tsx        Footer
  lib/
    supabase.ts       Client Supabase
    types.ts          Tipi + runtime parser
    utils.ts          cn()
  data/
    categories.ts     Metadati categorie
    companies.ts      Zone Roma + export companies (placeholder)
```

---

## Prossimi step

- [ ] Popolare la tabella `companies` su Supabase con aziende reali
- [ ] Pagina `/azienda/[slug]` con scheda completa
- [ ] Form "Aggiungi la tua azienda" collegato a Supabase
- [ ] Immagine OG personalizzata in `public/og.png`
- [ ] Favicon `.svg` al posto di `.ico`
- [ ] Test componenti (Vitest + React Testing Library)

---

## Convenzioni

- Colori brand via token Tailwind: `bg-ink`, `bg-ink-soft`, `text-gold`, `text-gold-dark`, `bg-whatsapp`, `bg-whatsapp-hover`.
- Font via `next/font` (DM Sans + DM Serif Display), con `font-display: swap` automatico.
- Niente `any` o casting non validato: i dati da Supabase passano da `parseCompanies()` in `src/lib/types.ts`.

---

## Validazione (obiettivo mese 1)

50+ visite organiche nelle prime 3–4 settimane.
Se arrivano → si va avanti. Se no → si ripensa il canale di acquisizione.
