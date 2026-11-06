import { beforeEach, describe, expect, it } from "vitest";
import { AppUser, useAuthStore } from "./use-auth-store";

describe("useAuthStore", () => {
  beforeEach(() => {
    // Setting user as null for each test case
    useAuthStore.setState({ user: null });
  });

  const testUser: AppUser = {
    id: "user-123-987",
    name: "Gojo",
    email: "gojo@satoru.com",
    avatarUrl: "https://example.com/avatar.png",
  };

  it("should have initial user as null", () => {
    expect(useAuthStore.getState().user).toBe(null);
  });

  it("should set user correctly", () => {
    useAuthStore.setState({ user: testUser });

    // Use toEqual for objects
    expect(useAuthStore.getState().user).toEqual(testUser);
  });

  it("should clear the user correctly", () => {
    // Set user to store
    useAuthStore.setState({ user: testUser });

    useAuthStore.getState().clearUser();

    expect(useAuthStore.getState().user).toBe(null);
  });
});
