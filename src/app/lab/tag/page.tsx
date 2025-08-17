import Link from "next/link";
import { getAllLabPosts } from "@/lib/lab";
import { Typography } from "@/components/ui/Typography";

export const revalidate = 0;
export const metadata = { title: "Lab Tags" };

export default function TagIndexPage() {
  const posts = getAllLabPosts() ?? [];
  const map = new Map<string, number>();
  posts.forEach((p) => (p.tags ?? []).forEach((t) => map.set(t, (map.get(t) ?? 0) + 1)));
  const tags = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);

  return (
    <main className="max-w-5xl mx-auto px-6 pt-10 pb-20">
      <Typography as="h1" className="mb-2">
        All Tags
      </Typography>
      <p className="text-gray-400 mb-8">Browse posts by tag.</p>

      <ul className="flex flex-wrap gap-2">
        {tags.map(([t, count]) => (
          <li key={t}>
            <Link
              href={`/lab/tag/${encodeURIComponent(t)}`}
              className="text-sm rounded-full border border-white/15 px-3 py-1 hover:border-white/30"
            >
              {t} ({count})
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}