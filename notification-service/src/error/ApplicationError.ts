export class ApplicationError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'ApplicationError';
    this.statusCode = 500;
  }
}

export class ConflictError extends ApplicationError {
  constructor(message: string){
    super(message);
    this.name = 'ConflictError';
    this.statusCode = 409;
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message: string){
    super(message);
    this.name = 'NotFound';
    this.statusCode = 404;
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: string){
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

export class UnauthorizedError extends ApplicationError {
  constructor(message: string){
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}

export class TooManyRequestsError extends ApplicationError {
  constructor(message: string){
    super(message);
    this.name = 'TooManyRequestsError';
    this.statusCode = 429;
  }
}
