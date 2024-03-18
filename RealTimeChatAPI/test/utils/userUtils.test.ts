import { describe, expect, it } from "vitest";
import { UserType } from "../../src/interface/dataTypes";
import { checkIfUserExist, parseUserData } from "../../src/utils/userUtils";
import { ChatApiError } from "../../src/customErrors/customErrors";

describe("should parse user data", () => {
  it("should parse user data", () => {
    const userData: Partial<UserType> = {
      userFullName: "johnDoe",
      userName: "john",
      password: "..rr",
      gender: "male",
    };
    const hashedPassword: string = "klkiugsdksekhshev";

    const parsedUser = parseUserData(userData as UserType, hashedPassword);

    expect(parsedUser).toEqual({
      userFullName: "johnDoe",
      userName: "john",
      password: "klkiugsdksekhshev",
      gender: "male",
      profilePicture: `https://avatar.iran.liara.run/public/boy?username=${userData.userName}`,
    });
  });
});

describe("should check if user exist", () => {
  it("should not find user in database", async () => {
    const email = "meyou@exmail.com";

    await checkIfUserExist(email)
      .then((response) => {
        expect(response).toBe(null);
      })
      .catch((error: ChatApiError) => {
        expect(error).toHaveProperty("errorCode");
      });
  });

  it("should find user in database", async () => {
    const email = "bobedoe@mail.com";

    await checkIfUserExist(email).catch((error: ChatApiError) => {
      expect(error).toHaveProperty("errorCode", 400);
    });
  });
});
