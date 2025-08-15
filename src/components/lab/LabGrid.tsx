"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { LabPost } from "@/types/lab";

const fmtDate = (iso?: string) => {
  if (!iso) return { label: "", machine: "" };
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { label: iso, machine: "" };
  return {
    label: new Intl.DateTimeFormat("en-CA", { dateStyle: "medium" }).format(d),
    machine: d.toISOString().slice(0, 10),
  };
};

const isGif = (src: string) => src.toLowerCase().endsWith(".gif");

export default function LabGrid({ posts }: { posts: LabPost[] }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 9;

  // collect all tags
  const allTags = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of posts) {
      (p.tags ?? []).forEach((t) => map.set(t, (map.get(t) ?? 0) + 1));
    }
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, [posts]);

  // filter by query + tag
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const okTag = activeTag ? (p.tags ?? []).includes(activeTag) : true;
      if (!q) return okTag;
      const hay = [
        p.title,
        p.excerpt,
        ...(p.tags ?? []),
        p.date ?? "",
        p.slug,
      ]
        .join(" ")
        .toLowerCase();
      return okTag && hay.includes(q);
    });
  }, [posts, query, activeTag]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageClamp = Math.min(page, totalPages);
  const start = (pageClamp - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  const resetPage = () => setPage(1);

  return (
    <>
      {/* Controls */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 flex-1">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              resetPage();
            }}
            placeholder="Search title, tags, text…"
            className="w-full sm:max-w-md rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-400/60"
            aria-label="Search lab posts"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                resetPage();
              }}
              className="text-sm text-white/70 underline underline-offset-4"
            >
              Clear
            </button>
          )}
        </div>

        {/* Tag filter */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => {
              setActiveTag(null);
              resetPage();
            }}
            className={`text-xs rounded-full border px-3 py-1 transition ${
              activeTag === null
                ? "border-violet-300 text-violet-300"
                : "border-white/15 text-white/80 hover:border-white/30"
            }`}
          >
            All ({posts.length})
          </button>
          {allTags.slice(0, 12).map((t) => (
            <button
              key={t.name}
              onClick={() => {
                setActiveTag((cur) => (cur === t.name ? null : t.name));
                resetPage();
              }}
              className={`text-xs rounded-full border px-3 py-1 transition ${
                activeTag === t.name
                  ? "border-violet-300 text-violet-300"
                  : "border-white/15 text-white/80 hover:border-white/30"
              }`}
              aria-pressed={activeTag === t.name}
            >
              {t.name} ({t.count})
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <div className="text-sm text-gray-400 mb-2">
        {filtered.length} result{filtered.length === 1 ? "" : "s"}
        {activeTag ? ` • tag: ${activeTag}` : ""}
        {query ? ` • query: “${query}”` : ""}
      </div>

      {/* Grid */}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pageItems.map((p) => {
          const { label, machine } = fmtDate(p.date);
          const gif = p.cover ? isGif(p.cover) : false;

          return (
            <li key={p.slug} className="group">
              <Link
                href={`/lab/${p.slug}`}
                className="block rounded-2xl border border-white/10 transition hover:border-white/20 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60"
              >
                {/* Thumbnail */}
                <div
                  className="relative w-full overflow-hidden bg-black rounded-t-2xl aspect-[16/9]"
                  aria-hidden={p.cover ? true : undefined}
                >
                  {p.cover ? (
                    <>
                      <Image
                        src={p.cover}
                        alt=""
                        fill
                        className="object-cover blur-md scale-110 opacity-60"
                        unoptimized={gif}
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      />
                      <Image
                        src={p.cover}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
                        unoptimized={gif}
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    </>
                  ) : (
                    <div className="relative h-full w-full flex items-center justify-center bg-black">
                      <div className="absolute -inset-1 bg-gradient-to-tr from-white/5 via-white/0 to-white/5 opacity-0 transition-opacity duration-500 motion-safe:group-hover:opacity-100" />
                      <span className="relative z-10 text-white text-sm tracking-wide uppercase">
                        {p.firstTag ?? "LAB"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold line-clamp-2">{p.title}</h2>
                    {(p.tags ?? []).slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] rounded-full border border-white/15 px-2 py-0.5 text-white/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-1 text-sm text-gray-400">
                    {p.date && <time dateTime={machine}>{label}</time>}
                    {p.excerpt && (
                      <span className="before:content-['•'] before:mx-2 line-clamp-2">
                        {p.excerpt}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 border-t border-white/10" />
                  <div className="mt-3 text-sm text-violet-300 underline underline-offset-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                    Read article →
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-gray-400 mt-10">No posts found.</div>
      )}

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={pageClamp === 1}
            className="rounded-lg border border-white/15 px-3 py-1 text-sm disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-sm text-gray-300">
            Page {pageClamp} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={pageClamp === totalPages}
            className="rounded-lg border border-white/15 px-3 py-1 text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}