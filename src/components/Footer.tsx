import { Logo } from "./Logo";

export function Footer({ title = "" }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return (
    <footer>
      <a href={siteUrl} target="_blank" rel="noreferrer">
        <Logo size="15" />
      </a>
      <a
        href={siteUrl}
        target="_blank"
        rel="noreferrer"
      >
        <code>{title}</code>
      </a>
    </footer>
  );
}