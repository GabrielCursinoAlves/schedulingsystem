import { CreateSchedulingRouter } from "@/routers/CreateSchedulingSystemRouter.js";
import { createSessionRouter } from "@/routers/CreateSessionRouter.js";
import { CreateHealthcheck } from "@/routers/HealthcheckRouter.js";
import { CreateUserRouter } from "@/routers/CreateUserRouter.js";
import { CreateZodFastify } from "@/config/zod/zodFastify.js";
import { AuthRefresh } from "@/routers/AuthRefreshRouter.js";
import { bootstrap } from "./lifecycle/bootstrap.js";
import { Env } from "@/config/environment/env.js";

const app = CreateZodFastify(); 
await bootstrap(app);

app.register(CreateSchedulingRouter);
app.register(createSessionRouter);
app.register(CreateHealthcheck);
app.register(CreateUserRouter);
app.register(AuthRefresh); 

const port = Env.PORT;
const host = Env.HOST;

await app.listen({port, host}).then(() => {
  console.log(`Server is running on ${host}: ${port}`); 
});