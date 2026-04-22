@AGENTS.md

# Noleggia Roma — guida per Claude Code

## Cos'è questo file
Questo file viene letto automaticamente da Claude Code all'inizio di ogni sessione in questo repository. Serve a dare contesto: stack, convenzioni, gotcha, task comuni. La riga `@AGENTS.md` in cima importa `AGENTS.md` (che contiene regole per agenti di coding su Next.js 16).

## Prodotto
Landing / directory che aggrega aziende di noleggio attrezzatura per eventi a Roma. L'utente cerca per categoria + zona, vede una lista di aziende, contatta via WhatsApp con un click. Zero intermediari, zero commissioni.

## Stack
- Next.js 16 (App Router) — occhio: ha breaking changes rispetto a 14/15. `headers()`, `cookies()`, `params`, `searchParams` sono async. Leggi `node_modules/next/dist/docs/` se in dubbio.
- React 19
- TypeScript strict
- Tailwind CSS v4 — **configurazione via `@theme` in `src/app/globals.css`**, non tramite `tailwind.config.ts`.
- Supabase (client-only, anon key) per la tabella `companies`.
- Vercel (hosting + Analytics).

## Convenzioni
- **Colori brand** come token Tailwind v4: `ink`, `ink-soft`, `gold`, `gold-dark`, `whatsapp`, `whatsapp-hover`. Non hardcodare esadecimali nei componenti.
- **Font** via `next/font/google` in `src/app/layout.tsx`, esposti come variabili CSS (`--font-dm-sans`, `--font-dm-serif`) e collegati in `@theme`. Usa `font-sans` / `font-serif`.
- **Dati esterni** (Supabase) passano sempre da `parseCompanies()` / `parseCompany()` in `src/lib/types.ts`. Niente `as Company[]` senza validazione.
- **Accessibilità**: ogni input ha label, ogni icona decorativa ha `aria-hidden="true"`, i link esterni con `target="_blank"` hanno `rel="noopener noreferrer"` e `aria-label` descrittivo.
- **Italiano** per tutti i testi user-facing. Apostrofi come entità HTML (`&apos;`) dentro JSX.
- Commenti solo quando il "perché" non è ovvio.

## Comandi comuni
```bash
npm run dev        # dev server
npm run build      # build di produzione (usalo per verificare prima di committare)
npm run lint       # eslint
```

## Dove vive cosa
- Metadata SEO, JSON-LD, Analytics, skip-to-content: `src/app/layout.tsx`
- Robots / sitemap dinamici: `src/app/robots.ts`, `src/app/sitemap.ts`
- Error boundary globale: `src/app/error.tsx`
- Pagina scheda azienda: `src/app/azienda/[slug]/page.tsx` (SSG via `generateStaticParams`)
- Categorie (fonte unica): `src/data/categories.ts`
- Zone di Roma: `src/data/companies.ts`

## Task ricorrenti
- **Aggiungere una categoria**: aggiorna `Category` in `src/lib/types.ts` + `categoryValues` + `categories` in `src/data/categories.ts`.
- **Aggiungere un token di colore**: estendi `@theme` in `globals.css`, poi usa la utility Tailwind generata.
- **Cambiare il dominio**: aggiorna `NEXT_PUBLIC_SITE_URL` in Vercel (non hardcodare).

## Cose da non fare
- Non creare `tailwind.config.ts`: Tailwind v4 si configura via CSS.
- Non mockare il database nei test di integrazione.
- Non committare `.env.local` (già in `.gitignore`).
