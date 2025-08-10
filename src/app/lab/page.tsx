// src/app/lab/page.tsx
import Link from "next/link";
import { getAllLabPosts } from "@/lib/lab";

export const revalidate = 0;
export const metadata = { title: "Lab" };

// Format date as YYYY-MM-DD (customize as you like)
function formatDate(input?: string) {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return new Intl.DateTimeFormat("en-CA", { dateStyle: "medium" }).format(d);
}

export default function LabPage() {
  // Only published posts (draft/hidden excluded)
  const posts = getAllLabPosts();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Lab</h1>
      <p className="text-gray-400 mb-8">
        실험적 글과 스케치들을 모으는 공간입니다.
      </p>

      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/lab/${p.slug}`}
              className="block rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition p-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-semibold">{p.title}</h2>
                {/* tags */}
                {p.tags?.map((t) => (
                  <span
                    key={t}
                    className="text-xs rounded-full border border-white/15 px-2 py-0.5 text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* date + excerpt */}
              <div className="mt-1 text-sm text-gray-400">
                {p.date && <span>{formatDate(p.date)}</span>}
                {p.excerpt && (
                  <span className="before:content-['•'] before:mx-2">
                    {p.excerpt}
                  </span>
                )}
              </div>

              {/* subtle divider */}
              <div className="mt-3 border-t border-white/10" />

              {/* read more */}
              <div className="mt-3 text-sm text-violet-300 underline underline-offset-4">
                Read article →
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Hint to show drafts in the future, e.g., with a query or a toggle */}
      {/* You can add a "Show drafts" switch later if needed */}
    </main>
  );
}