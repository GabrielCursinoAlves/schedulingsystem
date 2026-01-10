import { Prisma } from "@prisma/client";

export class PrismaUniqueViolationError extends Prisma.PrismaClientKnownRequestError{
  statusCode: number;
  constructor(message: string) {

    const code = "P2002";
    const clientVersion = Prisma.prismaVersion.client;
    
    super(message,{code, clientVersion});
    this.name = 'PrismaUniqueViolation';
    this.statusCode = 409;
  }
}