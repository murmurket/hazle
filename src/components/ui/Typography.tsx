import clsx from "clsx";

type HeadingLevels = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type TypographyVariants = HeadingLevels | "p" | "span";

interface TypographyProps {
  as?: TypographyVariants; // 실제 DOM 태그
  children: React.ReactNode;
  className?: string;
}

export const baseStyles: Record<TypographyVariants, string> = {
  h1: "text-4xl font-bold tracking-tight",
  h2: "text-2xl font-semibold tracking-tight",
  h3: "text-xl font-semibold",
  h4: "text-lg font-medium",
  h5: "text-base font-medium",
  h6: "text-sm font-medium",
  p: "text-base leading-relaxed text-gray-700",
  span: "text-sm",
};

export function Typography({
  as: Tag = "p",
  children,
  className,
}: TypographyProps) {
  return (
    <Tag className={clsx(baseStyles[Tag], className)}>
      {children}
    </Tag>
  );
}