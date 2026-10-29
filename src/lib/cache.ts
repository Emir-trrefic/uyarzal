/** Small TTL cache with a size cap, so repeated audits of the same site cost one crawl. */
export class TtlCache<V> {
  private store = new Map<string, { value: V; expires: number }>();

  constructor(private ttlMs: number, private maxEntries = 500) {}

  get(key: string): V | undefined {
    const hit = this.store.get(key);
    if (!hit) return undefined;
    if (hit.expires < Date.now()) {
      this.store.delete(key);
      return undefined;
    }
    return hit.value;
  }

  set(key: string, value: V): void {
    if (this.store.size >= this.maxEntries) {
      // Map preserves insertion order, so the first key is the oldest.
      this.store.delete(this.store.keys().next().value!);
    }
    this.store.set(key, { value, expires: Date.now() + this.ttlMs });
  }
}
