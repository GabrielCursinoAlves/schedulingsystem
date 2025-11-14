import {CreateStorageUser} from "../services/CreateStorageUserServices.ts";
import { Request } from "../types/zod/RequestZodType.ts";
import type { SchemaTypeZod } from "../types/index.ts";
import {FastifyReply} from "fastify";

export class CreateUser {
  constructor(private StorageUserServices = new CreateStorageUser()){}
  handle = async (req: Request<SchemaTypeZod["SchemaCreateUserController"]>, reply: FastifyReply) => {
    const {username, phone, password} = req.body;
    
    const data = {
      username,
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