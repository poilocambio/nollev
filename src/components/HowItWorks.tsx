const steps = [
  {
    n: '01',
    title: 'Cerca per categoria',
    body: 'Scegli cosa ti serve — ledwall, audio, gazebo — e la zona di Roma. Tutto in una schermata.',
  },
  {
    n: '02',
    title: 'Confronta i fornitori',
    body: 'Vedi foto, prezzi indicativi e recensioni reali. Nessuna sorpresa, nessuna attesa.',
  },
  {
    n: '03',
    title: 'Contatta via WhatsApp',
    body: 'Un click e sei direttamente con l\'azienda. Nessun intermediario, nessuna commissione.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-[#0D1117] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-[11px] tracking-[3px] uppercase text-white/30 mb-2 font-sans">
          Come funziona
        </p>
        <h2 className="font-serif text-[30px] text-white mb-12">
          In mezz&apos;ora hai la risposta.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step) => (
            <div
              key={step.n}
              className="p-7 rounded-xl border border-white/[0.08] hover:border-white/[0.15] transition-colors duration-200"
            >
              <div className="font-serif text-4xl text-white/10 mb-4">{step.n}</div>
              <div className="text-sm font-medium text-white mb-2 font-sans">{step.title}</div>
              <div className="text-xs text-white/40 leading-relaxed font-sans font-light">
                {step.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}