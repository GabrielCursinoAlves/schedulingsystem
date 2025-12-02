import { CreateSchedulingRouter } from "./routers/CreateSchedulingSystemRouter.ts";
import { createSessionRouter } from "./routers/CreateSessionRouter.ts";
import { CreateUserRouter } from "./routers/CreateUserRouter.ts";
import { CreateZodFastify } from "./config/zod/zodFastify.ts";

const app = CreateZodFastify();

app.register(CreateSchedulingRouter);
app.register(createSessionRouter);
app.register(CreateUserRouter);

app.listen({port: Number(process.env.PORT)}).then(() => {
  console.log("Server is running on port 3304"); 
});