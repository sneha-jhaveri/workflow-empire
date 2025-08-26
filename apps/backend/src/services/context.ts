import { db } from "../db/client";

export async function createCtx({
  workspaceId,
  payload,
}: {
  workspaceId: string;
  payload: any;
}) {
  return {
    initial: payload,
    connectors: {
      load: async (type: string) => {
        // Mock implementation for connector loading
        return {
          run: async (args: any) => {
            console.log(`Executing node of type ${type} with args:`, args);
            return {};
          },
        };
      },
    },
    persistStep: async (step: {
      nodeId: string;
      status: string;
      ms: number;
      output?: any;
      error?: any;
    }) => {
      console.log("Persisting step: ", step);
      await db.query(
        "INSERT INTO run_steps (run_id, node_id, status, started_at, finished_at, output_json, logs, retry_count) VALUES ($1, $2, $3, now(), now(), $4, $5, $6)",
        [
          step.nodeId,
          step.status,
          step.ms,
          step.output ? JSON.stringify(step.output) : null,
          step.error ? JSON.stringify(step.error) : null,
          0, // retry_count
        ]
      );
    },
  };
}
