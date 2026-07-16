import { prisma } from "@/infrastructure/database/prisma/Connection.js";
import { Prisma } from "@generated/prisma/client.js";
import { ErrorSystem } from "@/error/index.js";

export class CreateRefreshToken {
  delete = async(token: string): Promise<void> => {
    try{
      await prisma.session.delete({ where: { token }});

    }catch(error) {
      if(error instanceof Prisma.PrismaClientValidationError) {
        throw new ErrorSystem.ApplicationError("Invalid field or data sent to database.");
      };
      
      throw new ErrorSystem.ApplicationError("Unexpected database error.");
    }
  }
}