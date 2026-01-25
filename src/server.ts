import cluster from "node:cluster";
import { cpus } from "node:os";
import { env } from "./config/env.config.js";
import { connectDatabase } from "./config/db.config.js";
import app from "./app.js";

const numCPUs = cpus().length;

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

const runProductionCluster = (): void => {
  if (cluster.isPrimary) {
    console.log(`Master process ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died (${signal || code}).`);
      cluster.fork();
    });
  } else {
    console.log(`Worker ${process.pid} started`);
    startServer();
  }
};

const runDevelopment = (): void => {
  startServer();
};

env.NODE_ENV === "production" ? runProductionCluster() : runDevelopment();
