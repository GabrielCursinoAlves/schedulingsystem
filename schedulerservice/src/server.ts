import { CreateSchedulingRouter } from "./routers/CreateSchedulingSystemRouter.ts";
import { createLoginRouter } from "./routers/CreateLoginRouter.ts";
import { CreateUserRouter } from "./routers/CreateUserRouter.ts";
import { CreateZodFastify } from "./config/zod/zodFastify.ts";

const app = CreateZodFastify();

app.register(CreateSchedulingRouter);
app.register(createLoginRouter);
app.register(CreateUserRouter);

app.listen({port: Number(process.env.PORT)}).then(() => {
  console.log("Server is running on port 3304"); 
});