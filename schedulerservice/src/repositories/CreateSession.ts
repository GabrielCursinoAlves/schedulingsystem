import { prisma } from "../config/prisma/Connection.ts";
import { Session } from "../interface/SessionParams.ts";
import { ErrorSystem } from "../error/index.ts";

export class CreateSession {
  async execute(data: Session): Promise<void>{
    const { user_id, refreshToken, expiresAt } = data;

    try {
      await prisma.session.create({
        data:{
          userId: user_id,
          token: refreshToken,
          expiresAt
        }
      })
    } catch (error) {
      throw new ErrorSystem.ApplicationError("Unexpected database error."); 
    }
  }
}