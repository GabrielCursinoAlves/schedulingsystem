import { prisma } from "@/infrastructure/database/prisma/Connection.js";
import { Session } from "@/types/prisma/SessionType.js";
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
      throw new ErrorSystem.ApplicationError("Unexpected database error"); 
    }
  }
}