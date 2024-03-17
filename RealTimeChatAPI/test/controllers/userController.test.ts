import { describe, expect, it, vi } from "vitest";
import {
  deleteUserById,
  getAllUsers,
  getUserDataById,
  logoutUser,
  signein,
  signeup,
  updateUserById,
} from "../../src/controllers/userController.js";
import { Request, Response } from "express";

describe("Signup/Register", () => {
  it("Should call Directus for user creation", async () => {
    const request: Partial<Request> = {
      body: {
        userFullName: "bobe Doe",
        userName: "bobe",
        email: "bobedoe@mail.com",
        password: "John2@!.",
      },
    };
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

    await signeup(request as Request, response as Response);

    expect(response.json).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalled();
  });
});

describe("Logout", () => {
  it("Should logout user", async () => {
    const request: Partial<Request> = {};
    const response: Partial<Response> = {
      status: vi.fn().mockImplementation((code) => {
        expect(code).toEqual(200);
        return response;
      }),
      clearCookie: vi.fn().mockImplementation(() => {
        return response;
      }),
      json: vi.fn().mockImplementation((data) => {
        expect(data).toEqual({ message: "logedout Sucessfully" });
        return response;
      }),
    };

    await logoutUser(request as Request, response as Response);

    expect(response.json).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.clearCookie).toHaveBeenCalled();
  });
});

describe("Signein", () => {
  it("Should call Directus for user authentication", async () => {
    const request: Partial<Request> = {
      body: {
        email: "bobedoe@mail.com",
        password: "John2@!.",
      },
    };
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

    await signein(request as Request, response as Response);

    expect(response.json).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalled();
  });
});

describe("getUser Data by id", () => {
  it("Should call Directus to get the user data", async () => {
    const request: Partial<Request> = {
      params: {
        userId: "1",
      },
    };
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

    await getUserDataById(request as Request, response as Response);

    expect(response.json).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalled();
  });
});

describe("get all registered users", () => {
  it("Should call Directus to get all users", async () => {
    const request: Partial<Request> = {};
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

    await getAllUsers(request as Request, response as Response);

    expect(response.json).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalled();
  });
});

describe("get a users id", () => {
  it("Should call Directus to get a user id with a given id", async () => {
    const request: Partial<Request> = {
      body: {
        id: 1,
        userFullName: "bobe Doe",
        userName: "bobe",
        email: "bobedoe@mail.com",
      },
    };
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

    await updateUserById(request as Request, response as Response);

    expect(response.json).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalled();
  });
});

describe("delete a user", () => {
  it("Should call Directus to delete a user by id", async () => {
    const request: Partial<Request> = {
      params: {
        userId: "1000",
      },
    };
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

    await deleteUserById(request as Request, response as Response);

    expect(response.json).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalled();
  });
});
