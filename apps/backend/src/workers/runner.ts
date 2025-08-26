import { Queue, Worker } from "bullmq";
import { createDb } from "../db/client";
import { executeGraph } from "../services/executionEngine";
import { loadGraph } from "../services/workflowLoader";
import { createCtx } from "../services/context";

export async function startWorker() {
  const runQueue = new Queue("runs", {
    connection: { url: process.env.REDIS_URL! },
  });

  new Worker(
    "runs",
    async (job) => {
      const { workflowId, version, payload } = job.data;
      const graph = await loadGraph(workflowId, version);
      const ctx = await createCtx({
        workspaceId: job.data.workspaceId,
        payload,
      });
      await executeGraph(ctx, graph);
    },
    { connection: { url: process.env.REDIS_URL! } }
  );

  console.log("Worker started and listening for jobs...");
}
