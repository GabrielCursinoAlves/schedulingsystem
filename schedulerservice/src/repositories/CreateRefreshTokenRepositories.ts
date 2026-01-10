import { prisma } from "@/config/prisma/Connection.js";

export class CreateRefreshToken {
  delete = async(token: string): Promise<void> => {
    await prisma.session.delete({ where: { token }});
  }
}