import { CreateShedulingSystem } from "./CreateShedulingSystemRepositories.ts";
import { CreateOutbox } from "./CreateOutboxRepositores.ts";
import { CreateUser } from "./CreateUserRepositories.ts";
import { CreateSession } from "./CreateSession.ts";
import { CreateRefreshToken } from "./CreateRefreshTokenRepositories.ts";

export const RepositoriesSystem = {
  CreateShedulingSystem,
  CreateRefreshToken,
  CreateSession,
  CreateOutbox,
  CreateUser,
};