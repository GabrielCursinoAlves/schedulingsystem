import { config } from "dotenv";

const endFile = process.env.NODE_ENV == "production" ? ".env.production": ".env.local";

config({ path: endFile });