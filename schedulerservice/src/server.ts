import {CreateSchedulingRouter} from "./routers/CreateSchedulingSystemRouter.ts";
import {CreateZodFastify} from "./config/zod/zodFastify.ts";

const app = CreateZodFastify();

app.register(CreateSchedulingRouter);

app.listen({port: Number(process.env.PORT)}).then(() => {
  console.log("Server is running on port 3304"); 
});