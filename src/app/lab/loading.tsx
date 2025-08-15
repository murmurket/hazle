export default function Loading() {
  return (
    <main className="max-w-5xl mx-auto px-6 pt-10 pb-20">
      <div className="h-8 w-28 bg-white/10 rounded animate-pulse mb-2" />
      <div className="h-5 w-80 bg-white/10 rounded animate-pulse mb-8" />

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <li key={i} className="rounded-2xl border border-white/10 overflow-hidden">
            <div className="aspect-[16/9] bg-white/5 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-5 w-3/4 bg-white/10 rounded animate-pulse" />
              <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-white/10 rounded animate-pulse" />
              <div className="mt-3 h-px bg-white/10" />
              <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}