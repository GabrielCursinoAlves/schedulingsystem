import type { BaseUser } from "./UserParams.ts";

export interface SessionParams extends Omit<BaseUser, "username" | "phone" >{}