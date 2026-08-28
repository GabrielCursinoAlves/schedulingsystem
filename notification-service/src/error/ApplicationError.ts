export class ApplicationError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = 'ApplicationError';
    this.statusCode = statusCode;
  }
}

export class ConflictError extends ApplicationError {
  constructor(message: string, statusCode: number = 409){
    super(message);
    this.name = 'ConflictError';
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message: string, statusCode: number = 404){
    super(message);
    this.name = 'NotFound';
    this.statusCode = statusCode;
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: string, statusCode: number = 400){
    super(message);
    this.name = 'ValidationError';
    this.statusCode = statusCode;
  }
}

export class UnauthorizedError extends ApplicationError {
  constructor(message: string, statusCode: number = 401){
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = statusCode;
  }
}

export class UnavailableError extends ApplicationError {
  constructor(message: string, statusCode: number = 503){
    super(message);
    this.name = 'UnavailableError';
    this.statusCode = statusCode;
  }
}

export class TooManyRequestsError extends ApplicationError {
  constructor(message: string, statusCode: number = 429){
    super(message);
    this.name = 'TooManyRequestsError';
    this.statusCode = statusCode;
  }
}
