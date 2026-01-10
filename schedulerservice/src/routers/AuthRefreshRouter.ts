import type { ControllerZodInstance } from "@/types/zod/InstanceZodType.js";
import { SchemaRefreshToken } from "@/schema/zod/RefreshTokenSchema.js";
import { AuthSession } from "@/lib/middleware/AuthSession.js";
import { ControllerSystem } from "@/controller/index.js";

export const AuthRefresh = async(app: ControllerZodInstance) => {

  app.post("/auth/refresh", { preHandler: [AuthSession], schema: {body: SchemaRefreshToken} },  new ControllerSystem.UpdateAuthRefresh().handle);

}