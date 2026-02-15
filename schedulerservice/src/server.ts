import { CreateSchedulingRouter } from "@/routers/CreateSchedulingSystemRouter.js";
import { dbClose } from "@/infrastructure/shutdown/database/PrismaClose.js";
import { createSessionRouter } from "@/routers/CreateSessionRouter.js";
import { CreateHealthcheck } from "@/routers/HealthcheckRouter.js";
import { CreateUserRouter } from "@/routers/CreateUserRouter.js";
import { CreateZodFastify } from "@/config/zod/zodFastify.js";
import { AuthRefresh } from "@/routers/AuthRefreshRouter.js";
import { Env } from "@/environment/env.js";

const app = CreateZodFastify();

dbClose(app);

app.register(CreateSchedulingRouter);
app.register(createSessionRouter);
app.register(CreateHealthcheck);
app.register(CreateUserRouter);
app.register(AuthRefresh);

const shutdown = async(signal: string) => {
  await app.close();
}

const port = Env.PORT;
const host = Env.HOST;

app.listen({port, host}).then(() => {
  console.log("Server is running on port 3304"); 
});

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);