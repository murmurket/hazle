// src/app/lab/page.tsx
import Link from "next/link";
import Image from "next/image";
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
    <main className="max-w-5xl mx-auto px-6 pt-10 pb-20">
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
              {/* Thumbnail wrapper */}
              <div
                className="relative w-full rounded-t-2xl overflow-hidden bg-black"
                style={{ aspectRatio: "16 / 9" }}
                aria-hidden
              >
                {p.cover ? (
                    <>
                    {/* Blurred background */}
                    <Image
                        src={p.cover}
                        alt=""
                        fill
                        className="object-cover blur-md scale-110 opacity-60"
                        priority={false}
                        unoptimized={p.cover.endsWith(".gif")}
                    />
                    {/* Foreground sharp image */}
                    <Image
                        src={p.cover}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
                        priority={false}
                        unoptimized={p.cover.endsWith(".gif")}
                    />
                    {/* Vignette */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    </>
                ) : (
                    // Placeholder
                    <div className="relative h-full w-full flex items-center justify-center bg-black">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-white/5 via-white/0 to-white/5 opacity-0 transition-opacity duration-500 motion-safe:group-hover:opacity-100" />
                    <span className="relative z-10 text-white text-sm tracking-wide uppercase">
                        {p.firstTag ?? "LAB"}
                    </span>
                    </div>
                )}
              </div>

              {/* Card content */}
              <div className="p-4">
                {/* Title + tags */}
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

                {/* Date + excerpt */}
                <div className="mt-1 text-sm text-gray-400">
                  {p.date && <span>{formatDate(p.date)}</span>}
                  {p.excerpt && (
                    <span className="before:content-['•'] before:mx-2">
                      {p.excerpt}
                    </span>
                  )}
                </div>

                {/* Divider */}
                <div className="mt-3 border-t border-white/10" />

                {/* Read more with smooth reveal */}
                <div className="mt-3 text-sm text-violet-300 underline underline-offset-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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