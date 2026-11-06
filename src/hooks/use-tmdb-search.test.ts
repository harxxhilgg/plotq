import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useTmdbSearch } from "./use-tmdb-search";
import { SearchResult } from "@/types/tmdb";
import { searchTmdb } from "@/lib/tmdb/search";

vi.mock("@/lib/tmdb/search", () => ({
  searchTmdb: vi.fn(),
}));

describe("useTmdbSearch", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return empty initial state when query is empty", () => {
    const { result } = renderHook(() => useTmdbSearch(""));

    expect(result.current.results).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should fetch search results after 300ms debounce", async () => {
    const mockResults: SearchResult[] = [
      {
        id: 1,
        title: "Jujutsu Kaisen",
        posterPath: "/jujutsukaise.jpg",
        mediaType: "TV",
      },
      {
        id: 2,
        title: "Jujutsu Kaisen 0",
        posterPath: "/jujutukaisen0.jpg",
        mediaType: "MOVIE",
      },
    ];

    // Tell mock to return when called
    vi.mocked(searchTmdb).mockResolvedValue(mockResults);

    // Render hook with a query
    const { result } = renderHook(() => useTmdbSearch("Jujutsu Kaisen"));

    // Before debounce (0ms): searchTmdb should NOT have been called yet
    expect(searchTmdb).not.toHaveBeenCalled();

    // Fast-forward 300ms to trigger the setTimeout
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });

    // Check that searchTmdb was called with the trimmed query
    expect(searchTmdb).toHaveBeenCalledTimes(1);
    expect(searchTmdb).toHaveBeenCalledWith("Jujutsu Kaisen");

    // Check that results updated
    expect(result.current.results).toEqual(mockResults);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle search errors properly", async () => {
    // API failure
    vi.mocked(searchTmdb).mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useTmdbSearch("Unknown Movie/TV Show"));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });

    expect(result.current.results).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe("Something went wrong while searching.");
  });

  it("should reset results when query is cleared", async () => {
    vi.mocked(searchTmdb).mockResolvedValue([]);

    // Using initial props so we can change the query dynamically with rerender
    const { result, rerender } = renderHook(
      ({ query }) => useTmdbSearch(query),
      {
        initialProps: { query: "Jujutsu Kaisen" },
      },
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });

    // Now user clears the input
    rerender({ query: "" });

    expect(result.current.results).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
