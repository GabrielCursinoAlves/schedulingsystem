import { CreateHealthcheck } from "@/routers/HealthcheckRouter.js";
import { CreateZodFastify } from "@/config/zod/zodFastify.js";
import { Env } from "@/config/environment/env.js";

const app = CreateZodFastify(); 

app.register(CreateHealthcheck);

const port = Env.PORT;
const host = Env.HOST;

await app.listen({port, host}).then(() => {
  console.log(`Server is running on ${host}: ${port}`); 
});  