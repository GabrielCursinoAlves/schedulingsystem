import type { ControllerZodInstance } from "../types/zod/InstanceZodType.ts";
import { SchemaRefreshToken } from "../schema/zod/RefreshTokenSchema.ts";
import { AuthSession } from "../lib/middleware/AuthSession.ts";
import { ControllerSystem } from "../controller/index.ts";

export const AuthRefresh = async(app: ControllerZodInstance) => {

  app.post("/auth/refresh", { preHandler: [AuthSession], schema: {body: SchemaRefreshToken} },  new ControllerSystem.UpdateAuthRefresh().handle);

}