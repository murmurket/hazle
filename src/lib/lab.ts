// src/lib/lab.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Types for Lab post metadata
export interface LabMeta {
  title: string;
  date?: string;
  excerpt?: string;
  tags?: string[];
  slug: string;
  draft?: boolean;
  hiddenFromList?: boolean;
}

const LAB_DIR = path.join(process.cwd(), "src", "content", "lab");

// Parse `export const metadata = { ... }` block when no YAML is present
function parseJsExportMetadata(src: string): Omit<LabMeta, "slug"> | null {
  // Find a literal object assigned to `export const metadata =`
  const m = src.match(/export\s+const\s+metadata\s*=\s*({[\s\S]*?})\s*;?/);
  if (!m) return null;

  const objText = m[1]
    .replace(/\/\/.*$/gm, "")           // strip line comments
    .replace(/\/\*[\s\S]*?\*\//g, "");  // strip block comments

  try {
    // Evaluate plain object literal safely
    // eslint-disable-next-line no-new-func
    const obj = new Function(`return (${objText});`)() as Record<string, unknown>;
    const result: Omit<LabMeta, "slug"> = {
      title: String(obj.title ?? ""),
      date: obj.date ? String(obj.date) : undefined,
      excerpt: obj.excerpt ? String(obj.excerpt) : undefined,
      tags: Array.isArray(obj.tags) ? (obj.tags as string[]) : undefined,
      draft: obj.draft === true,
      hiddenFromList: obj.hiddenFromList === true,
    };
    if (!result.title) return null;
    return result;
  } catch {
    return null;
  }
}

// Read one MDX file metadata (YAML first, then JS export fallback)
function readLabMetaByFile(filePath: string, slug: string): LabMeta | null {
  const raw = fs.readFileSync(filePath, "utf8");
  const fm = matter(raw); // YAML frontmatter if present

  if (fm.data && Object.keys(fm.data).length > 0) {
    return {
      title: String(fm.data.title ?? slug),
      date: fm.data.date ? String(fm.data.date) : undefined,
      excerpt: fm.data.excerpt ? String(fm.data.excerpt) : undefined,
      tags: Array.isArray(fm.data.tags) ? (fm.data.tags as string[]) : undefined,
      draft: fm.data.draft === true,
      hiddenFromList: fm.data.hiddenFromList === true,
      slug,
    };
  }

  const jsMeta = parseJsExportMetadata(raw);
  if (jsMeta) return { ...jsMeta, slug };

  return { title: slug, slug };
}

// List all slugs
export function getLabSlugs(): string[] {
  if (!fs.existsSync(LAB_DIR)) return [];
  return fs
    .readdirSync(LAB_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/i, ""))
    .sort((a, b) => a.localeCompare(b));
}

// Get all posts (metadata only), with filtering options
export function getAllLabPosts(opts?: { includeDrafts?: boolean }): LabMeta[] {
  const includeDrafts = opts?.includeDrafts ?? false;

  const items = getLabSlugs()
    .map((slug) => {
      const filePath = path.join(LAB_DIR, `${slug}.mdx`);
      return readLabMetaByFile(filePath, slug);
    })
    .filter((x): x is LabMeta => Boolean(x));

  // Filter drafts/hidden unless explicitly included
  const filtered = includeDrafts
    ? items
    : items.filter((p) => !p.draft && !p.hiddenFromList);

  // Sort by date desc if present
  return filtered.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}