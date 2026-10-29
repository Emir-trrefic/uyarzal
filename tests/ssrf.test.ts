import { describe, expect, it } from "vitest";
import { assertPublicHost, isPrivateIp, normalizeUrl, UnsafeUrlError } from "@/lib/audit/ssrf";

describe("URL safety", () => {
  it("normalises bare domains to https", () => {
    expect(normalizeUrl("example.com").toString()).toBe("https://example.com/");
  });

  it("rejects non-http schemes and credentials", () => {
    expect(() => normalizeUrl("ftp://example.com")).toThrow(UnsafeUrlError);
    expect(() => normalizeUrl("https://user:pw@example.com")).toThrow(UnsafeUrlError);
  });

  it.each(["127.0.0.1", "10.1.2.3", "172.20.0.1", "192.168.1.1", "169.254.169.254", "::1", "fd00::1", "::ffff:127.0.0.1"])(
    "flags %s as private",
    (ip) => expect(isPrivateIp(ip)).toBe(true),
  );

  it("allows public IPs", () => {
    expect(isPrivateIp("93.184.216.34")).toBe(false);
  });

  it("blocks private literal hosts", async () => {
    await expect(assertPublicHost(new URL("http://169.254.169.254/"))).rejects.toThrow(UnsafeUrlError);
    await expect(assertPublicHost(new URL("http://localhost/"))).rejects.toThrow(UnsafeUrlError);
  });
});
