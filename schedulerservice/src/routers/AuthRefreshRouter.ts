import type { ControllerZodInstance } from "@/types/zod/InstanceZodType.js";
import { ControllerSystemDi } from "@/infrastructure/container/index.js";
import { SchemaRefreshToken } from "@/schema/zod/RefreshTokenSchema.js";
import { AuthSession } from "@/lib/middleware/AuthSession.js";

export const AuthRefresh = async(app: ControllerZodInstance) => {

  app.post("/auth/refresh", { preHandler: [AuthSession], schema: {body: SchemaRefreshToken} },  ControllerSystemDi.updateAuthRefresh.handle);

}