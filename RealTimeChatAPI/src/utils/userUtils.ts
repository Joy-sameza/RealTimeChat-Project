import { ChatApiError } from "../customErrors/customErrors.js";
import { getDataOnUserWithEmail } from "../directus/directusCrud.js";
import { UserType } from "../interface/dataTypes.js";

/**
 * @description checks a user exists or not befor registration
 * @param email - User Email
 * @returns {UserType|null} - Found user or null
 */
export async function checkIfUserExist(email: string) {
  const userList = await getDataOnUserWithEmail(email);
  if (userList.length > 0) {
    throw new ChatApiError("User Registered", 400);
  }
  return null;
}

/**
 * @description Structures the data from the user request befor sending for creation
 * @param unpasredUserData - Userdata from request
 * @param hashedPassword - Password encripted
 * @returns {UserType} - Structured User data
 */
export function parseUserData(
  unpasredUserData: UserType,
  hashedPassword: string,
) {
  const profilePictureBoy = `https://avatar.iran.liara.run/public/boy?username=${unpasredUserData.userName}`;
  const profilePictureGirl = `https://avatar.iran.liara.run/public/girl?username=${unpasredUserData.userName}`;

  const userData = {
    ...unpasredUserData,
    profilePicture:
      unpasredUserData.gender === "male"
        ? profilePictureBoy
        : profilePictureGirl,
    password: hashedPassword,
  };

  return userData;
}
