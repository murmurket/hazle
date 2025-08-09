"use client";

import { useEffect, useState } from "react";

// Client-only loader that dynamically imports MDX by slug
export default function ClientMdxLoader({ slug }: { slug: string }) {
  const [Comp, setComp] = useState<null | React.ComponentType>(null);
  const [err, setErr] = useState<null | string>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // NOTE: path is relative to this file's location
        const mod = await import(`../../../content/lab/${slug}.mdx`);
        if (!cancelled) setComp(() => mod.default);
      } catch (e) {
        console.error("[lab] client import failed:", slug, e);
        if (!cancelled) setErr("Failed to load content.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (err) return <p className="text-red-400">{err}</p>;
  if (!Comp) return <p className="text-gray-400">Loading…</p>;
  return <Comp />;
}