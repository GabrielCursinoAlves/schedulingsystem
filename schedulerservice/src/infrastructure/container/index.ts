import { SessionStorage } from "@/services/SessionStorageService.js";
import { RefreshToken } from "@/services/RefreshTokenService.js";
import { JobCreation } from "@/services/JobCreationService.js";
import { RepositoriesSystem } from "@/repositories/index.js";
import { ControllerSystem } from "@/controller/index.js";

const ControllerDi = {
  jobCreation: new JobCreation(
    new RepositoriesSystem.CreateShedulingSystem(),
    new RepositoriesSystem.CreateOutbox()
  ),
  sessionStorage: new SessionStorage(),
  sessionCreation: new RepositoriesSystem.CreateSession(),
  createUser: new RepositoriesSystem.CreateUser(),
  refreshToken: new RefreshToken()
};

export const ControllerSystemDi = {
  createScheduling: new ControllerSystem.CreateSchedulingSystem(ControllerDi.jobCreation),
  createSession: new ControllerSystem.CreateSession(ControllerDi.sessionStorage, ControllerDi.sessionCreation),
  createUser: new ControllerSystem.CreateUser(ControllerDi.createUser),
  updateAuthRefresh: new ControllerSystem.UpdateAuthRefresh(ControllerDi.refreshToken, ControllerDi.sessionCreation)
};