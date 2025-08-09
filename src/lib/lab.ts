// src/lib/lab.ts
// Utilities for reading MDX posts from the filesystem
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const LAB_DIR = path.join(process.cwd(), "src/content/lab");

// Metadata structure used by the /lab list
export type LabPostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
};

// Allowed frontmatter fields
type MatterData = {
  title?: string;
  date?: string;
  excerpt?: string;
  tags?: string[];
};

// Read all MDX posts (metadata only)
export function getAllLabPosts(): LabPostMeta[] {
  if (!fs.existsSync(LAB_DIR)) return [];
  const files = fs.readdirSync(LAB_DIR).filter((f) => /\.mdx$/i.test(f));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/i, "");
      const raw = fs.readFileSync(path.join(LAB_DIR, file), "utf8");
      const { data } = matter(raw) as matter.GrayMatterFile<string> & {
        data: MatterData;
      };
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        excerpt: data.excerpt,
        tags: data.tags ?? [],
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

// Return list of slugs for static params (no 'any')
export function getLabSlugs(): string[] {
  if (!fs.existsSync(LAB_DIR)) return [];
  return fs
    .readdirSync(LAB_DIR)
    .filter((f) => /\.mdx$/i.test(f))
    .map((f) => f.replace(/\.mdx$/i, ""));
}