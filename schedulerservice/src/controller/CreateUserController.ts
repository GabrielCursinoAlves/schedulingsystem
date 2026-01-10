import { SchemaCreateUserRouter } from "@/schema/zod/CreateUserSchema.js";
import { RepositoriesSystem } from "@/repositories/index.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorValidation } from "@/error/index.js";

export class CreateUser {
  constructor(private StorageUserServices = new RepositoriesSystem.CreateUser()){}
  handle = async (req: FastifyRequest, reply: FastifyReply) => {
    const result = SchemaCreateUserRouter.safeParse(req.body);
    
    if(!result.success) throw new ErrorValidation.ZodValidationError(result.error);

    const { username, phone, email, password } = result.data;
          
    const userData = { username, email, phone: phone.replace(/\D/g, ''), password };
    
    const UserCreate = await this.StorageUserServices.execute(userData);
    
    return reply.code(201).send({
      message: "User created successfully",
      userId: UserCreate.id
    });
    
  }
}