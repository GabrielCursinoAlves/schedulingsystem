const path = require('path');
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

module.exports = {
  apps : [
    {
      name: "workJobQueueSend",
      script: path.join(__dirname, 'node_modules', 'tsx', 'dist', 'cli.cjs'),
      args: ['--', path.join(__dirname, 'src', 'workers', 'OutboxWorker.ts')],
      env: { "DATABASE_URL": process.env.DATABASE_URL },
      interpreter: 'node',
      exec_mode: "fork"
    }
  ],
};
