import { beforeEach, describe, expect, it } from "vitest";
import { useMediaStore } from "./use-media-store";

describe("useMediaStore", () => {
  beforeEach(() => {
    useMediaStore.setState({ searchQuery: "" });
  });

  it("should have an empty string as initial searchQuery", () => {
    const { searchQuery } = useMediaStore.getState();

    expect(searchQuery).toBe("");
  });

  it("should update searchQuery when setSearchQuery is called", () => {
    // Act: Call the function directly
    useMediaStore.getState().setSearchQuery("Jujutsu Kaisen");

    // Assert: Check the updated state
    const { searchQuery } = useMediaStore.getState();
    expect(searchQuery).toBe("Jujutsu Kaisen");
  });
});
