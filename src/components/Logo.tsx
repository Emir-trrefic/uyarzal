/** Speech-bubble mark with a closing quote: Quovra is about being quoted in AI answers. */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden className="logo-mark">
      <path d="M6 4h20a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H14l-6 5v-5H6a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z" fill="var(--accent)" />
      <path d="M11.5 10.5c-1.8.4-3 1.9-3 3.9 0 1.5 1 2.6 2.4 2.6 1.2 0 2.1-.9 2.1-2.1s-.8-2-1.9-2.1c.2-.8.9-1.4 1.8-1.6zm7 0c-1.8.4-3 1.9-3 3.9 0 1.5 1 2.6 2.4 2.6 1.2 0 2.1-.9 2.1-2.1s-.8-2-1.9-2.1c.2-.8.9-1.4 1.8-1.6z" fill="var(--logo-quote)" />
    </svg>
  );
}

export function Logo({ href }: { href: string }) {
  return (
    <a className="logo" href={href} aria-label="Quovra">
      <LogoMark />
      <span>quovra</span>
    </a>
  );
}
