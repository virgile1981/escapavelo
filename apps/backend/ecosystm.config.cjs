module.exports = {
  apps: [{
    name: "escapavelo-backend",
    script: "dist/main.js",
    autorestart: true,
    max_memory_restart: "1G",
    instances: "max",
    exec_mode: "cluster",
    env: {
      PM2: "true",
      PORT: 4000,
      NODE_ENV: "production",
      URL_FRONT: "https://escapavelo.fr"
    }
  }]
};
