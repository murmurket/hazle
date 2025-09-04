import { getAllLabPosts } from "@/lib/lab";
import LabGrid from "@/components/lab/LabGrid";
import type { LabPost } from "@/types/lab";
import { Typography } from "@/components/ui/Typography";

export const revalidate = 0;
export const metadata = { title: "Lab" };

export default function LabPage() {
  const posts: LabPost[] = (getAllLabPosts() ?? []).sort((a, b) => 
    (b.date ?? "").localeCompare(a.date ?? "")
  );

  return (
    <main className="max-w-5xl mx-auto px-6 pt-20 pb-20" id="lab_main">
      <Typography as="h1" className="mb-2">
        Lab
      </Typography>
      <p className="text-gray-400 mb-8">
        A space to record experimental blogs, projects, and ideas.
      </p>

      <LabGrid posts={posts} />
    </main>
  );
}