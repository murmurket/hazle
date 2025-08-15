import { getAllLabPosts } from "@/lib/lab";
import LabGrid from "@/components/lab/LabGrid";
import type { LabPost } from "@/types/lab";


export const revalidate = 0;

export async function generateStaticParams() {
  const posts: LabPost[] = getAllLabPosts() ?? [];
  const set = new Set<string>();
  posts.forEach((p) => (p.tags ?? []).forEach((t) => set.add(t)));
  return Array.from(set).map((t) => ({ tag: t }));
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const all = (getAllLabPosts() ?? []).sort((a, b) =>
    (b.date ?? "").localeCompare(a.date ?? "")
  );
  const posts = all.filter((p) => (p.tags ?? []).includes(params.tag));

  return (
    <main className="max-w-5xl mx-auto px-6 pt-10 pb-20">
      <h1 className="text-3xl font-bold mb-2">Tag: {params.tag}</h1>
      <p className="text-gray-400 mb-8">
        Posts filtered by the selected tag.
      </p>

      <LabGrid posts={posts} />
    </main>
  );
}