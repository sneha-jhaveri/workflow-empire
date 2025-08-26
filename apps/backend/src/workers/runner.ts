import { Worker } from "bullmq";
import { runQueue } from "./queue";
import { executeWorkflow } from "../services/workflowExecutor";
import { loadGraph } from "../services/workflowLoader";

const connection = { url: process.env.REDIS_URL || "redis://localhost:6379" };

export async function startWorker() {
  new Worker(
    "runs",
    async (job) => {
      const { workflowId, version, payload } = job.data;
      const definition = await loadGraph(workflowId, version);
      await executeWorkflow(
        definition.nodes.map((node: any) => ({
          type: node.type,
          data: node.data ?? {},
          ...node,
        }))
      );
    },
    { connection }
  );

  console.log("Worker started and listening for jobs...");
}
