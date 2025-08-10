// src/lib/lab.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface LabMeta {
  title: string;
  date?: string;
  excerpt?: string;
  tags?: string[];
  slug: string;
  draft?: boolean;
  hiddenFromList?: boolean;
  cover?: string;     // cover image URL if exists
  firstTag?: string;  // convenience for UI
}

const LAB_DIR = path.join(process.cwd(), "src", "content", "lab");

// Extract first image URL from Markdown or HTML
function extractFirstImageUrl(src: string): string | undefined {
  // Markdown image: ![alt](url)
  const md = src.match(/!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/);
  if (md?.[1]) return md[1];

  // HTML <img src="...">
  const html = src.match(/<img[^>]*\ssrc=["']([^"']+)["'][^>]*>/i);
  if (html?.[1]) return html[1];

  return undefined;
}

// Parse `export const metadata = { ... }` when no YAML is present
function parseJsExportMetadata(src: string): Omit<LabMeta, "slug"> | null {
  const m = src.match(/export\s+const\s+metadata\s*=\s*({[\s\S]*?})\s*;?/);
  if (!m) return null;

  const objText = m[1]
    .replace(/\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "");

  try {
    // eslint-disable-next-line no-new-func
    const obj = new Function(`return (${objText});`)() as Record<string, unknown>;
    const tags = Array.isArray(obj.tags) ? (obj.tags as string[]) : undefined;
    const result: Omit<LabMeta, "slug"> = {
      title: String(obj.title ?? ""),
      date: obj.date ? String(obj.date) : undefined,
      excerpt: obj.excerpt ? String(obj.excerpt) : undefined,
      tags,
      draft: obj.draft === true,
      hiddenFromList: obj.hiddenFromList === true,
      cover: obj.cover ? String(obj.cover) : undefined,
      firstTag: tags?.[0],
    };
    if (!result.title) return null;
    return result;
  } catch {
    return null;
  }
}

function readLabMetaByFile(filePath: string, slug: string): LabMeta | null {
  const raw = fs.readFileSync(filePath, "utf8");
  const fm = matter(raw);

  if (fm.data && Object.keys(fm.data).length > 0) {
    const tags = Array.isArray(fm.data.tags) ? (fm.data.tags as string[]) : undefined;
    const cover = fm.data.cover ? String(fm.data.cover) : extractFirstImageUrl(fm.content);
    return {
      title: String(fm.data.title ?? slug),
      date: fm.data.date ? String(fm.data.date) : undefined,
      excerpt: fm.data.excerpt ? String(fm.data.excerpt) : undefined,
      tags,
      draft: fm.data.draft === true,
      hiddenFromList: fm.data.hiddenFromList === true,
      slug,
      cover,
      firstTag: tags?.[0],
    };
  }

  const jsMeta = parseJsExportMetadata(raw);
  if (jsMeta) {
    return {
      ...jsMeta,
      slug,
      cover: jsMeta.cover ?? extractFirstImageUrl(raw),
      firstTag: jsMeta.firstTag ?? jsMeta.tags?.[0],
    };
  }

  return {
    title: slug,
    slug,
    cover: extractFirstImageUrl(raw),
  };
}

export function getLabSlugs(): string[] {
  if (!fs.existsSync(LAB_DIR)) return [];
  return fs
    .readdirSync(LAB_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/i, ""))
    .sort((a, b) => a.localeCompare(b));
}

export function getAllLabPosts(opts?: { includeDrafts?: boolean }): LabMeta[] {
  const includeDrafts = opts?.includeDrafts ?? false;
  const items = getLabSlugs()
    .map((slug) => {
      const filePath = path.join(LAB_DIR, `${slug}.mdx`);
      return readLabMetaByFile(filePath, slug);
    })
    .filter((x): x is LabMeta => Boolean(x));

  const filtered = includeDrafts ? items : items.filter((p) => !p.draft && !p.hiddenFromList);
  return filtered.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}