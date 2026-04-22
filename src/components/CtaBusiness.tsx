export default function CtaBusiness() {
  return (
    <section
      id="aziende-cta"
      aria-labelledby="cta-business-title"
      className="max-w-5xl mx-auto px-6 py-24 text-center"
    >
      <p className="text-[11px] tracking-[3px] uppercase text-zinc-500 mb-4 font-sans">
        Per le aziende
      </p>
      <h2
        id="cta-business-title"
        className="font-serif text-[36px] text-zinc-900 mb-4 leading-tight"
      >
        Sei un&apos;azienda di noleggio?
      </h2>
      <p className="text-zinc-600 text-[15px] font-sans font-light max-w-sm mx-auto mb-8 leading-relaxed">
        Aggiungi la tua azienda gratuitamente. Raggiungi chi organizza eventi a
        Roma e non ti avrebbe mai trovato.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="mailto:ciao@noleggiaroma.it?subject=Voglio%20aggiungere%20la%20mia%20azienda%20su%20Noleggia%20Roma"
          className="inline-flex items-center gap-2 bg-ink text-gold text-sm font-medium px-8 py-3.5 rounded-xl hover:bg-ink-soft transition-colors duration-200 font-sans focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Registra la tua azienda →
        </a>
        <span className="text-xs text-zinc-500 font-sans">
          Gratuito nella fase di lancio
        </span>
      </div>

      <ul className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-12 text-xs text-zinc-500 font-sans list-none p-0">
        <li>
          <span aria-hidden="true">✓</span> Nessun costo iniziale
        </li>
        <li>
          <span aria-hidden="true">✓</span> Contatto diretto con i clienti
        </li>
        <li>
          <span aria-hidden="true">✓</span> Zero intermediari
        </li>
      </ul>
    </section>
  )
}
