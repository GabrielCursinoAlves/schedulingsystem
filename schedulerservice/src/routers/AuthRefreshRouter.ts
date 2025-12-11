import type { ControllerZodInstance } from "../types/zod/InstanceZodType.ts";
import { ControllerSystem } from "../controller/index.ts";

export const AuthRefresh = async(app: ControllerZodInstance) => {

  app.post("/auth/refresh", new ControllerSystem.UpdateAuthRefresh().handle);

}