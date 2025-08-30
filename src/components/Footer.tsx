import { Logo } from "./Logo";
import Link from "next/link";
import { siteUrl } from '@/lib/config';
import { getEmail } from '@/utils/email';

export function Footer({ title = "" }) {

  return (
    <footer>
      <Link href={siteUrl} aria-label="Go to homepage">
        <Logo size="15" />
      </Link>
      <Link 
        href={`mailto:${getEmail()}`}
        aria-label="Send an email to Hazle" 
        target="_blank" 
        rel="noopener noreferrer">
        <code>{title}</code>
      </Link>
    </footer>
  );
}