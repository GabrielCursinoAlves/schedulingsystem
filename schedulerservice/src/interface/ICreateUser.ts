import { UserParams, UserReturns } from "@/types/prisma/UserType.js";

export interface ICreateUser {
  execute: (data: UserParams) => Promise<UserReturns>;
};