import { describe, it, expect } from "vitest";
import { getTmdbImageUrl } from "./image";

describe("getTmdbImageUrl", () => {
  it("should return null if the path is null or undefined", () => {
    // 1. Arrange: set up input
    const path = null;

    // 2. Act: call the function
    const result = getTmdbImageUrl(path);

    // 3. Assert: check expected output
    expect(result).toBeNull();
  });

  it("should build the image URL with the default size (w342)", () => {
    const path = "/test-poster.jpg";

    const result = getTmdbImageUrl(path);

    expect(result).toBe("https://image.tmdb.org/t/p/w342/test-poster.jpg");
  });

  it("should build the image URL with a custom size", () => {
    const path = "/test-poster.jpg";

    const result = getTmdbImageUrl(path, "w500");

    expect(result).toBe("https://image.tmdb.org/t/p/w500/test-poster.jpg");
  });
});
