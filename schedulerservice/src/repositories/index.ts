import { CreateShedulingSystem } from "./CreateShedulingSystemRepositories.js";
import { CreateRefreshToken } from "./CreateRefreshTokenRepositories.js";
import { CreateOutbox } from "./CreateOutboxRepositores.js";
import { CreateUser } from "./CreateUserRepositories.js";
import { CreateSession } from "./CreateSession.js";

export const RepositoriesSystem = {
  CreateShedulingSystem,
  CreateRefreshToken,
  CreateSession,
  CreateOutbox,
  CreateUser,
};