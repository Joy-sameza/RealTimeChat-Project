import { describe, expect, it } from "vitest";
// import { createMessage } from "../../src/controllers/messageController.js";
// import { Request, Response } from "express";
// import { generatToken } from "../../src/utils/generateToken.js";

describe("hello", () => {
  it("should say hello", async () => {
    // const response: Partial<Response> = {
    //   status: vi.fn().mockImplementation((code) => {
    //     expect(code).toBeDefined();
    //     return response;
    //   }),
    //   json: vi.fn().mockImplementation((data) => {
    //     expect(data).toBeDefined();
    //     return response;
    //   }),
    // };
    // const request: Partial<Request> = {
    //   headers: {
    //     cookie: generatToken({ id: 1, role: "hi" }),
    //   },
    //   body: {
    //     content: "hello",
    //     senderId: 1,
    //     chatRoomId: 1,
    //   },
    // };
    // await createMessage(request as Request, response as Response);
    // expect(response.status).toBeDefined();
    // expect(response.json).toBeDefined();

    expect("hello").toBeDefined();
  });
});
