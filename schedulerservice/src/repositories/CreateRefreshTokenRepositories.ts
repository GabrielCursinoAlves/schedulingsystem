import { prisma } from "@/infrastructure/database/prisma/Connection.js";
import { ErrorSystem } from "@/error/index.js";

export class CreateRefreshToken {
  delete = async(token: string): Promise<void> => {
    try{
      await prisma.session.delete({ where: { token }});

    }catch(error) {
      throw new ErrorSystem.ApplicationError("Unexpected database error.");
    }
  }
}