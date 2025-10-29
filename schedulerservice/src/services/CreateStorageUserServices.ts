import {UserParams, UserReturns} from "../interface/UserParams.ts";
import {prisma} from "../config/prisma/Connection.ts";
import {ErrorSystem} from "../error/index.ts";
import {Prisma} from "@prisma/client";
import crypto from "node:crypto";

export class CreateStorageUser{
  async execute(data:UserParams):Promise<UserReturns> {
    const {username, phone, password} = data;
    
    const userExist = await prisma.user.findUnique({where:{ phone }});
  
    if(userExist) {
      throw new ErrorSystem.NotFound("User already exists.");
    }
  
    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = crypto.scryptSync(password, salt, 64).toString('hex');
    
    try {
      const createUser = await prisma.user.create({
        data:{
          username,
          phone,
          password: passwordHash
        }
      });
    
      return createUser;

    }catch(error) {

      if(error instanceof Prisma.PrismaClientValidationError) {
        throw new ErrorSystem.PrismaUniqueViolation("Invalid field or data sent to database.");
      }
      
      throw new ErrorSystem.AppError("Unexpected database error.");
    }

  }
}