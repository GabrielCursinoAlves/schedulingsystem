import { UserParams, UserReturns } from "@/interface/UserParams.js";
import { prisma } from "@/config/prisma/Connection.js";
import { scryptSync, randomBytes } from "node:crypto";
import { Prisma } from "@generated/prisma/client.js";
import { ErrorSystem } from "@/error/index.js";

export class CreateUser {
  async execute(data: UserParams): Promise<UserReturns> {
    const {username, phone, email, password} = data;
    
    const userEmailExist = await prisma.user.findUnique({ where:{ email }}); 
  
    if(userEmailExist) throw new ErrorSystem.NotFound("This email already exists.");
    
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');
    const storedHash = `${salt}-${hash}`;
    
    try {
      const createUser = await prisma.user.create({
        data:{
          username,
          email,
          phone,
          password: storedHash
        }
      });
    
      return createUser;

    }catch(error) {

      if(error instanceof Prisma.PrismaClientValidationError) {
        throw new ErrorSystem.ApplicationError("Invalid field or data sent to database."); 
      }
      
      throw new ErrorSystem.ApplicationError("Unexpected database error.");
    }
    
  }
}