// Entry point for the backend application
import { createServer } from "./server";
import { startWorker } from "./workers/runner";

const mode = process.env.PROCESS_ROLE ?? "api"; // "api" | "worker"

(async () => {
  if (mode === "worker") {
    await startWorker();
    return;
  }
  const app = await createServer();
  const port = Number(process.env.PORT ?? 3000);
  await app.listen({ port, host: "0.0.0.0" });
})();
