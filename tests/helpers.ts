export type Routes = Record<string, { body: string; type?: string; status?: number }>;

/** A fetch stand-in that serves fixed responses by path, so tests never touch the network. */
export function fakeFetch(routes: Routes, log?: string[]): typeof fetch {
  return (async (input: string | URL | Request) => {
    const url = new URL(input instanceof Request ? input.url : input.toString());
    log?.push(url.pathname);
    const route = routes[url.pathname];
    if (!route) return new Response("<html>not found</html>", { status: 404, headers: { "content-type": "text/html" } });
    return new Response(route.body, { status: route.status ?? 200, headers: { "content-type": route.type ?? "text/html" } });
  }) as typeof fetch;
}

export const opts = (routes: Routes, log?: string[]) => ({ fetchImpl: fakeFetch(routes, log), skipHostCheck: true });
