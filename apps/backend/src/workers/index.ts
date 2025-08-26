import { startWorker } from "./runner";

startWorker().catch((err) => {
  console.error("Worker failed to start", err);
  process.exit(1);
});
