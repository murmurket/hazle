import { notFound } from "next/navigation";
import ClientMdxLoader from "./ClientMdxLoader";
import { getAllLabPosts } from "@/lib/lab";

export const revalidate = 0;

// Next 15: params is a Promise
export default async function LabPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Read frontmatter on the server (no MDX import here)
  const meta = getAllLabPosts().find((p) => p.slug === slug);
  if (!meta) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 pt-10 pb-20">
      <h1 className="text-3xl font-bold mb-4">{meta.title ?? slug}</h1>
      {meta.date && <p className="text-sm text-gray-400 mb-6">{meta.date}</p>}

      <article className="prose prose-invert max-w-none prose-headings:scroll-mt-24
                    prose-a:underline prose-strong:text-white
                    prose-pre:bg-black/40 prose-table:my-6">
        <ClientMdxLoader slug={slug} />
      </article>
    </main>
  );
}