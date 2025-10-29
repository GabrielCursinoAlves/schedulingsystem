export class AppError extends Error {
  statusCode;
  constructor(message: string) {
    super(message);
    this.name = 'AppError';
    this.statusCode = 500;
  }
}

export class NotFoundError extends AppError {
  constructor(message: string){
    super(message);
    this.name = 'NotFound';
    this.statusCode = 404;
  }
}

