import { describe, expect, it, vi } from "vitest";
import { sendErrorToClient } from "../../src/utils/sendAndLogError";
import { Response } from "express";

describe("should send back error", () => {
  it("should send back an error", () => {
    const response: Partial<Response> = {
      status: vi.fn().mockImplementation((code) => {
        expect(code).toBeDefined();
        return response;
      }),
      json: vi.fn().mockImplementation((data) => {
        expect(data).toBeDefined();
        return response;
      }),
    };

    const error = new Error("Error");

    sendErrorToClient(response as Response, "sent error to client", error);

    expect(response.status).toHaveBeenCalled();
    expect(response.json).toHaveBeenCalled();
  });
});
