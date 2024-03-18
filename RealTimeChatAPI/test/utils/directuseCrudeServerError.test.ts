import { describe, expect, it } from "vitest";
import { throwInternalServerError } from "../../src/utils/directusCrudServerError";

describe("should trow error", () => {
  it("Should return an internal server error", () => {
    const internalServerError = throwInternalServerError();

    expect(internalServerError).toHaveProperty("errorCode", 500);
    expect(internalServerError).toHaveProperty(
      "message",
      "Internal Server Error",
    );
  });

  it("Should throw an internal server error", () => {
    try {
      throw throwInternalServerError();
    } catch (error) {
      expect(error).toHaveProperty("errorCode", 500);
      expect(error).toHaveProperty("message", "Internal Server Error");
    }
  });
});
