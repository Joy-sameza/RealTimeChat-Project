import { describe, expect, it, vi } from "vitest";
import { generatToken } from "../../src/utils/generateToken";

describe("should send back error", () => {
  it("should send back an error", () => {
    const data = {
      id: vi.fn().mockImplementation((code) => {
        expect(code).toBeDefined();
        return data;
      }),
      role: vi.fn().mockImplementation((data) => {
        expect(data).toBeDefined();
        return data;
      }),
    };

    const token = generatToken(data);

    expect(token).toBeDefined();
    expect(token).toBeTypeOf("string");
  });
});
