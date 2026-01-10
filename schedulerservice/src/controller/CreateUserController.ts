import {CreateStorageUser} from "../services/CreateStorageUserServices.ts";
import {SchemaCreateUserController} from "../types/CreateUserType.ts";
import {Request} from "../types/CreateUserType.ts";
import {FastifyReply} from "fastify";

export class CreateUser {
  constructor(private StorageUserServices = new CreateStorageUser()){}
  handle = async (req: Request<SchemaCreateUserController>, reply: FastifyReply) => {
    const {username, phone, password} = req.body;
    
    const data = {
      username,
      phone: phone.replace(/\D/g, ''),
      password
    };
  
    const user = await this.StorageUserServices.execute(data);
     
    return reply.code(201).send({
      message: "User created successfully",
      userId: user.id
    });

  }
}