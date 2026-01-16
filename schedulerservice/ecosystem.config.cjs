const path = require('path');

module.exports = {
  apps : [
    {
      name: "workJobQueueSend",
      script: path.join(__dirname, 'node_modules', 'tsx', 'dist', 'cli.cjs'),
      args: ['--', path.join(__dirname, 'src', 'workers', 'OutboxWorker.ts')],
      node_args: "-r dotenv/config",
      env_development: {
        DOTENV_CONFIG_PATH: ".env.local"
      },
      env_production: {
        DOTENV_CONFIG_PATH: ".env.production"
      },
      interpreter: 'node',
      exec_mode: "fork"
    }
  ],
};
