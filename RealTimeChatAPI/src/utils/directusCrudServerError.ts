import { ChatApiError } from "../customErrors/customErrors.js";

export function throwInternalServerError() {
  return new ChatApiError("Internal Server Error", 500);
}
