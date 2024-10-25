export class ApiError extends Error {
    public code: string;
    public data: any;

    constructor(message: string, errorCode: string, data?: any) {
        super(message);
        this.name = this.constructor.name;
        this.code = errorCode;
        if (data) {
            this.data = data;
        }
    }

    toJSON() {
        return {
            name: this.name,
            code: this.code,
            message: this.message, 
            ...(this.data && { data: this.data })
        };
    }
}

export class PermissionDeniedError extends ApiError {
    constructor() {
        super("Permission denied", "PERMISSION_DENIED");
    }
}

export class ValidationError extends ApiError {
    constructor(message: string) {
      super(message, "VALIDATION_ERROR");
    }
  }
  