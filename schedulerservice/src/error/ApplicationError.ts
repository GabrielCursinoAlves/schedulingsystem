export class ApplicationError extends Error {
  statusCode;
  constructor(message: string) {
    super(message);
    this.name = 'ApplicationError';
    this.statusCode = 500;
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message: string){
    super(message);
    this.name = 'NotFound';
    this.statusCode = 404;
  }
}

