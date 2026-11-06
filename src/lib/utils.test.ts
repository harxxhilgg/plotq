import { describe, it, expect } from "vitest";
import { delay } from "./utils";

describe("delay utility", () => {
  it("resolves after the specified time", async () => {
    const start = Date.now();
    await delay(50);
    const elapsed = Date.now() - start;

    expect(elapsed).toBeGreaterThanOrEqual(40);
  });
});
