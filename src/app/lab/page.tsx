// src/app/lab/page.tsx
import Link from "next/link";
import { getAllLabPosts } from "@/lib/lab";

export const revalidate = 0;
export const metadata = { title: "Lab" };

// Format date to readable string
function formatDate(input?: string) {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return new Intl.DateTimeFormat("en-CA", { dateStyle: "medium" }).format(d);
}

export default function LabPage() {
  const posts = getAllLabPosts();

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Lab</h1>
      <p className="text-gray-400 mb-8">
        A space to record experimental blogs, projects, and ideas.
      </p>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <li key={p.slug} className="group">
            <Link
              href={`/lab/${p.slug}`}
              className="block rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition"
            >
              {/* Thumbnail area */}
              <div
                className="w-full rounded-t-2xl overflow-hidden bg-black flex items-center justify-center"
                style={{ aspectRatio: "16/9" }}
                aria-hidden
              >
                {p.cover ? (
                  // Use plain <img> for simplicity; add Next/Image later if domains configured
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.cover}
                    alt={p.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="text-white text-sm tracking-wide uppercase opacity-90">
                      {p.firstTag ?? "LAB"}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold">{p.title}</h2>
                  {p.tags?.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] rounded-full border border-white/15 px-2 py-0.5 text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-1 text-sm text-gray-400">
                  {p.date && <span>{formatDate(p.date)}</span>}
                  {p.excerpt && (
                    <span className="before:content-['•'] before:mx-2">
                      {p.excerpt}
                    </span>
                  )}
                </div>

                <div className="mt-3 text-sm text-violet-300 underline underline-offset-4 opacity-0 group-hover:opacity-100 transition">
                  Read article →
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}