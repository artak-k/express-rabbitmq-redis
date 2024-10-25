export class ApiErrorResponse {
    status = false;
    message: string;

    constructor(message: string) {
      this.message = message;
    }
  }