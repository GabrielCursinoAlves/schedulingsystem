import { SchemaCreateUserRouter } from "../schema/zod/CreateUserSchema.ts";
import { RepositoriesSystem } from "../repositories/index.ts";
import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorValidation } from "../error/index.ts";

export class CreateUser {
  constructor(private StorageUserServices = new RepositoriesSystem.CreateUser()){}
  handle = async (req: FastifyRequest, reply: FastifyReply) => {
    const result = SchemaCreateUserRouter.safeParse(req.body);
    
    if(!result.success){
      throw new ErrorValidation.ZodValidationError(result.error);
    }

    if(result.data){
      const { username, phone, email, password } = result.data;
          
      const data = {
        username,
        email,
        phone: phone.replace(/\D/g, ''),
        password
      };
    
      const UserCreate = await this.StorageUserServices.execute(data);
    
      return reply.code(201).send({
        message: "User created successfully",
        userId: UserCreate.id
      });
    
    }
  }
}