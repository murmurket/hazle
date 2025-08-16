// src/types/mdx.d.ts
declare module "*.mdx" {
  import type { ReactNode, ComponentProps } from "react";
  import type { MDXProps } from "mdx/types";

  // Default export is the compiled MDX component
  const MDXComponent: (props: ComponentProps<"div"> & MDXProps) => ReactNode;
  export default MDXComponent;

  // Optional named exports from frontmatter-like ESM exports in MDX
  export const metadata: Record<string, unknown> | undefined;
  export const frontmatter: Record<string, unknown> | undefined;
}