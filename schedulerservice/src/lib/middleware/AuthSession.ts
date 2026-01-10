import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorSystem } from "@/error/index.js";
import jwt from "jsonwebtoken";

export async function AuthSession(req: FastifyRequest, reply: FastifyReply){
  const secret =  process.env.SECRET_KEY;
  if(!secret) throw new ErrorSystem.ApplicationError("SECRET KEY was not defined.");
  
  const authHeader = req.headers.authorization;
  if(!authHeader) throw new ErrorSystem.UnauthorizedError("Missing Authorization header");
  
  const [, token] = authHeader.split(" ");
  
  if(!token) throw new ErrorSystem.UnauthorizedError("Malformed Authorization header");

  try {
    const payload = jwt.verify(token, secret);
    console.log(payload);
    req.user = payload;

  } catch (error) {
    if(error instanceof ErrorSystem.ApplicationError) {
      throw new ErrorSystem.ApplicationError(`Failed to validate token: ${error.message}`);
    }
  }
  
}