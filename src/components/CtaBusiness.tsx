export default function CtaBusiness() {
  return (
    <section id="aziende-cta" className="max-w-5xl mx-auto px-6 py-24 text-center">
      <p className="text-[11px] tracking-[3px] uppercase text-zinc-400 mb-4 font-sans">
        Per le aziende
      </p>
      <h2 className="font-serif text-[36px] text-zinc-900 mb-4 leading-tight">
        Sei un&apos;azienda di noleggio?
      </h2>
      <p className="text-zinc-500 text-[15px] font-sans font-light max-w-sm mx-auto mb-8 leading-relaxed">
        Aggiungi la tua azienda gratuitamente. Raggiungi chi organizza eventi a Roma
        e non ti avrebbe mai trovato.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="mailto:ciao@nollev.it?subject=Voglio aggiungere la mia azienda su Nollev"
          className="inline-flex items-center gap-2 bg-[#0D1117] text-[#E8D5A3] text-sm font-medium px-8 py-3.5 rounded-xl hover:bg-[#1a2332] transition-colors duration-200 font-sans"
        >
          Registra la tua azienda →
        </a>
        <span className="text-xs text-zinc-400 font-sans">Gratuito nella fase di lancio</span>
      </div>

      {/* Trust signals */}
      <div className="flex items-center justify-center gap-8 mt-12 text-xs text-zinc-400 font-sans">
        <span>✓ Nessun costo iniziale</span>
        <span>✓ Contatto diretto con i clienti</span>
        <span>✓ Zero intermediari</span>
      </div>
    </section>
  )
}