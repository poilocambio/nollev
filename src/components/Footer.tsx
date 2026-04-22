export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-100 px-6 py-6 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="font-serif text-base text-zinc-900">
        Noleggia <span className="text-gold-dark">Roma</span>
      </div>
      <p className="text-xs text-zinc-500 font-sans text-center">
        Roma, {year} · Solo eventi · Solo professionisti
      </p>
    </footer>
  )
}
