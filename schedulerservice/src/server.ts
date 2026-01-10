import { CreateSchedulingRouter } from "@/routers/CreateSchedulingSystemRouter.js";
import { createSessionRouter } from "@/routers/CreateSessionRouter.js";
import { CreateHealthcheck } from "@/routers/HealthcheckRouter.js";
import { CreateUserRouter } from "@/routers/CreateUserRouter.js";
import { CreateZodFastify } from "@/config/zod/zodFastify.js";
import { AuthRefresh } from "@/routers/AuthRefreshRouter.js";

const app = CreateZodFastify();

app.register(CreateSchedulingRouter);
app.register(createSessionRouter);
app.register(CreateHealthcheck);
app.register(CreateUserRouter);
app.register(AuthRefresh);

const port = Number(process.env.PORT) || 3304;
app.listen({port}).then(() => {
  console.log("Server is running on port 3304"); 
});