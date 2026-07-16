import { prisma } from "@/infrastructure/database/prisma/Connection.js";
import { Session } from "@/types/prisma/SessionType.js";
import { Prisma } from "@generated/prisma/client.js";
import { ErrorSystem } from "@/error/index.js";

export class CreateSession {
  async execute(data: Session): Promise<void> {
    const { user_id, refreshToken, expiresAt: expires_at } = data;
 
    try {
      await prisma.session.create({
        data:{
          user_id,
          token: refreshToken,
          expires_at
        }
      })
    } catch (error) {
      if(error instanceof Prisma.PrismaClientValidationError) {
        throw new ErrorSystem.ApplicationError("Invalid field or data sent to database.");
      };
      
      throw new ErrorSystem.ApplicationError("Unexpected database error"); 
    }
  }
}