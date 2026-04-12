# Nollev

Aggregatore specializzato che mette in contatto chi organizza eventi a Roma con le aziende che noleggiano attrezzatura professionale.

**Stack:** Next.js 15 · TypeScript · Tailwind CSS · Supabase · Vercel

---

## Setup locale

### 1. Clona il repo e installa le dipendenze

```bash
git clone https://github.com/TUO_USERNAME/nollev.git
cd nollev
npm install
```

### 2. Crea il file `.env.local`

```bash
cp .env.example .env.local
```

Poi apri `.env.local` e inserisci le tue credenziali Supabase (le trovi in Dashboard → Project Settings → API).

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Avvia il server di sviluppo

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

---

## Setup Supabase

1. Crea un nuovo progetto su [supabase.com](https://supabase.com)
2. Vai in **SQL Editor → New query**
3. Incolla il contenuto di `supabase-schema.sql` ed esegui
4. Copia le credenziali in `.env.local`

---

## Deploy su Vercel

```bash
# Prima push
git add .
git commit -m "feat: landing page iniziale"
git push origin main
```

Vercel fa il deploy automatico ad ogni push su `main`.

**Variabili d'ambiente su Vercel:**
In Dashboard → Project → Settings → Environment Variables aggiungi:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Struttura del progetto

```
src/
  app/
    page.tsx          # Landing page principale
    layout.tsx        # Font, metadata globali
    globals.css       # Font, variabili colore, reset
  components/
    Hero.tsx          # Hero con ricerca
    CategoryGrid.tsx  # Griglia 6 categorie
    CompanyCard.tsx   # Card singola azienda
    CompanyList.tsx   # Lista aziende con filtri
    HowItWorks.tsx    # I 3 step
    CtaBusiness.tsx   # Sezione per le aziende
    Footer.tsx        # Footer
  lib/
    supabase.ts       # Client Supabase
    types.ts          # Tipi TypeScript
    utils.ts          # cn() e utility
  data/
    companies.ts      # Dati mock per il lancio (sostituire con Supabase)
    categories.ts     # Metadati categorie
```

---

## Prossimi step

- [ ] Connettere `CompanyList` a Supabase (invece dei dati mock)
- [ ] Aggiungere le 13+ aziende reali nel database
- [ ] Creare pagina `/azienda/[slug]` per la scheda completa
- [ ] Aggiungere Google Analytics / Vercel Analytics
- [ ] SEO: sitemap.xml automatica con Next.js
- [ ] Form "Aggiungi la tua azienda" collegato a Supabase

---

## Validazione (obiettivo mese 1)

50+ visite organiche nelle prime 3-4 settimane.  
Se arrivano → si va avanti. Se no → si ripensa il canale di acquisizione.
