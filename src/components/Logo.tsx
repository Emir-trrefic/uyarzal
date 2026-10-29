/**
 * Wordmark in the Softmain family: heavy lowercase letters and a single
 * electric-blue dot, echoing the dot of the Softmain logo.
 */
export function Logo({ href }: { href: string }) {
  return (
    <a className="logo" href={href} aria-label="Quovra">
      quovra<span className="logo-dot" aria-hidden />
    </a>
  );
}
