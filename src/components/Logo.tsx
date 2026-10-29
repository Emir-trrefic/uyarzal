/** Wordmark: the name set in the editorial serif, closed by a red quotation mark. */
export function Logo({ href }: { href: string }) {
  return (
    <a className="logo" href={href} aria-label="Quovra">
      Quovra<span className="logo-quote" aria-hidden>”</span>
    </a>
  );
}
