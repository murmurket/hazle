import { Logo } from "./Logo";

export function Footer({ title = "" }) {
  return (
    <footer>
      <a href="/" target="_blank" rel="noreferrer">
        <Logo size="15" />
      </a>
      <a
        href="/"
        target="_blank"
        rel="noreferrer"
      >
        <code>{title}</code>
      </a>
    </footer>
  );
}