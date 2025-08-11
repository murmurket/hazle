// MDX module typing for importing *.mdx files
declare module "*.mdx" {
  const MDXContent: React.ComponentType<any>;
  export default MDXContent;
  export const metadata: any;
}

// Optional: shim for 'mdx/types' if ever imported
declare module "mdx/types" {
  export type MDXComponents = Record<string, React.ComponentType<any>>;
}