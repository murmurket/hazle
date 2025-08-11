"use client";

// Tiny client boundary to render a compiled MDX component
export default function MdxClient({
  component: Component,
}: {
  component: React.ComponentType;
}) {
  return <Component />;
}