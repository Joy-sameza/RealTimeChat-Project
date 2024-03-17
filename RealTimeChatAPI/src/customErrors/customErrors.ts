export class ChatApiError extends Error {
  errorCode: number;
  constructor(message: string, code: number) {
    super(message);
    this.errorCode = code;

    Object.setPrototypeOf(this, ChatApiError.prototype);
  }

  getErrorMessage() {
    return "Error occurecd: " + this.name;
  }
  getErrorCode() {
    return this.errorCode;
  }
}
