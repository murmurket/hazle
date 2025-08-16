// src/app/lab/tag/[tag]/page.tsx
import { notFound } from "next/navigation";
import { getAllLabPosts } from "@/lib/lab";
import LabGrid from "@/components/lab/LabGrid";
import type { LabPost } from "@/types/lab";

export const revalidate = 0;
// export const dynamicParams = false; // optional

const norm = (s: string) => s.trim().toLowerCase();

// Narrow type for legacy snake_case flag
type LegacyHidden = { hidden_from_list?: boolean };

function isHidden(post: LabPost | (LabPost & LegacyHidden)): boolean {
  const snake = (post as LegacyHidden).hidden_from_list ?? false;
  const camel = post.hiddenFromList ?? false;
  const draft = post.draft ?? false;
  return draft || snake || camel;
}

export async function generateStaticParams() {
  const posts: LabPost[] = getAllLabPosts() ?? [];
  const set = new Set<string>();
  posts.forEach((p) => (p.tags ?? []).forEach((t) => set.add(norm(t))));
  return Array.from(set).map((t) => ({ tag: encodeURIComponent(t) }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const queryTag = norm(decodeURIComponent(tag));

  const all = (getAllLabPosts() ?? [])
    .filter((p) => !isHidden(p))
    .sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return (Number.isNaN(db) ? 0 : db) - (Number.isNaN(da) ? 0 : da);
    });

  const posts = all.filter((p) => (p.tags ?? []).map(norm).includes(queryTag));

  if (posts.length === 0) {
    const known = new Set<string>();
    all.forEach((p) => (p.tags ?? []).forEach((t) => known.add(norm(t))));
    if (!known.has(queryTag)) return notFound();
  }

  return (
    <main className="max-w-5xl mx-auto px-6 pt-10 pb-20">
      <h1 className="text-3xl font-bold mb-2">Tag: {queryTag}</h1>
      <p className="text-gray-400 mb-8">Posts filtered by the selected tag.</p>
      <LabGrid posts={posts} />
    </main>
  );
}