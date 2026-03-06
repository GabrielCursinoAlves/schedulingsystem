import { config } from "dotenv";

if(!process.env.DOCKER) {
  const endFile = ".env.local";
  config({ path: [ ".env", endFile ]});
};
