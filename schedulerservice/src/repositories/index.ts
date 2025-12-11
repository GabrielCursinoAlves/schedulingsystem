import { CreateShedulingSystem } from "./CreateShedulingSystemRepositories.ts";
import { CreateOutbox } from "./CreateOutboxRepositores.ts";
import { CreateUser } from "./CreateUserRepositories.ts";
import { CreateSession } from "./CreateSession.ts";

export const RepositoriesSystem = {
  CreateShedulingSystem,
  CreateSession,
  CreateOutbox,
  CreateUser
};