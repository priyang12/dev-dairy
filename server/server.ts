import "reflect-metadata";

import keys from "./config/keys";

import express from "express";

import Logger from "./loaders/logger";

function CheckMemory() {
  setInterval(() => {
    const used = process.memoryUsage();
    const heapUsedMB = (used.heapUsed / 1024 / 1024).toFixed(2);
    console.log(`[MEMORY USAGE] Heap Used: ${heapUsedMB} MB`);

    if (used.heapUsed > 300 * 1024 * 1024) {
      // ~300MB
      const filename = `./heap-${Date.now()}.heapsnapshot`;
      console.log(`Taking heap snapshot: ${filename}`);
      // heapdump.writeSnapshot(filename, (err, filename) => {
      //   if (err) console.error(err);
      //   else console.log(`Snapshot saved to ${filename}`);
      // });
    }
  }, 3000); // every 30s
}

async function startServer() {
  const app = express();

  await require("./loaders").default({ expressApp: app });

  app
    .listen(keys.Port, () => {
      Logger.info(`Server listening on port: ${keys.Port}  `);
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });
}

export default startServer;
