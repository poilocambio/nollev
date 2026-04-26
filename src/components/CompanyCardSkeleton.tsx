export default function CompanyCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center gap-5 p-5 md:p-6 rounded-xl border border-zinc-100 bg-white animate-pulse"
    >
      {/* Avatar */}
      <div className="w-12 h-12 rounded-xl bg-zinc-200 shrink-0" />

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="h-4 bg-zinc-200 rounded w-36" />
          <div className="h-4 bg-zinc-200 rounded-full w-16" />
        </div>
        <div className="flex gap-3">
          <div className="h-3 bg-zinc-200 rounded w-24" />
          <div className="h-3 bg-zinc-200 rounded w-20" />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="hidden md:block h-6 bg-zinc-200 rounded-full w-24" />
        <div className="hidden md:block h-6 bg-zinc-200 rounded-full w-14" />
        <div className="h-8 bg-zinc-200 rounded-lg w-28" />
      </div>
    </div>
  )
}
