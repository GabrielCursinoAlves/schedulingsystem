import { config } from "dotenv";
import { resolve } from "path";

if(!process.env.DOCKER) {
  const serviceRoot = resolve(import.meta.dirname, "../../..");
  const projectRoot = resolve(serviceRoot, ".."); 
  
  config({ path: [ 
    resolve(serviceRoot, ".env"),
    resolve(projectRoot, ".env.root"),
    resolve(serviceRoot, ".env.local"),
   ]});
};
